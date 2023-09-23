const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { loadContact, findContact, addContact } = require('./utils/contacts');
const { body, validationResult } = require('express-validator');

const app = express();
const port = 3000;

// gunakan ejs
app.set('view engine', 'ejs');

// Third-party middleware
app.use(expressLayouts);

// Built-in middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    // res.sendFile('./index.html', {root: __dirname });
    const mahasiswa = [
        {
            nama: 'saskia karmila',
            email:'saskiamila@gmail.com',
        },
        {
            nama: 'stella wulandari',
            email:'stelladari@gmail.com',
        },
        {
            nama: 'syahirah inara',
            email:'syahiranara@gmail.com',
        },
   ];
    res.render('index',{ 
        nama: 'Saskia Karmila', 
        title: 'Halaman Home',
        mahasiswa,
        layout: 'layouts/main-layout',
    }); 
});

app.get('/about', (req, res) => {
    res.render('about', {
        layout: 'layouts/main-layout',
        title: 'Halaman About',
    }); 

});

app.get('/contact', (req, res) => {
    const contacts = loadContact();
    
    res.render('contact', {
        title: 'Halaman Contact',
        layout: 'layouts/main-layout',
        contacts,
    }); 

});

// halaman form tambah data contact
app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        title: 'Form Tambah Data Contact',
        layout: 'layouts/main-layout',
    });
});

// proses data contact
app.post('/contact', body('email').isEmail(), (req, res) => {


// addContact(req.body);
// res.redirect('/Contact');
});

// halaman detail contact
app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama);
    res.render('detail', {
        title: 'Halaman Detail Contact',
        layout: 'layouts/main-layout',
        contact,
    }); 

});

app.use((req, res) => {
    res.status(404);
    res.send('<h1>404</h1>');
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});