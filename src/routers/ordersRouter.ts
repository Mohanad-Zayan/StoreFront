import express from "express";
import * as orderController from "../controllers/orderController";
import * as authController from "../controllers/authController";

const router = express.Router();

router.use(authController.protect) ;

router.post("/",orderController.createOrder);
router.get("/:id", orderController.getOne);


router.get("/user/:userid", orderController.getOrders);
router.get("/user/:userid/status/:status", orderController.getOrdersWithStatusCheck);

//add product to order
//orders/12/products
router.post("/:orderId/products" , orderController.addProduct)



export default router;
