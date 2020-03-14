import "reflect-metadata";
import express from "express";
import usersRoutes from "./api/routes/user/users";
import userRoutes from "./api/routes/user/user";
import morgan from "morgan";
import { notFoundHandler } from "./middleware/notFound";
import { errorHandler } from "./middleware/error";
import bodyParser from "body-parser";
// import { createConnection } from "typeorm";

const app = express();
const port = "4000";

export const startServer = async () => {
  // await testConn();

  app.use(morgan("dev"));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use("/api", usersRoutes);
  app.use("/api", userRoutes);

  app.use(errorHandler);

  app.use(notFoundHandler);

  app.listen(port, () => console.log(`http://localhost:${port}`));
};

startServer();

export default app;
