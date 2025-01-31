import express from 'express';
import Chart from '../models/chartModel.js';
import Product from '../models/productModel.js';

const router = express.Router();

router.get('/:id', async (req, res)=> {
    try{
        const id = req.params.id;
        const chart = await Chart.findById(id);
        if(!chart){
            return res.status(404).json({message: 'Chart not found'});
        }
        res.status(200).json(chart);
    }catch(err){
        res.status(500).json({message: err.message});
    }
})

router.post('/:chartid/product/:productid', async (req, res) => {
    try {
        const chartId = req.params.chartid;
        const productId = req.params.productid;
        const { quantity } = req.body;

        if (!quantity || quantity < 1) {
            return res.status(400).json({ message: 'Quantity must be a positive integer' });
        }

        const chart = await Chart.findById(chartId);
        if (!chart) {
            return res.status(404).json({ message: 'Chart not found' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const productToUpdate = chart.products.find(pr => pr.product.equals(productId));

        if (productToUpdate) {
            productToUpdate.quantity = quantity;
        } else {
            chart.products.push({ product: productId, quantity });
        }

        const updatedChart = await chart.save();
        res.status(200).json(updatedChart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:chartid/product/:productid', async (req, res) => {
    try {
        const chartId = req.params.chartid;
        const productId = req.params.productid;

        // Find the chart
        const chart = await Chart.findById(chartId);
        if (!chart) {
            return res.status(404).json({ message: 'Chart not found' });
        }

        // Find the product (optional, depending on your use case)
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if the product exists in the chart
        const productIndex = chart.products.findIndex(pr => pr.product.equals(productId));
        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in chart' });
        }

        // Remove the product from the chart
        chart.products.splice(productIndex, 1); // Remove the product at the found index

        // Save the updated chart
        const updatedChart = await chart.save();
        res.status(200).json(updatedChart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router