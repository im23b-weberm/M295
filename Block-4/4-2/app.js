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


app.delete("/names", (req, res) => {
    const name = req.body

    if (!name) {
        return res.status(400).json({error: "Name please"})
    }

    const index = nameList.indexOf(name);

    nameList.splice(index, 1)

    res.status(201).json({
        message: 'Name deletet successfully',
        names: nameList
    });
})


app.get('/secret2', (req, res) => {
    const authHeader = req.headers['authorization'];
  
    if (authHeader === 'Basic aGFja2VyOjEyMzQ=') {
      res.status(200).send('Access granted 🔓');
    } else {
      res.status(401).send('Unauthorized 🚫');
    }
  });



  app.get('/chuck', async (req, res) => {
    const customName = req.query.name || 'Chuck Norris';
  
    try {
      const response = await fetch('https://api.chucknorris.io/jokes/random');
      const data = await response.json();
  
      // Replace "Chuck Norris" with custom name
      const joke = data.value.replace(/Chuck Norris/g, customName);
  
      res.status(200).json({
        joke: joke
      });
  
    } catch (error) {
      console.error('Error fetching joke:', error);
      res.status(500).json({ error: 'Failed to fetch joke' });
    }
  });



  app.use(express.json());

  // Example "me" object
  let me = {
    name: "Alice",
    age: 25,
    city: "Zurich"
  };
  
  // PATCH /me — update existing fields
  app.patch('/me', (req, res) => {
    const updates = req.body;
  
    if (typeof updates !== 'object' || Array.isArray(updates)) {
      return res.status(400).json({ error: "Invalid JSON object" });
    }
  
    // Merge updates into the existing 'me' object
    me = { ...me, ...updates };
  
    res.status(200).json({
      message: "Profile updated",
      me: me
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