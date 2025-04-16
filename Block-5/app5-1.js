const express = require('express')
const app = express();
const PORT = 3000
const bodyParser = require('body-parser');
// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'A simple Express API',
    },
    servers: [
      {
        url: 'http://localhost:3000', // adjust as needed
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to your API docs
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };





app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Your routes go here

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
  console.log('Swagger docs at http://localhost:3000/api-docs');
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: A list of users
 */
app.get('/users', (req, res) => {
    res.json([{ id: 1, name: 'Alice' }]);
  });
  

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



app.get('/books', (req, res) => {
    res.json(books)
});


app.get('/books/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const book = books.find(b => b.isbn === isbn);
    
    if (book) {
        res.json(book); // Return the book information as JSON
    } else {
        res.status(404).json({ message: 'Book not found' }); // Return 404 if not found
    }
});





app.post('/books', (req, res) => {
    const newBook = req.body; // Get the new book data from the request body

    // Optional: Validate the incoming dat

    books.push(newBook); // Add the new book to the books array
    res.status(201).json(newBook); // Return the new book as JSON with a 201 status
});


app.put('/books/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const updatedBook = req.body; // Get the updated book data from the request body

    // Find the index of the book to update
    const bookIndex = books.findIndex(b => b.isbn === isbn);
    
    if (bookIndex !== -1) {
        // Optional: Validate the incoming data
        if (!updatedBook.name || !updatedBook.isbn) {
            return res.status(400).json({ message: 'Name and ISBN are required' });
        }

        // Update the book
        books[bookIndex] = updatedBook;
        res.json(updatedBook); // Return the updated book as JSON
    } else {
        res.status(404).json({ message: 'Book not found' }); // Return 404 if not found
    }
});




// Route to delete a book
app.delete('/books/:isbn', (req, res) => {
    const isbn = req.params.isbn;

    // Find the index of the book to delete
    const bookIndex = books.findIndex(b => b.isbn === isbn);
    
    if (bookIndex !== -1) {
        books.splice(bookIndex, 1); // Remove the book from the array
        res.status(204).send(); // Return a 204 No Content status
    } else {
        res.status(404).json({ message: 'Book not found' }); // Return 404 if not found
    }
});


// Route to partially update an existing book
app.patch('/books/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const updates = req.body; // Get the updates from the request body

    // Find the index of the book to update
    const bookIndex = books.findIndex(b => b.isbn === isbn);
    
    if (bookIndex !== -1) {
        // Get the existing book
        const book = books[bookIndex];

        // Update the book with the provided fields
        const updatedBook = { ...book, ...updates }; // Merge existing book with updates

        // Update the book in the array
        books[bookIndex] = updatedBook;

        // Return the updated book as JSON
        res.json(updatedBook);
    } else {
        res.status(404).json({ message: 'Book not found' }); // Return 404 if not found
    }
});






app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
  });
