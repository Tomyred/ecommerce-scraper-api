import amazonRouter from "./v1/amazon/index.js";
import CPRouter from "./v1/compra-gamer/index.js";
import meliRouter from "./v1/meli/index.js";

const register = async app => {
    app.use("/meli", meliRouter);
    app.use("/amazon", amazonRouter);
    app.use("/compra-gamer", CPRouter);
};

export default register;
