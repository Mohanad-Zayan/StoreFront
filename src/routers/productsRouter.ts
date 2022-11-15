import express from "express";
import * as productsController from "../controllers/productsController";
import * as authController from "../controllers/authController";

const router = express.Router();

router
  .route("/")
  //index
  .get(productsController.getAll)
  //create
  .post(authController.protect, productsController.createProduct);

router.get("/:id", productsController.getOne);

router.get("/category/:category", productsController.getProductByCategory);

export default router;
