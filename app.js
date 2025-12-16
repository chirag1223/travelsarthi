const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    
    res.render('main', { title: 'Home Page' });
});

app.get('/blog', (req, res) => {
    
    res.render('blogdetails', { title: 'Blog' });
});

app.get('/destination', (req, res) => {
    
    res.render('destinationdetails', { title: 'Destination' });
});


app.listen(port, () => {
    console.log(`Server is running successfully on http://localhost:${port}`);
});