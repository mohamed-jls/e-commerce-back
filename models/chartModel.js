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
    ],
    total:{
        type: Number,
        required: true,
        default: 0
    }
})

chartSchema.pre('save', async function(next){
    const products = this.products
    let total = 0
    for(let i=0; i<products.length; i++){
        const product = await mongoose.model('Product').findById(products[i].product)
        total += product.price * products[i].quantity
    }
    this.total = total
    next()
})

export default mongoose.model('Chart', chartSchema);