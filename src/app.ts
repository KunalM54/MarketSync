import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import healthRoutes from './modules/health/health.routes.js'
import authRoutes from './modules/auth/auth.routes.js'
import { errorHandler } from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import userRoutes from "./modules/user/user.routes.js"
import categoryRoutes from "./modules/category/category.routes.js"
import brandRoutes from "./modules/brand/brand.routes.js"
import productRoutes from "./modules/product/product.routes.js"
import inventoryRoutes from "./modules/inventory/inventory.routes.js"
import cartRoutes from "./modules/cart/cart.routes.js"
import addressRoutes from "./modules/address/address.routes.js"
import paymentRoutes from "./modules/payment/payment.routes.js"
import orderRoutes from "./modules/order/order.routes.js"
import uploadRoutes from "./modules/upload/upload.routes.js"

const app = express()

// Allow the frontend (dev: localhost:5173, prod: CLIENT_ORIGIN) to call this API
// Credentials must be allowed so cookies can travel with cross-origin requests.
app.use(
  cors({
    origin: env.CLIENT_ORIGIN,
    credentials: true,
  })
);

// Base64 image uploads need a larger body limit
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use("/api/v1/health", healthRoutes)
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/categories", categoryRoutes)
app.use("/api/v1/brands", brandRoutes)
app.use("/api/v1/products", productRoutes)
app.use("/api/v1/inventory", inventoryRoutes)
app.use("/api/v1/cart", cartRoutes)
app.use("/api/v1/addresses", addressRoutes)
app.use("/api/v1/payment", paymentRoutes)
app.use("/api/v1/orders", orderRoutes)
app.use("/api/v1/uploads", uploadRoutes)

app.use(errorHandler)
export default app;