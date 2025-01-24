import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoute from './routes/userRoute.js'
import chartRoute from './routes/chartRoute.js'
import productRoute from './routes/productRoute.js'

dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

mongoose.connect(process.env.MONGO_URI).then((res)=>{
    console.log('connected succefully: ')
}).catch((err)=>{
    console.error("connection failed: ")
})

app.use('/users', userRoute)
app.use('/products', productRoute)
app.use('/charts', chartRoute)

app.all('*', (req, res)=>{
    res.status(400).send("path or method false: ",req.method, req.path)
})

app.listen(process.env.PORT, ()=>{
    console.log(`server running on http://localhost:${process.env.PORT}`)
})
