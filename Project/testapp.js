const express = require('express');
const cors = require("cors");
const session = require('express-session');

const app = express();
const PORT = 3000;

let books = [];
let bookid = 0;

// Dummy-Benutzerdaten für die Authentifizierung
const validEmail = "desk@library.example";
const validPassword = "m295";

app.use(cors());
app.use(express.json());

// Session-Konfiguration
app.use(session({
    secret: 'your-secret-key', // Ersetzen Sie dies durch einen sicheren Schlüssel
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Setzen Sie auf true, wenn Sie HTTPS verwenden
}));

// Middleware zum Schutz der Lend-Ressource
const authenticate = (req, res, next) => {
    if (req.session.authenticated) {
        return next();
    }
    return res.status(401).send('Nicht authentifiziert.');
};

// POST /login - Überprüft die Anmeldedaten
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (email === validEmail && password === validPassword) {
        req.session.authenticated = true;
        req.session.email = email; // Speichern der E-Mail in der Session
        return res.status(201).json({ email: email });
    }
    return res.status(401).send('Ungültige Anmeldedaten.');
});

// GET /verify - Überprüft den Authentifizierungsstatus
app.get("/verify", (req, res) => {
    if (req.session.authenticated) {
        return res.status(200).json({ email: req.session.email });
    }
    return res.status(401).send('Nicht authentifiziert.');
});

// DELETE /logout - Logout und Session beenden
app.delete("/logout", (req, res) => {
    req.session.authenticated = false;
    req.session.email = null; // E-Mail aus der Session entfernen
    res.status(204).send();
});

// GET /lends - Beispiel-Endpunkt für die Lend-Ressource, geschützt durch Authentifizierung
app.get("/lends", authenticate, (req, res) => {
    // Hier können Sie die Logik für die Lend-Ressource implementieren
    res.status(200).send('Zugriff auf die Lend-Ressource.');
});

// POST /books - Buch hinzufügen
app.post("/books", (req, res) => {
    const newBook = req.body;
    if (newBook.title && newBook.author && newBook.year) {
        bookid++; // Increment the book ID
        const bookWithId = { id: bookid, ...newBook }; // Add the ID to the new book
        books.push(bookWithId); // Add the new book to the array
        res.status(201).json(bookWithId); // Return the added book with its ID
    } else {
        res.status(400).send("Wrong format of book");
    }
});

// GET /books - Alle Bücher abrufen
app.get("/books", (req, res) => {
    res.status(200).json(books);
});

// GET /books/:title - Buch nach Titel abrufen
app.get("/books/:title", (req, res) => {
    const title = req.params.title;
    const book = books.find(b => b.title === title);

    if (book) {
        res.json(book); // Return the book information as JSON
    } else {
        res.status(404).send("Book not found");
    }
});

// DELETE /books/:id - Buch nach ID löschen
app.delete("/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === id);

    if (index !== -1) {
        books.splice(index, 1); // Remove the book from the array
        res.status(204).send(); // No content to send back
    } else {
        res.status(404).send("Book not found");
    }
});

// Server starten
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
