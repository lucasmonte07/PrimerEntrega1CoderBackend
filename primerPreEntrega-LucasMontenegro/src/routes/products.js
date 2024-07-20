import { Router } from 'express';  
import ProductManager from '../controllers/PManager.js'

const producto = new ProductManager();

const routerProd = Router();

routerProd.get('/', async (req, res) => {    
    const limite = parseInt(req.query.limit);    
    if(!limite) return res.send(await producto.getProduct());
    const todos = await producto.getProduct();    
    const algunos = todos.slice(0, limite);
    res.send(await algunos);    
}) 

routerProd.get('/:id', async (req, res) => {
    let todos = await producto.getProduct();
    let queProducto = todos.find(prod => prod.id === parseInt(req.params.id));
    res.send(await queProducto)
})

routerProd.delete('/:id', async (req, res) => {  
    await producto.deleteProductById(req.params.id);    
    res.send("Se registró la baja del producto");
})

routerProd.post('/', async (req, res) => {  
    await producto.addProduct(req.body)
    res.send("Producto creado");
})

routerProd.put('/:id', async (req, res) => {     
    await producto.updateProductById(req.params.id, req.body)
    res.send("Producto Modificado");
})

export default routerProd;