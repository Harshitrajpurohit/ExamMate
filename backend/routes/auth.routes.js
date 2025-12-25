import express from "express";
import { logInUser, sighInUser, logOutUser, me } from "../controllers/auth.controller.js";


const router = express.Router();

router.post("/login", logInUser);
router.post("/register", sighInUser);
router.post("/logout", logOutUser);
router.get("/me", me);

export default router;