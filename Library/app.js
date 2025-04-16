const express = require('express');
const cors = require("cors")
const app = express();
const PORT = 3000


books = []
let bookid = 0

app.use(cors());
app.use(express.json());

app.get("/books", (req, res) => {
    res.status(200).json(books)
})

app.get("/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    let book = books.find(b => b.id === id);
    console.log(book)

    res.json(book)
})


app.post("/books", (req, res) => {
    const newBook = req.body
    if (newBook) {
        bookid++
        const bookWithId = { id: bookid, ...newBook }; // Add the ID to the new book
        books.push(bookWithId)
        res.json(bookWithId)
        return {...newBook, bookid}
        
    }
    else {
        res.status(400).send("wrong format of book")
    }
})


app.put("/books/:id", (req, res) => {
    const updatedBook = req.body
    const id = parseInt(req.params.id);

    const bookIndex = books.findIndex(b => b.id === id);
    books[bookIndex] = updatedBook;
    res.json(updatedBook)

})


app.delete("/books/:id", (req, res) => {
    const id = parseInt(req.params.id)

    const delbook = books.findIndex(b => b.id === id);

    books.splice(delbook, 1);
    res.status(200)
})






app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
  });