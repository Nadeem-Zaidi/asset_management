import express from "express";
import dotenv from "dotenv";
import { initializeDatabase } from "./infrastructure/database/database_connector";
import asset_router from "./web_services/router/asset_router";
import { AssetService } from "./application/services/asset_service";
import { AssetController } from "./web_services/controller/asset_controller";

dotenv.config();
const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function startServer() {
  try {
    const db = await initializeDatabase();
    const assetService = new AssetService();
    const assetController = new AssetController(assetService);
    app.use("/", asset_router(assetController));

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
