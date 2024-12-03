import Product from "../model/ProductModel.js";
import { errorHandler } from "../utils/errorHandler.js";
import CryptoJS from "crypto-js";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY ;


export const newProduct = async (req, res, next) => {
  const { title, content, price } = req.body;

  if (!title || !content || !price) {
    return res.status(400).json({
      success: false,
      message: "Veuillez fournir tous les champs requis",
    });
  }

  try {
    const newProduct = new Product({
      title,
      content,
      price,
    });
    await newProduct.save();

    return res.status(200).json({
      success: true,
      message: "Nouvel Produit ajouté avec succès",
      product: newProduct,
    });
  } catch (error) {
    next(errorHandler(error.status || 500, error.message || "Erreur Server"));
  }
};

export const getProduct = async (req, res, next) => {
    try {
      const products = await Product.find();
  
      // Chiffrement des données sensibles
      const encryptedProducts = products.map((product) => {
        return {
          ...product._doc, 
          title: CryptoJS.AES.encrypt(product.title, ENCRYPTION_KEY).toString(),
          content: CryptoJS.AES.encrypt(product.content, ENCRYPTION_KEY).toString(),
          price: CryptoJS.AES.encrypt(product.price.toString(), ENCRYPTION_KEY).toString(),
        };
      });
  
      return res.status(200).json({
        success: true,
        products: encryptedProducts,
      });
    } catch (error) {
      next(errorHandler(error.status || 500, error.message || "Erreur Server"));
    }
  };
