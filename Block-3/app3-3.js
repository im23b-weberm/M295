const path = require('path')
const express = require('express');
const app = express();
const PORT = 3000;

app.get("/now", (request, response) => {
    response.send(new Date)
})

app.get('/zli', (req, res) => {
    res.redirect('https://www.zli.ch');
});


const names = [
        "Luca", "Mia", "Noah", "Lea", "Ben",
        "Emma", "Elias", "Lina", "Leon", "Sofia",
        "Julian", "Nina", "Finn", "Lara", "Jonas",
        "Anna", "Tim", "Marie", "Paul", "Laura"
      ]


app.get('/name', (req, res) => {
    const zufallsName = names[Math.floor(Math.random() * names.length)];
    res.json({ name: zufallsName });
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