import { Router } from "express";
import { AssetController } from "../controller/asset_controller";

export default function (assetController: AssetController) {
  const router = Router();

  router.get("/assets", assetController.getAll.bind(assetController));

  return router;
}
