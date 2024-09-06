import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import cors from 'cors';

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";

import { connectDB } from "./lib/db.js";
import {generateSampleData} from "./generalData.js"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 7080;

app.use(cors({
	origin: 'http://localhost:5173', // Cambia esto por la URL de tu frontend en producción
	methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
	credentials: true, // Si estás utilizando cookies o autenticación basada en sesiones
  }));

const __dirname = path.resolve();

// Borra la base de datos y genera nuevos datos de muestra
// generateSampleData()

app.use(express.json({ limit: "10mb" })); // allows you to parse the body of the request
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
	console.log("Server is running on http://localhost:" + PORT);
	connectDB();
});
