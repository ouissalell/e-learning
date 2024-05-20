import express from "express";
import { createEvent,getAllEvents,getAllEventsId,getLatestEvents } from "../controllers/event.js";


const router = express.Router();

router.post("/createEvent", createEvent);
router.get("/getAllEvents", getAllEvents);
router.get("/getAllEventsId/:id", getAllEventsId);
router.get("/getLatestEvents", getLatestEvents);


export default router;