import { Router } from "express";
import meliProductsRouter from "../../scraping/meli.js";

const meliRouter = Router();

meliRouter.get("/", meliProductsRouter);

export default meliRouter;
