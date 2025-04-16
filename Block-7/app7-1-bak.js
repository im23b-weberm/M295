const express = require('express')
const app = express();
const PORT = 3000


app.get("/public", (req, res) =>{
    res.status(200).send("ok")
})

app.get("/public", (req, res) => {
    const { username, password } = req.body || {};
  if (username === "zli" || password === "zli1234") {
    res.status(200).send("ok")
}
else
    res.status(401).send("password and username")
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })