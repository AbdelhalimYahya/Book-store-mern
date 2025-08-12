import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

//route to get all book for a client 
router.get('/' , async (req , res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

//route to get specific book for a client by id 
router.get('/:id' , async (req , res) => {
    try {
        const {id} = req.params
        const sbook = await Book.findById(id);
        return res.status(200).json(sbook)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

router.post('/' , async (req , res) => {
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

//route for update a specific book using its id
router.put('/:id' , async (req , res) => {
    try {
        const {id} = req.params
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send("All fields are required : title | author | publishYear")
        }
        const result = await Book.findByIdAndUpdate(id , req.body)

        if(!result) {
            return res.status(500).json({message: 'Book not found'})
        }

        return res.status(200).send({message: "Book is updated Successfully"})
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

//route for delete a specific book 
router.delete('/:id' , async (req , res) => {
    try {
        const {id} = req.params
        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({message: "Book not found"})
        }
        return res.status(200).send({message: "Book is deleted successfully"})
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

export default router;