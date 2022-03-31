const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const hbs = require('hbs');
const userRoutes = require('./routes/userRoutes');
const doctorlist = require('./data/doctorlist');

const port = 3000;
const app = express();
connectDB();
app.use(express.json());

app.use('/api/users', userRoutes);


// public folder path
app.use(express.static(path.join(__dirname, '../public')))

// setting hbs paths for views and partials
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));


// doctor api
app.get('/api/doctorlist', (req, res) => {
    res.json(doctorlist);
})


// page routes
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/doctors', (req, res) => {
    res.render('doctors')
})

app.get('/help', (req, res) => {
    res.render('help')
})

app.get('/about', (req, res) => {
    res.render('aboutus')
})

app.get('/userprofile', (req, res) => {
    res.render('userprofile')
})

app.get('/doctorprofile', (req, res) => {
    res.render('doctorprofile')
})

app.get('/bookappointment', (req, res) => {
    res.render('bookappointment')
})

app.get('/faq', (req, res) => {
    res.render('faq')
})

app.get('/admin', (req, res) => {
    res.render('admin')
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404 Page',
        message: 'Page not found.',
    })
})

// listening to port 3000
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

