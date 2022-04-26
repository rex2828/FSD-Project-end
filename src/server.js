const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const hbs = require('hbs');
const userRoutes = require('./routes/userRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const contactRoutes = require('./routes/apiRoutes');
const Doctor = require('./models/doctorModel');
const { auth, checkUser, adminauth, doctorauth } = require('./middleware/auth');
const cookieParser = require('cookie-parser');

const port = 3000;
const app = express();
connectDB();
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api', contactRoutes);

// public folder path
app.use(express.static(path.join(__dirname, '../public')))

// setting hbs paths for views and partials
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));


// page routes
app.get('*', checkUser);

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/doctorapplication', auth, (req, res) => {
    res.render('doctorApplication')
})

app.get('/doctorpage', auth, doctorauth, async (req, res) => {
    const doctor = await Doctor.findOne({ _id: req.query.id });

    res.render('doctorpage', { doctor: doctor })
})

app.get('/verified', (req, res) => {
    res.render('verified');
})

app.get('/doctors', (req, res) => {
    res.render('doctors')
})

app.get('/about', (req, res) => {
    res.render('aboutus')
})

app.get('/userprofile', auth, (req, res) => {
    res.render('userprofile')
})

app.get('/doctorprofile', async (req, res) => {
    const doctor = await Doctor.findOne({ _id: req.query.id });
    if (doctor) {
        res.render('doctorprofile', { doctor });
    } else {
        res.redirect('/doctors');
    }
})

app.get('/bookappointment', auth, async (req, res) => {
    const doctor = await Doctor.findOne({ _id: req.query.id });
    if (doctor) {
        const address = doctor.clinicaddress.split(",");
        res.render('bookappointment', { name: doctor.name, category: doctor.category, city: address[0], state: address[1] });
    }
    else {
        res.redirect('/doctors');
    }
})

app.get('/faq', (req, res) => {
    res.render('faq')
})

app.get('/admin', auth, adminauth, (req, res) => {
    res.render('admin')
})

app.get('/payment', auth, (req, res) => {
    res.render('payment')
})

app.get('/contactus', (req, res) => {
    res.render('contactus')
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

