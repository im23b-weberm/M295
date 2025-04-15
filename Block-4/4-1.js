// for html
fetch("https://www.zli.ch")
  .then(res => res.text())
  //.then(html => console.log(html))
  .catch(err => console.error("Error:", err));


//for error 
fetch("https://www.zli.ch/thispagedoesnotexist")
.then(res => {
console.log("Status:", res.status); // Should be 404
return res.text();
})
  //.then(html => console.log(html))
.catch(err => console.error("Error:", err));

// for picture
fetch("https://picsum.photos/200/300")
.then(res => {
    console.log("Image URL:", res.url);
    //console.log(res)
})
.catch(err => console.error("Error:", err));


// for json
fetch("https://pokeapi.co/api/v2/pokemon/ditto")
.then(res =>{res.json()})
.then(data => console.log(data))
.catch(err => console.error("Error:", err));


// for txt
fetch("https://catfact.ninja/fact")
  .then(res => res.json())
  .then(data => console.log("Cat Fact:", data.fact))
  .catch(err => console.error("Error:", err));


// for json
fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))