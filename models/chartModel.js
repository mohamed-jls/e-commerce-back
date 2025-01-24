import mongoose from "mongoose";

const chartSchema = new mongoose.Schema({
    products:[
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity:{
                type: Number,
                required: true,
                default: 1
            }
        }
    ]
})

export default mongoose.model('Chart', chartSchema);