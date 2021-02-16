//Imports
import express from 'express'

//Express Initialization
const app = express();
const port: number = 8000;

app.use(express.json())
app.use(express.urlencoded( {extended:true } ))


app.set('views', './src/views')
app.set('view engine', 'pug')

////Routers
//Products Main
app.use('/', require('../routes/products'))

//Public
app.use(express.static('public'))

//Listen
app.listen(port, () => {
    console.log(`Running on port ${port}`)
})