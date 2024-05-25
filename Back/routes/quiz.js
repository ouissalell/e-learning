import express from "express";
import { createQuiz,getQuiz, getQuizId } from "../controllers/quiz.js";


const router = express.Router();

router.post("/createQuiz", createQuiz);
router.get("/getQuiz/:id", getQuiz);
router.get("/getQuizId/:id", getQuizId);





export default router;