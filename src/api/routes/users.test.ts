import request from "supertest";
import app from "../../index";

afterAll(async done => {
  done();
});
describe("Users api test", () => {
  test("fetches successfully data from an Api", () => {
    // const response = await request(app).get("/api/users");
    // expect(response.body).toMatchObject({
    //   message: "Handling GET requests to /users"
    // });
    return request(app)
      .get("/api/users")
      .expect(200);
  });
});
