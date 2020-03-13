import "reflect-metadata";
import express from "express";
import userRoutes from "../src/api/routes/users";

const app = express();
const port = "4000";

export const startServer = async () => {
  app.get("/", (req, res) => {
    res.send("hello world!");
  });
  app.use("/api", userRoutes);
  app.listen(port, () => console.log(`http://localhost:${port}`));
};

startServer();

export default app;
