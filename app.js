const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const path = require('path');

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use express-ejs-layouts middleware
app.use(expressLayouts);
app.set('layout', 'layout'); 


const destinationsData = require('./data/destinations.json');
const hotelsData = require('./data/hotels.json');
const trendingData = require('./data/trending.json');
const packagesData = require('./data/packages.json');
const testimonialsData = require('./data/testimonials.json');



// Serve static files
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.render('pages/home', {
        title: 'Travel Sarthi',
        page: 'home',
        destinations: destinationsData,
        trending: trendingData,
        testimonials: testimonialsData
    });
});

app.get('/packages', (req, res) => {
    res.render('pages/packages', {
        title: 'Travel Packages | Travel Sarthi',
        page: 'packages',
        packages: packagesData,
    });
});


app.get('/about', (req, res) => {
    res.render('pages/about', {
        title: 'About Us | Travel Sarthi',
        page: 'about'
    });
});

app.get('/contact', (req, res) => {
    res.render('pages/contact', {
        title: 'Contact Us | Travel Sarthi',
        page: 'contact'
    });
});

app.get('/terms_and_conditions', (req, res) => {
    res.render('pages/terms_and_conditions', {
        title: 'T&C | Travel Sarthi',
        page: 'contact'
    });
});

app.get('/privacy_policy', (req, res) => {
    res.render('pages/privacy_policy', {
        title: 'Privacy Policy | Travel Sarthi',
        page: 'contact'
    });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});