import meliRouter from "./v1/meli/index.js";

const register = async app => {
    app.use("/meli", meliRouter);
};

export default register;
