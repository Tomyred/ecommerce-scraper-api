import { Router } from "express";
import CPProductsRouter from "../../scraping/compra-gamer.js";

const CPRouter = Router();

CPRouter.get("/", CPProductsRouter);

export default CPRouter;
