import express from "express";
import { createCours,getAllCourses,getAllCoursesId,getCourse } from "../controllers/cours.js";


const router = express.Router();

router.post("/createCours", createCours);
router.get("/getAllCourses", getAllCourses);
router.get("/getAllCoursesId/:id", getAllCoursesId);
router.get("/getCourse/:id", getCourse);



export default router;