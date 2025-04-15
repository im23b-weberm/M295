const path = require('path')
const express = require('express')
const app = express();
const PORT = 3000
const moment = require('moment-timezone');
const bodyParser = require('body-parser');

app.get('/now', (req, res) => {
    const tz = req.query.tz || 'UTC';
    if (!moment.tz.zone(tz)) {
      return res.status(400).json({ error: 'Invalid timezone' });
    }
    const time = moment().tz(tz).format();
    res.status(200).json({ time, timezone: tz });
  });

app.get('/zli', (req, res) => {
    res.redirect('https://www.zli.ch');
});


let nameList = [];

// Middleware to parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));

// POST /names
app.post('/names', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required in form data' });
  }

  nameList.push(name);
  res.status(201).json({
    message: 'Name added successfully',
    names: nameList
  });
});




app.get('/html', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
  
app.get('/image', (req, res) => {
    const bildPfad = path.join(__dirname, 'javascript-array-image-exercise-35.png');
    res.sendFile(bildPfad);
});

app.get('/teapot', (req, res) => {
    res.status(418).send("I'm a teapot 🫖");
});

app.get('/user-agent', (req, res) => {
    const userAgent = req.get('User-Agent');
    res.send(`Dein User-Agent ist: ${userAgent}`);
  });

  app.get('/secret', (req, res) => {
    res.status(403).send("I'm a teapot 🫖");
});


app.get('/xml', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.xml'));
});

app.get('/me', (req, res) => {
    const user = {
      vorname: "Max",
      nachname: "Mustermann",
      alter: 30,
      wohnort: "Berlin",
      augenfarbe: "blau"
    };
  
    res.json(user); 
});



app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
  });