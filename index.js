const express = require('express');
const app = express();
const User = require('./models/user');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/authDemo', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => {
        console.log("Database Connected");
    })
    .catch(err => {
        console.log("Error Occurred");
        console.log(err);
    })

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));

app.get('/register', (req, res) => {
    res.render('register');
})

app.post('/register', async (req, res) => {

})

app.get('/', (req, res) => {
    res.send(`
        <h1>Home Page</h1>
        <a href="/secret">Want to see a Secret?</a>
        <a href="/register">Register</a>
    `)
})

app.get('/secret', (req, res) => {
    res.send("THIS IS SECRET!");
})

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000");
})