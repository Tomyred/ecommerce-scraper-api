import puppeteer from "puppeteer";
import { Router } from "express";
import { defaultResponse } from "../../utils.js";

const CPProductsRouter = Router();

const url = "https://compragamer.com/?seccion=3&criterio=";

CPProductsRouter.get("/", async (req, res) => {
    try {
        const searchText = req.query.s;
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url + searchText);
        const { products, length } = await page.evaluate(() => {
            const products = [];
            const HTMLProducts = document.querySelectorAll(
                "#productos-container > div > div > div > cgw-products-list > div.row > div.col-12.col-lg-8.col-xl-8.noPaddingLeft.noPaddingRight > div.row.justify-content-between.addRow.ng-star-inserted > cgw-product-alone"
            );
            for (index in HTMLProducts) {
                if (index == Number(index)) {
                    const HTMLProduct = HTMLProducts[index];

                    let productImg =
                        HTMLProduct.querySelector("img").getAttribute(
                            "data-src"
                        );

                    if (productImg === null) {
                        productImg =
                            HTMLProduct.querySelector("img").getAttribute(
                                "src"
                            );
                    }

                    const productTitle =
                        HTMLProduct.querySelector("span").innerText;

                    const productHref =
                        HTMLProduct.querySelector("a").getAttribute("href");

                    const productPrice =
                        HTMLProduct.querySelector(".theme_precio").innerText;

                    products.push({
                        img: productImg,
                        title: productTitle,
                        price: productPrice,
                        url:
                            "https://" + window.location.hostname + productHref,
                    });
                }
            }
            return { products, length: products.length };
        });

        await browser.close();

        defaultResponse(req, res, products, length);
    } catch (error) {
        defaultResponse(req, res, null, null, error);
    }
});

export default CPProductsRouter;
