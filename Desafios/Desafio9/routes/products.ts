//Imports
import { productoClass } from '../src/constructor'

//Express Initializing
const express = require('express')
const router = express.Router()

//Variables
let productos: any[] = []

//Services
const existanceCheck = (id: any, req: any, res: any) => {   
    const producto: any = productos.find( producto => producto.id === id)
    if (!producto) {
        res.sendStatus(404)
    }
    return producto
}
// Products Main
router.route('/productos')
    .get((req: any,res: any) =>{
        productos.length > 0 ? res.json(productos) : res.sendStatus(204)
    })
    .post(
        // function(req: any, res: any, next: any){
        // console.log(req.body)
        // next()},
        (req: any, res: any) =>{
        const {title, price, thumbnail} = req.body 
        let productoNuevo = new productoClass(productos.length, title, price, thumbnail)
        productos.push(productoNuevo)
        console.log(productos)
        res.sendStatus(201)
    })

// Products :id
router.route('/productos/:id')
    .get((req: any,res: any) =>{
        existanceCheck(req.params.id, req, res)
    })
    .put((req: any,res: any) =>{
        const producto = existanceCheck(req.params.id, req, res)
        const { title, price, thumbnail } = req.body
        producto.title = title
        producto.price = price
        producto.thumbnail = thumbnail
    })
    .delete((req: any,res: any) =>{
        const id: number = req.params.id
        existanceCheck(id, req, res)
        productos = productos.filter( producto => producto.id !== id)
    })

//Exports
module.exports = router