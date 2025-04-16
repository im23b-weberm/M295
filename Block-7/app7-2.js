const express = require('express');
const session = require('express-session');

const app = express();
const PORT = 3000;


app.use(express.json());


app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.post('/name', (req, res) => {
    const { name } = req.body;
    req.session.name = name;
    res.send(`Name "${name}" wurde in der Session gespeichert.`);
});


app.get('/name', (req, res) => {
    const name = req.session.name;
    if (name) {
        res.send(`Der Name in der Session ist: ${name}`);
    } else {
        res.send('Kein Name in der Session gespeichert.');
    }
});


app.delete('/name', (req, res) => {
    delete req.session.name;
    res.send('Der Name wurde aus der Session gelöscht.');
});







app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});