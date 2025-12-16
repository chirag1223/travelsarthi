// app.js

// 1. Import necessary modules
const express = require('express');
const path = require('path');

// 2. Initialize the Express app
const app = express();
const port = process.env.PORT || 3000; // Use environment port or 3000

// 3. Set up the View Engine (EJS)
// Tell Express that EJS is the template engine
app.set('view engine', 'ejs');
// Tell Express where to find the view (template) files
app.set('views', path.join(__dirname, 'views'));

// 4. Set up the Static Files Directory
// Serve static files (like CSS, images, client-side JS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// 5. Define Routes
// A route is an endpoint that responds to a client request.
// We'll create a GET route for each of your EJS files.

// Home page
app.get('/', (req, res) => {
    
    res.render('index', { title: 'Home Page' });
});

// About Us page
app.get('/about', (req, res) => {
    res.render('aboutus', { title: 'About Us' });
});

// Coming Soon page
app.get('/comingsoon', (req, res) => {
    res.render('comingsoon', { title: 'Coming Soon' });
});

// Blog page
app.get('/blog', (req, res) => {
    res.render('blog', { title: 'Our Blog' });
});

// Blog Details page
// Note: A real blog might use a dynamic route like /blog/:id
app.get('/blog-details', (req, res) => {
    res.render('blogdetails', { title: 'Blog Post Details' });
});

// Categories page
app.get('/categories', (req, res) => {
    res.render('categories', { title: 'Categories' });
});

// Contact page
app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Us' });
});

// Destination page
app.get('/destination', (req, res) => {
    res.render('destination', { title: 'Destinations' });
});


app.get('/test', (req, res) => {
    
    res.render('main', { title: 'Home Page' });
});

app.get('/test/blog', (req, res) => {
    
    res.render('blogdetails', { title: 'Blog' });
});

app.get('/test/destination', (req, res) => {
    
    res.render('destinationdetails', { title: 'Destination' });
});

// 6. Start the Server
// Make the app listen for requests on the specified port
app.listen(port, () => {
    console.log(`Server is running successfully on http://localhost:${port}`);
});