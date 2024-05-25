import express from "express";
import { register, login, logout,checkUserRole,checkUserRoleA,countUsers,getLatestTeachers } from "../controllers/auth.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/checkUserRole/:id", checkUserRole);
router.get("/checkUserRoleA/:id", checkUserRoleA);
router.get("/countUsers", countUsers);
router.get("/latestTeachers", getLatestTeachers);



export default router;