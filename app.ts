import express from "express";
import dotenv from "dotenv";
import { initializeDatabase } from "./infrastructure/database/database_connector";

dotenv.config();
const app = express();
const cors = require("cors");

app.use(cors());

// Global middlewares loaded before startServer
app.use(express.json()); // Body parser middleware for JSON
app.use(express.urlencoded({ extended: true })); // Body parser for form submissions

async function startServer() {
  try {
    // Initialize database
    const db = await initializeDatabase();

    // Register routes after the database is initialized

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
