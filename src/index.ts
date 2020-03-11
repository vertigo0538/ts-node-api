import "reflect-metadata";
import express from "express";
// import express, { Request, Response } from "express";
// import { createConnection } from "typeorm";
import { testConn } from "./test-utils/testConn";

const app = express();
const port = "4000";

export const startServer = async () => {
  // await createConnection();
  await testConn();
  app.listen(port, () => console.log(`http://localhost:${port}`));
};

startServer();
