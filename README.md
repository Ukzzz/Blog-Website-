# Blog Website

A full-featured blog platform where users can register, log in, create, read, update, and delete blog posts. Built with Node.js, Express, MongoDB, and EJS templating engine.

## Features

- User Authentication (Register/Login)
- JWT-based authentication with secure cookies
- Create, Read, Update, and Delete blog posts
- Responsive design
- User profiles with registration information
- Secure password hashing with bcrypt

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Templating Engine**: EJS
- **Styling**: Plain CSS (can be extended with a framework like Bootstrap)
- **Security**: Helmet.js, bcrypt for password hashing, secure cookie settings

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- MongoDB Atlas account or local MongoDB installation

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd MiniProj#1
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   MONGO_API_KEY=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
/
├── app.js          # Main application file
├── db.js           # Database connection
├── .env            # Environment variables
├── .gitignore      # Git ignore file
├── package.json    # Project dependencies
├── README.md       # This file
│
├── middleware/
│   └── auth.js     # Authentication middleware
│
├── model/
│   ├── user.js     # User model
│   └── blog.js     # Blog post model
│
└── views/          # EJS templates
    ├── blog.ejs    # Blog creation/editing
    ├── dashboard.ejs # Home page
    ├── edit.ejs    # Edit blog post
    ├── login.ejs   # Login page
    ├── register.ejs # Registration page
    └── viewBlog.ejs # View single blog post
```

## API Endpoints

### Authentication
- `POST /register` - Register a new user
- `POST /login` - Login user
- `GET /logout` - Logout user

### Blog Posts
- `GET /blog` - View all blog posts
- `POST /blog` - Create a new blog post
- `GET /blog/:id` - View a specific blog post
- `PUT /blog/:id` - Update a blog post
- `DELETE /blog/:id` - Delete a blog post

## Security Features

- Password hashing with bcrypt
- JWT authentication with secure, HTTP-only cookies
- Helmet.js for setting secure HTTP headers
- CSRF protection (recommended to add for production)
- Input validation (recommended to enhance)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with Node.js and Express
- Uses MongoDB for data storage
- EJS for server-side rendering
- Various npm packages for enhanced functionality
