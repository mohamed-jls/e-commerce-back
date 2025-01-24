import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    description: {
        type: String,
        required: true,
        default: 'No description'
    },
    category: {
        type: String,
        required: true
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    },
    imageUrl: {
        type: String,
        required: true
    }
});

export default mongoose.model('Product', productSchema);