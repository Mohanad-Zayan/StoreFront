import supertest from "supertest";
import Client from "../../database";
import { User, UserModel } from "../../models/user";
import app from "../../server";

const request = supertest(app);

const _UserModel = new UserModel();
export let user:User ;
export let token: string;
describe("Testing User Routes Endpoints", () => {
  user = {
    firstName: "test",
    lastName: "temp",
    username: "testTemp",
    password: "password1234",
  };

  describe("Testing Auth and User handlers", () => {
    describe("Auth Specfic Handlers", () => {
      it("post /register should create a new user", async () => {
        const res = await request
          .post("/register")
          .set("Content-type", "application/json")
          .send({
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
            username: user.username,
          });

        user.id = res.body.data.registeredUser.id;
        expect(res.status).toBe(201)
      });

      it("get /login Should return user And token", async () => {
        const res = await request
          .get("/login")
          .set("Content-type", "application/json")
          .send({
            username: user.username,
            password: user.password,
          });
        
        token = res.body.data.token;
        user.id = res.body.data.id
        user.password  = undefined  ;
        res.body.data.password  = undefined  ;
          
        expect(res.status).toBe(200);
        expect(res.body.data).toEqual({...user, token});
      }); //
    });

    describe("User specfic  Handlers", () => {
      it("get /:id should return one user", async () => {
        const res = await request
          .get(`/${user.id}`)
          .set("Content-type", "application/json")
          .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.data.user).not.toBeNull();
      });
      it("get / should return all user", async () => {
        const res = await request
          .get(`/`)
          .set("Content-type", "application/json")
          .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.data.users.length).toBeGreaterThanOrEqual(1);
      });

      //test for register and create is the same
      it("post /  should fail because no token attached", async () => {
        const res = await request
          .post(`/`)
          .set("Content-type", "application/json")
          .send({
            firstname: user.firstName,
            lastname: user.lastName,
            username: user.username,
            password: user.password,
          });

        expect(res.status).toBe(401);
      });
    });
  });
});
