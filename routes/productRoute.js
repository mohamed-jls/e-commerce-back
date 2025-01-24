import express from 'express';

import Product from '../models/productModel.js';

const router = express.Router();

router.get('/', async (req, res)=> {
    try{
        const products = await Product.find();
        res.status(200).json(products);
    }catch(err){
        res.status(500).json({message: err.message});
    }
})

router.get('/:id', async (req, res)=>{
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({message: 'Product not found'});
        } 
        res.status(200).json(product);
    }catch(err){
        res.status(500).json({message: err.message});
    }
})

router.post('/', async (req, res)=> {
    try{
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            countInStock: req.body.countInStock,
            imageUrl: req.body.imageUrl
        })
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    }catch(err){
        res.status(500).json({message: err.message});
    }
})

router.put('/:id', async (req, res)=>{
    try{
        const id = req.params.id;
        let product = await Product.findById(id);
        if(!product){
            return res.status(404).json({message: 'Product not found'});
        }
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json(updatedProduct);
    }catch(err){
        res.status(500).json({message: err.message});
    }
})

router.delete('/:id', async (req, res)=>{
    try{
        const id = req.params.id;
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({message: 'Product not found'});
        }
        await product.remove();
        res.status(200).json({message: 'Product deleted'});
    }catch(err){
        res.status(500).json({message: err.message});
    }
})

export default router;
