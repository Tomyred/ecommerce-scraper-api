import puppeteer from "puppeteer";
import { Router } from "express";
import { defaultResponse } from "../../utils.js";

const meliProductsRouter = Router();

const url = "https://www.mercadolibre.com.ar/";

meliProductsRouter.get("/", async (req, res) => {
    try {
        const searchText = req.query.s;
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        await page.type(".nav-search-input", String(searchText));
        await page.click(".nav-search-btn");
        await page.goto(page.url());
        const { products, length } = await page.evaluate(() => {
            const products = [];
            const HTMLProducts = document.querySelectorAll("section > ol > li");
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
                        HTMLProduct.querySelector("h2").innerText;

                    const productHref =
                        HTMLProduct.querySelector("a").getAttribute("href");

                    const productPrice = HTMLProduct.querySelector(
                        ".price-tag-fraction"
                    ).innerText;

                    products.push({
                        img: productImg,
                        title: productTitle,
                        price: productPrice,
                        url: productHref,
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

export default meliProductsRouter;
