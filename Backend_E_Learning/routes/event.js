import express from "express";
import { createEvent,getAllEvents,getAllEventsId } from "../controllers/event.js";


const router = express.Router();

router.post("/createEvent", createEvent);
router.get("/getAllEvents", getAllEvents);
router.get("/getAllEventsId/:id", getAllEventsId);


export default router;