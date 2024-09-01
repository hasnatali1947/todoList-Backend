import express from "express";
import userController from "../controllers/userController.js"
import { authenticateToken } from "../hooks/token.js"

const router = express.Router();

router.post("/signup", userController.signUp)
router.post("/login", userController.login)
router.put("/todoUpdate", authenticateToken, userController.todoUpdate)
router.get("/getUser", authenticateToken, userController.getUser)
router.post("/deleteItem", authenticateToken, userController.deleteItem)
router.put("/editItem", authenticateToken, userController.editItem)

export default router