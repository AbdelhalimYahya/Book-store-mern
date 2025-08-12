import express from "express";
import { mongodb } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const PORT = 3012;
const app = express();

app.use(express.json())

app.get('/' , (req , res) => {
    console.log(req);
    return res.status(234).send("welcome mi amigo")
})

//route to get all book for a client 
app.get('/book' , async (req , res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({messsage: error.message})
    }
})

app.post('/book' , async (req , res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send("All fields are required : title | author | publishYear")
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }
        const book = await Book.create(newBook)
        return res.status(200).send(book)
    
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message : error.message})
    }
})

mongoose.connect(mongodb).then(() => {
    console.log("App connected to database successfully")
    app.listen(PORT , () => {
        console.log(`the app is running on the port : ${PORT}`)
    });
}).catch((error) => {
    console.log(error)
})