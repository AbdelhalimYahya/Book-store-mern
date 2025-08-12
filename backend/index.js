import express from "express";
import { mongodb } from "./config.js";
import mongoose from "mongoose";
import bookRoutes from "./routes/bookRoutes.js"
import { Book } from "./models/bookModel.js";

const PORT = 3012;
const app = express();

app.use(express.json())

app.get('/' , (req , res) => {
    console.log(req);
    return res.status(234).send("welcome mi amigo")
})

app.use('/book' , bookRoutes)

mongoose.connect(mongodb).then(() => {
    console.log("App connected to database successfully")
    app.listen(PORT , () => {
        console.log(`the app is running on the port : ${PORT}`)
    });
}).catch((error) => {
    console.log(error)
})
