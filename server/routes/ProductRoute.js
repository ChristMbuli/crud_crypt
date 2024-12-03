import express from "express";
import { getProduct, newProduct } from "../controller/ProductController.js";

const router = express.Router();

router.post("/new", newProduct);
router.get("/", getProduct);


export default router;
