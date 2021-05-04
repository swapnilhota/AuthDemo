const express = require('express');
const app = express();
const User = require('./models/user');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/register', (req, res) => {
    res.render('register');
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