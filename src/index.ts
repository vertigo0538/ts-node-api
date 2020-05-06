import "reflect-metadata";
import express from "express";

import morgan from "morgan";
import { notFoundHandler } from "./middleware/notFound";
import bodyParser from "body-parser";
import session from "express-session";
import connectRedis from "connect-redis";
import { redis } from "./reids";
import cors from "cors";
import { createConnection } from "typeorm";

import userRoutes from "./api/routes/user/user";
import usersRoutes from "./api/routes/users/users";
import productsRoutes from "./api/routes/product/products";

const app = express();

export const startServer = async () => {
  if (process.env.NODE_ENV === "production") {
    await createConnection();
  }

  const RedisStore = connectRedis(session);
  // const port = "4000";

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
      }),
      name: "qid",
      secret: "aslkdfjoiq12312",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        // sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      },
    })
  );

  app.use(morgan("dev"));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use("/api", userRoutes);
  app.use("/api", usersRoutes);
  app.use("/api", productsRoutes);

  app.use(notFoundHandler);
  app.listen(port, () => console.log(`http://localhost:${port}`));
};

try {
  startServer();
} catch (error) {
  console.log(error);
}

export default app;
