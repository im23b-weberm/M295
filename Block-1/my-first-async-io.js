var fs = require('fs')  
var filename = process.argv[2]  
  
file = fs.readFile(filename, function (err, contents) {  
  // fs.readFile(file, 'utf8', callback) can also be used  
  console.log(contents.toString().split('\n').length - 1)   
})