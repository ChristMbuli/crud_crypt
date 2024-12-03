import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utils/database.js";
import ProductRoute from "./routes/ProductRoute.js";

dotenv.config();
const app = express();

connectDB();

app.use(cors());

app.use(express.json());

// Routes
app.use("/api/products", ProductRoute);


// Middleware de gestion des erreurs
app.use((error, req, res, next) => {
  console.error("Server error:", error);
  const statusCode = error.statusCode || 500;
  const message = error.message || "Erreur de serveur";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
