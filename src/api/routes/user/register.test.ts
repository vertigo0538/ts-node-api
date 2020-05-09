import request from "supertest";
import app from "../../../index";
import { Connection } from "typeorm";
import { testConn } from "../../../test-utils/testConn";

let conn: Connection;
beforeAll(async () => {
  console.log("before");
  conn = await testConn();
});

afterAll(async () => {
  console.log("close");
  await conn.close();
});

describe("POST /api/register", () => {
  test("post register", (done) => {
    request(app)
      .post("/api/register")
      .send({
        firstName: "kim",
        lastName: "hyunki",
        email: "ston053812@naver.com",
        password: "password",
      })
      .set("Accept", "application/json")
      .expect(201, done);
  });
});

// describe("POST /api/login", () => {
//   test("Login", (done) => {
//     request(app)
//       .post("/api/login")
//       .send({
//         email: "ston053812@naver.com",
//         password: "password",
//       })
//       .set("Accept", "application/json")
//       .expect(201, done);
//   });
// });
