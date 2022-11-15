import express from "express";
import * as userController from "../controllers/userController";
import * as authController from "../controllers/authController";

const router = express.Router();


router.post( '/register', authController.registerHandler);
router.get("/login" , authController.loginHandler ) ;

router
  .route("/")
  .get(authController.protect , userController.getAll)

  .post(authController.protect , userController.createUser)

  
router.get("/:id", authController.protect, userController.getOne);
  


  
  


export default router;
