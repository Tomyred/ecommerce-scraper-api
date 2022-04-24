import { Router } from "express";
import amazonProductsRouter from "../../scraping/amazon.js";

const amazonRouter = Router();

amazonRouter.get("/", amazonProductsRouter);

export default amazonRouter;
