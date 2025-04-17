const express = require('express');
const cors = require("cors")
const session = require('express-session');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const app = express();
const PORT = 3000


app.use(express.json());

// app install
let tasks = [
    {
      "id": 1,
      "Titel": "Buy groceries",
      "Beschreibung": "Buy milk, eggs, and bread",
      "Done": false,
      "DueDate": "2024-09-20"
    },
    {
      "id": 2,
      "Titel": "Finish project",
      "Beschreibung": "Complete the coding project for work",
      "Done": false,
      "DueDate": "2024-09-25"
    },
    {
      "id": 3,
      "Titel": "Call mom",
      "Beschreibung": "Call mom to catch up",
      "Done": false,
      "DueDate": "2024-09-22"
    },
    {
      "id": 4,
      "Titel": "Clean room",
      "Beschreibung": "Vacuum and dust the living room",
      "Done": false,
      "DueDate": "2024-09-24"
    },
    {
      "id": 5,
      "Titel": "Pay bills",
      "Beschreibung": "Pay electricity and water bills",
      "Done": false,
      "DueDate": "2024-09-28"
    }
  ]
  


  let taskid = 5

  const validEmail = "email";
  const validPassword = "pwd";


app.use(session({
    secret: 'your-secret-key', // Ersetzen Sie dies durch einen sicheren Schlüssel
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Setzen Sie auf true, wenn Sie HTTPS verwenden
}));

const authenticate = (req, res, next) => {
    
};

app.post("/login", (req, res) => {
    const { email, password } = req.query || {};
    if (email === validEmail && password === validPassword) {
        req.session.authenticated = true;
        req.session.email = email; // Speichern der E-Mail in der Session
        return res.status(201).json({ email: email });
    }
    return res.status(401).send('Ungültige Anmeldedaten.');
});


app.get("/verify", (req, res) => {
    if (req.session.authenticated) {
        return res.status(200).json({ email: req.session.email });
    }
    return res.status(401).send('Nicht authentifiziert.');
});



app.get("/", authenticate, (req, res) => {
    res.redirect("/tasks")
})


app.get("/tasks", authenticate, (req, res) => {
    res.status(200).json(tasks)
})


app.get("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    let task = tasks.find(b => b.id === id);
    console.log(task)

    res.status(200).json(task)
})

app.post("/tasks", (req, res) => {
    const newtask = req.body
    if (newtask) {
        taskid++
        const taskWithId = { id: taskid, ...newtask }; // Add the ID to the new task
        tasks.push(taskWithId)
        res.status(201).json(taskWithId)
        
    }
    else {
        res.status(400).send("wrong format of task")
    }
})


app.patch("/tasks/:id", (req, res) => {
    let updagedtask = req.body
    let id = parseInt(req.params.id);

    let taskindex = tasks.findIndex(b => b.id === id);
    updagedtask = { id: id, ...updagedtask}
    tasks[taskindex] = updagedtask;
    res.json(updagedtask)

})


app.delete("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id)

    const deltask = tasks.findIndex(b => b.id === id);
    if (deltask) {
        tasks.splice(deltask, 1);
        res.status(200).send("deleted sucesful")
    }
    else {
        res.status(404).send("id not found")
    }
})







app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server runs on http://localhost:${PORT}`);
  });