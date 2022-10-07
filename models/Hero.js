// import mongoose 
import mongoose from "mongoose";
 
// Buat Schema
const Hero = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    power:{
        type: String,
        required: true
    },
    image:
    {
        data: Buffer,
        contentType: String
    },
    agency:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
});
 
// export model
export default mongoose.model('Heroes', Hero);