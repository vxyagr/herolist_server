//import express
import express from "express";
//import mongoose
import mongoose from "mongoose";
// import routes
import route from "./routes/index.js";
//import cors
import cors from "cors";
import * as dotenv from 'dotenv' 
dotenv.config()
import bodyParser from "body-parser";

//require('dotenv/config');
// construct express function
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
  
// Set EJS as templating engine 
app.set("view engine", "ejs");
 


mongoose.connect("mongodb+srv://vxyagr:700AAaa90@cluster0.8j3pk9b.mongodb.net/?retryWrites=true&w=majority",{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (error)=> console.error(error));
db.once('open', () => console.log('Database Connected'));
 
// middleware 
app.use(cors());
app.use(express.json());
app.use('/hero',route);
 
// listening to port
var port = process.env.PORT || '5000'
app.listen(port, err => {
    if (err)
        throw err
    console.log('Server listening on port', port)
})