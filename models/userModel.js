import mongoose from "mongoose";
import { type } from "os";

const userShema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role:{
        type: String,
        required: true
    },
    chart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chart'
    }
})

export default mongoose.model('User', userShema);