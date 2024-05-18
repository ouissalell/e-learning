import express from "express";
import { createChapitre,getChapitre,getChapitreAndActivite } from "../controllers/chapitre.js";


const router = express.Router();

router.post("/createChapitre", createChapitre);
router.get("/getChapitre/:id", getChapitre);
router.get("/getChapitreAndActivite/:id", getChapitreAndActivite);



export default router;