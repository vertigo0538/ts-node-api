import request from "supertest";
import app from "../../../index";
import { Connection } from "typeorm";
import { testConn } from "../../../test-utils/testConn";

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
});

describe("Register", () => {
  test("post register", done => {
    request(app)
      .post("/api/register")
      .send({
        firstName: "kim",
        lastName: "hyunki",
        email: "ston09@naver.com"
      })
      .set("Accept", "application/json")
      // .expect(201, done);
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});
