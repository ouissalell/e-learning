import express from "express";
import { register, login, logout } from "../controllers/auth.js";
import { createEvent } from "../controllers/event.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.post("/createEvent", createEvent);

export default router;