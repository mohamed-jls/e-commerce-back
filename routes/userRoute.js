import express from 'express';

import User from '../models/userModel.js';

import Chart from '../models/chartModel.js';

const router = express.Router();


router.get('/', async (req, res)=> {
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json({message: err.message});
    }
})

router.get('/auth', async (req, res)=> {
    try{
        const user = await User.findOne({email: req.query.email, password: req.query.password});
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({message: err.message});
    }
})

router.get('/:id', async (req, res)=>{
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        } 
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({message: err.message});
    }
})

router.post('/', async (req, res)=> {
    try{
        const chart = new Chart({
            products: []
        })
        const newChart = await chart.save();
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: 'USER',
            chart: newChart
        })
        const newUser = await user.save();
        res.status(201).json(newUser);
    }catch(err){
        res.status(500).json({message: err.message});
    }
})

router.post('/admin', async (req, res)=> {
    try{
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: 'ADMIN',
            chart: new Chart({
                products: []
            })
        })
        const newUser = await user.save();
        res.status(201).json(newUser);
    }catch(err){
        res.status(500).json({message: err.message});
    }
})

router.put('/:id', async (req, res)=>{
    try{
        const id = req.params.id;
        const newUser = req.body;
        const user = await User.findByIdAndUpdate(id, newUser, {new: true});
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({message: err.message});
    }
})

router.delete('/:id', async (req, res)=>{
    try{
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);
        const chart = await Chart.findByIdAndDelete(user.chart._id);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json({user: user, chart: chart});
    }catch(err){
        res.status(500).json({message: err.message});
    }
})

export default router;