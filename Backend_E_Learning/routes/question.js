import express from "express";
import { createQuestion,getQuestions } from "../controllers/question.js";


const router = express.Router();

router.post("/createQuestion", createQuestion);
router.get("/getQuestions/:id", getQuestions);






export default router;