import express from "express";
import mongoose from "mongoose";
import multer from 'multer';
import cors from "cors"
import routes from "./routes/index.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());

mongoose.connect('mongodb://localhost/testdb').then(() => {
console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});

const PORT = process.env.PORT || 4500;

app.use("/api/v1", routes);
  
app.get("/", (req, res) => {
    res.send("Hi! I am live");
});  
  
const start = () => {
    try {
        app.listen(PORT, () => {
            console.log(`${PORT} server connected`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
