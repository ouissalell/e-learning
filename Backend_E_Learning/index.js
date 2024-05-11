import express from "express";
import authRoutes from "./routes/auth.js";
import eventRoutes from "./routes/event.js";
import imageRoutes from "./routes/image.js";
import cookieParser from "cookie-parser";




import corsMiddleware from './middleware/cors.js'; 

const app = express();

app.use(corsMiddleware);

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/image", imageRoutes);


app.listen(8800, () => {
  console.log("Connected!");
});