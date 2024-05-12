import express from "express";
import { createActivite , createActivitei,createActivitev,getAllActiviteId } from "../controllers/activit.js";


const router = express.Router();

router.post("/createActivite", createActivite);
router.post("/createActivitei", createActivitei);
router.post("/createActivitev", createActivitev);
router.get("/getAllActiviteId/:id", getAllActiviteId);


export default router;