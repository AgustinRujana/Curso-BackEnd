//Imports
import { productoClass } from '../src/constructor'
import ejs from 'ejs'

//Express Initializing
const express = require('express')
const router = express.Router()

//Variables
let productos: any[] = []

//Ejs Initialization


//Services
const existanceCheck = (id, req, res) => {   
    const producto: any = productos.find( producto => producto.id === id)
    if (!producto) {
        res.sendStatus(404)
    }
    return producto
}

// Products Main
router.route('/productos')
    .get((req,res) =>{
        res.sendFile('form.html', {root: './public'})
    })
    .post((req, res) =>{
        const {title, price, thumbnail} = req.body 
        let productoNuevo = new productoClass(productos.length, title, price, thumbnail)
        productos.push(productoNuevo)
        res.sendFile('form.html', {root: './public'})
    })

//Products Lista
router.route('/productos/vista')
    .get((req,res) =>{
        productos.length > 0 ? res.render(ejs.render('productList.ejs', {productos: productos})) : res.render(ejs.render('productList.ejs', {}))     
    })

// Products :id
router.route('/productos/:id')
    .get((req,res: any) =>{
        existanceCheck(req.params.id, req, res)
    })
    .put((req,res) =>{
        const producto = existanceCheck(req.params.id, req, res)
        const { title, price, thumbnail } = req.body
        producto.title = title
        producto.price = price
        producto.thumbnail = thumbnail
    })
    .delete((req,res) =>{
        const id: number = req.params.id
        existanceCheck(id, req, res)
        productos = productos.filter( producto => producto.id !== id)
    })

//Exports
module.exports = router