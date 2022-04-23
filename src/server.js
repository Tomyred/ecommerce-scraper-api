import express from "express";
import morgan from "morgan";
import cors from "cors";
import { json } from "express";
import dotenv from "dotenv";
import register from "./routes/index.js";

dotenv.config();

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(json({ limit: "30mb" }));

const port = process.env.PORT ? process.env.PORT : 8080;

register(app);

app.listen({ port }, () => {
    console.log(
        `eCommerce scraper server - server started at http://localhost:${port}`
    );
});
