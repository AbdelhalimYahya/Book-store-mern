import express from "express";

const PORT = 3012;
const app = express();

app.listen(PORT , () => {
    console.log(`the app is running on the port : ${PORT}`)
});