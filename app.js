const express = require('express')
const app = express()
const port = 4000

// setea carpeta publica o estatica
app.use(express.static(__dirname + '/public'))

// primera ruta que envia home.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/home.html')
})

app.get('/addProduct', (req, res) => {
    res.sendFile(__dirname + '/views/addProduct.html')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})