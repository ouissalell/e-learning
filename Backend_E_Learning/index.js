import express from "express";
import authRoutes from "./routes/auth.js";
import eventRoutes from "./routes/event.js";
import imageRoutes from "./routes/image.js";
import videoRoutes from "./routes/video.js";
import coursRoutes from "./routes/cours.js";
import activiteRoutes from "./routes/activite.js";
import chapitreRoutes from "./routes/chapitre.js";
import cookieParser from "cookie-parser";




import corsMiddleware from './middleware/cors.js'; 

const app = express();

app.use(corsMiddleware);

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/image", imageRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/cours", coursRoutes);
app.use("/api/chapitre", chapitreRoutes);
app.use("/api/activite", activiteRoutes);


app.listen(8800, () => {
  console.log("Connected!");
});