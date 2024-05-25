import express from "express";
import { createRepense,fetchFirstFalseResponseQuestion ,getQuizScore,deleteResponsesByQuizAndUser} from "../controllers/repense.js";


const router = express.Router();

router.post("/createRepense", createRepense);
router.get("/fetchFirstFalseResponseQuestion/:idQuiz/:idUser", fetchFirstFalseResponseQuestion);
router.get("/getQuizScore/:idQuiz/:idUser", getQuizScore);
router.delete("/deleteResponsesByQuizAndUser/:idQuiz/:idUser", deleteResponsesByQuizAndUser);






export default router;