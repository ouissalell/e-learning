import express from "express";
import { createLecture,getLectureCours } from "../controllers/lecture.js";


const router = express.Router();

router.post("/createLecture", createLecture);
router.get("/getLectureCours/:id", getLectureCours);







export default router;