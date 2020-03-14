import "reflect-metadata";
import express from "express";
import userRoutes from "../src/api/routes/users";
import morgan from "morgan";
import { notFoundHandler } from "./middleware/notFound";
import { errorHandler } from "./middleware/error";

const app = express();
const port = "4000";

export const startServer = async () => {
  app.use(morgan("dev"));

  app.use("/api", userRoutes);

  app.use(errorHandler);

  app.use(notFoundHandler);

  app.listen(port, () => console.log(`http://localhost:${port}`));
};

startServer();

export default app;
