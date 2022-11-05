import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import postRouter from "./routes/postRoute.js";
import userRouter from "./routes/userRoute.js";

dotenv.config();
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(morgan("dev"));

const PORT = process.env.PORT || 5001;
const DB = process.env.DATABASE.replace(
    "<password>",
    process.env.DATABASE_PASSWORD
);

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`DB connected! Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err.message);
        process.exit(1);
    });
