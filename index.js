const express = require('express');
const app = express();
const User = require('./models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

app.get('/', (req, res) => {
    res.send(`
        <h1>Home Page</h1>
        <a href="/secret">Want to see a Secret?</a>
        <a href="/register">Register</a>
        <a href="/login">Login</a>
    `)
})

app.get('/register', (req, res) => {
    res.render('register');
})

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new User({
        username,
        password: hash
    })
    await user.save();
    res.redirect('/');
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
        res.send("Welcome!");
    } else {
        res.send("Try Again");
    }
})

app.get('/secret', (req, res) => {
    res.send("THIS IS SECRET!");
})

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000");
})