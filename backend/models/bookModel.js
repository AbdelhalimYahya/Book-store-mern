import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            require: true
        },
        auther: {
            type: String,
            require: true
        },
        publishYear: {
            type: Number,
            require: true
        },
    },
    {
        timestamps: true
    }
)

export const book = mongoose.model('book' , bookSchema);