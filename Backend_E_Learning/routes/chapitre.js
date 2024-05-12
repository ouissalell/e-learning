import express from "express";
import { createChapitre,getChapitre } from "../controllers/chapitre.js";


const router = express.Router();

router.post("/createChapitre", createChapitre);
router.get("/getChapitre/:id", getChapitre);



export default router;