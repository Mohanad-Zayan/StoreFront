import supertest from "supertest";
import app from "../server";

const request = supertest(app);



describe('Testing EndPoint' , ( ) => {

    it("Response status toBe 401", async (): Promise<void> => {
      const response = await request.get("/");
      expect(response.status).toBe(401);
    });
})
// no token therefore 401 

