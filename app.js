const express = require('express');
const connectDB = require('./db');
const User = require('./model/user');
const Blog = require('./model/blog');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const { authenticateUser } = require('./middleware/auth');
const path = require('path');
require('dotenv').config();

const app = express();

// DB Connect
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes

// Public Pages
app.get('/', (req, res) => res.render('dashboard'));
app.get('/login', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));
app.get('/blog', authenticateUser, (req, res) => res.render('blog'));

// Register User
app.post('/register', async (req, res) => {
  const { name, dateOfBirth, username, password, email } = req.body;
  try {
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) return res.status(400).send('Email or Username already in use');

    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({ name, dateOfBirth, username, email, password: hash });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/blog');
  } catch (err) {
    console.error(err);
    res.status(500).send('Registration failed');
  }
});

// Login User
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid email or password');

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).send('Invalid email or password');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/blog');
  } catch (err) {
    console.error(err);
    res.status(500).send('Login failed');
  }
});

// Logout
app.get('/logout', (req, res) => {
  res.clearCookie('token');
  console.log('cookie cleared');
  res.redirect('/login');
});

// View Blogs (only logged-in users)
app.get('/viewBlog', authenticateUser, async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user._id }).populate('author', 'username');
    res.render('viewBlog', { blogs });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to load blogs');
  }
});

// Create Blog
app.post('/blog', authenticateUser, async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = new Blog({ title, content, author: req.user._id });
    await blog.save();
    res.redirect('/viewBlog');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to create blog');
  }
});

// Delete Blog (Only Author)
app.delete('/viewBlog/:id', authenticateUser, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog || blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).send('Not authorized to delete this blog');
    }
    await blog.deleteOne();
    res.redirect('/viewBlog');
  } catch (err) {
    console.error(err);
    res.status(500).send('Delete failed');
  }
});
app.get('/edit/:id', authenticateUser, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog || blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).send('Not authorized');
    }
    res.render('edit', { blog });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to load edit form');
  }
});

app.put('/viewBlog/:id', authenticateUser, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog || blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).send('Not authorized to update this blog');
    }

    // Update the blog fields
    const { title, content } = req.body;
    await blog.updateOne({ title, content });

    res.redirect('/viewBlog');
  } catch (err) {
    console.error(err);
    res.status(500).send('Update failed');
  }
});



const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});
