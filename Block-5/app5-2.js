const express = require('express')
const app = express();
const PORT = 3001
const bodyParser = require('body-parser');

lends = [
    {
        "id": 1,
        "customer_id": "C001",
        "isbn": "978-3-16-148410-0",
        "borrowed_at": "2023-10-01T10:00:00Z",
        "returned_at": null
    },
    {
        "id": 2,
        "customer_id": "C002",
        "isbn": "978-1-4028-9462-6",
        "borrowed_at": "2023-10-02T14:30:00Z",
        "returned_at": null
    },
    {
        "id": 3,
        "customer_id": "C001",
        "isbn": "978-0-306-40615-7",
        "borrowed_at": "2023-10-03T09:15:00Z",
        "returned_at": null
    },
    {
        "id": 4,
        "customer_id": "C001",
        "isbn": "978-0-7432-7356-5",
        "borrowed_at": "2023-10-05T11:00:00Z",
        "returned_at": null
    },
    {
        "id": 5,
        "customer_id": "C003",
        "isbn": "978-0-307-26216-0",
        "borrowed_at": "2023-10-06T15:45:00Z",
        "returned_at": null
    },
    {
        "id": 6,
        "customer_id": "C001",
        "isbn": "978-3-16-148410-0",
        "borrowed_at": "2023-10-10T12:00:00Z",
        "returned_at": "2023-10-15T10:00:00Z"
    }
]

books = [
    {
        "name": "To Kill a Mockingbird",
        "isbn": "978-0-06-112008-4"
    },
    {
        "name": "1984",
        "isbn": "978-0-452-28423-4"
    },
    {
        "name": "The Great Gatsby",
        "isbn": "978-0-7432-7356-5"
    },
    {
        "name": "Pride and Prejudice",
        "isbn": "978-0-19-953556-9"
    },
    {
        "name": "The Catcher in the Rye",
        "isbn": "978-0-316-76948-0"
    },
    {
        "name": "Moby Dick",
        "isbn": "978-0-14-243724-7"
    },
    {
        "name": "War and Peace",
        "isbn": "978-0-14-303999-0"
    },
    {
        "name": "The Odyssey",
        "isbn": "978-0-14-026886-7"
    },
    {
        "name": "The Brothers Karamazov",
        "isbn": "978-0-14-044924-2"
    },
    {
        "name": "Brave New World",
        "isbn": "978-0-06-085052-4"
    }
]

let id_count = 6

app.get('/lends', (req, res) => {
    res.status(422).json(lends)
});


app.get('/lends/:id', (req, res) => {
    const lend = lends.find(l => l.id === parseInt(req.params.id));
    if (lend) {
        res.status(200).json(lend);
    } else {
        res.status(404).json({ error: 'Not found' });
    }
});

app.post('/lends', (req, res) => {
    const isbn = req.body.isbn;
    const customer_id = req.body.customer_id

    // Validierung
   

    // Überprüfen, ob das Buch verfügbar ist
    const book = books.find(b => b.isbn === isbn);
    

    // Überprüfen, ob der Kunde bereits 3 Ausleihen hat
    

    // Neue Ausleihe erstellen
    const newLend = {
        id: id_count++,
        customer_id,
        isbn,
        borrowed_at: new Date().toISOString(),
        returned_at: null
    };

    lends.push(newLend);
    res.status(201).json(newLend);
});







app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
  });
