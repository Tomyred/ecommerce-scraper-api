import puppeteer from "puppeteer";
import { Router } from "express";
import { defaultResponse } from "../../utils.js";

const amazonProductsRouter = Router();

const url = "https://www.amazon.com/";

amazonProductsRouter.get("/", async (req, res) => {
    try {
        const searchText = req.query.s;
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        await page.type("#twotabsearchtextbox", String(searchText));
        await page.click("#nav-search-submit-button");
        await page.waitForNavigation();
        const data = await page.evaluate(() => {
            const products = [];
            const HTMLProducts = document.querySelectorAll(".sg-col-inner")[2];

            let iterationValue;
            let endIteration;
            let usBoolean;
            if (window.location.href.includes("__mk_es_US")) {
                iterationValue = 1;
                endIteration = 47;
                usBoolean = true;
            } else {
                iterationValue = 5;
                endIteration = 80;
                usBoolean = false;
            }

            for (let i = 0; i < endIteration; i += iterationValue) {
                const HTMLProduct =
                    HTMLProducts.querySelectorAll(".sg-col-inner")[i];

                const productPrice =
                    HTMLProduct.querySelector(".a-price-whole");

                const productImg =
                    HTMLProduct.querySelector("img").getAttribute("src");

                const productTitle = HTMLProduct.querySelector("h2").innerText;

                const productHref =
                    HTMLProduct.querySelector("a").getAttribute("href");

                products.push({
                    img: productImg,
                    title: productTitle,
                    price: productPrice
                        ? usBoolean
                            ? productPrice.innerText.substring(
                                  0,
                                  productPrice.innerText.length - 2
                              )
                            : productPrice.innerText
                        : "Precio no disponible",
                    url: "https://" + window.location.hostname + productHref,
                });
            }
            return { products, length: products.length };
        });

        await browser.close();
        defaultResponse(req, res, data.products, data.length);
    } catch (error) {
        defaultResponse(req, res, null, null, error);
    }
});

export default amazonProductsRouter;
