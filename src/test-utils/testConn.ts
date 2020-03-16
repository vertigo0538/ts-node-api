import { createConnection } from "typeorm";

export const testConn = (drop: boolean = true) => {
  return createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "type-node-api-test",
    synchronize: drop,
    // dropSchema: drop,
    entities: [__dirname + "/../entity/*.ts"]
  });
};
