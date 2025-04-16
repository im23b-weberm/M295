const express = require('express');
const cors = require("cors")
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const app = express();
const PORT = 3000


let books = []
let bookid = 0

app.use(cors());
app.use(express.json());











/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of all books
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               year:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Book added successfully
 */

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



/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Single book
 */

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               year:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Book updated
 */

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book deleted
 */


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


const swaggerOptions = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "Bomboclat Book API",
        version: "1.0.0",
        description: "API fi manage books, built by real yardman dev"
      },
      servers: [
        {
          url: "http://localhost:3000",
          description: "Local dev server"
        }
      ]
    },
    apis: ["./app.js"], // change if yuh using a different filename
  };
  
  const swaggerDocs = swaggerJsdoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  let lends = [
	{
		id: 1,
		isbn: "9783552059087",
		customer_id: 1,
		borrowed_at: new Date().toISOString(),
		returned_at: null
	}
]

// GET /lends
app.get("/lends", (request, response) => {
	response.json(lends)
})

// GET /lends/:id
app.get("/lends/:id", (request, response) => {
	const lend = lends.find(l => l.id == request.params.id)
	
	if(!lend) return response.sendStatus(404)

	response.json(lend)
})

// POST /lends
app.post("/lends", (request, response) => {
	const newLend = request.body
	newLend.id = lends.length + 1
	newLend.borrowed_at = new Date().toISOString()
	newLend.returned_at = null

	if(!isValid(newLend)) return response.sendStatus(422)
	
	lends.push(newLend)
	response.json(newLend)
})

// PATH /lends/:id
app.patch("/lends/:id", (request, response) => {
	const lendIndex = lends.findIndex(lend => lend.id == request.params.id)

	if(lendIndex < 0) return response.sendStatus(404)

	const updateParams = (({ isbn, customer_id, returned_at }) => ({ isbn, customer_id, returned_at }))(request.body)
	const updatedLend = { ...lends[lendIndex], ...updateParams }

	if(!isValid(updatedLend)) return response.sendStatus(422)
	if(!isLendable(updatedLend)) return response.sendStatus(422)

	lends.splice(lendIndex, 1, updatedLend)
	response.json(updatedLend)
})

function isValid(lend) {
	return lend.isbn != undefined && lend.isbn != "" &&
	 lend.customer_id != undefined && lend.customer_id != "" &&
	 lend.borrowed_at != undefined && lend.borrowed_at != "" &&
	 (lend.returned_at == null || Date.parse(lend.returned_at) != NaN)
}

function isLendable(lend) {
	let customerLends = 0
	let bookLends = 0

	lends.forEach(otherLend => {
		if(lend.isbn == otherLend.isbn && otherLend.returned_at == null) bookLends++;
		if(lend.customer_id == otherLend.customer_id && otherLend.returned_at == null) customerLends++;
	})

	return customerLends <= 3 && bookLends < 1
}






app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
  });