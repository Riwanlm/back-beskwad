import express from "express";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import eventRoutes from "./routes/event.routes";

const app = express();
const PORT = process.env.APP_PORT || 3000;

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/events", eventRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
