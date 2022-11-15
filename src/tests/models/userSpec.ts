import { UserModel, User } from "../../models/user";
import Client from "../../database";

const _UserModel = new UserModel();

describe("User Model Testing", () => {
  const user:User = {
    
    firstName: "temp1",
    lastName: "test",
    username: "temp1Test",
    password: "password1234",
  }
 
  describe('User should Have index , create , show , getByUsername ', () => { 
    it("User model should have an index method", (): void => {
      expect(_UserModel.index).toBeDefined();
    });
    it("User model should have a create method", (): void => {
      expect(_UserModel.create).toBeDefined();
    });
    it("User model should have a show method", (): void => {
      expect(_UserModel.show).toBeDefined();
    });
    it("User model should have a getByUsername method", (): void => {
      expect(_UserModel.show).toBeDefined();
    });
  
   })
  

  
  describe('check the truthness of the data' , () => {

    it("create method should return a new user", async (): Promise<void> => {
      const u : User = await _UserModel.create(user);
      
      user.id = u.id; 
      user.password = undefined;
      u.password = undefined;
      expect(u).not.toBeNull();
      expect(u).toEqual(user)
    });
    
    
    it("getByUsername method should return a user Obj", async (): Promise<void> => {
      const u : User = await _UserModel.getByUsername( "temp1Test"); 
      user.id = u.id; 
      user.password = u.password;
      expect(u).not.toBeNull();
      expect(u).toEqual(user)
    });
    it("show method should return a user Obj", async (): Promise<void> => {
      const u : User = await _UserModel.show(user.id as string); 
      user.id = u.id; 
      user.password = undefined ;
      u.password = undefined ;

      expect(u).not.toBeNull();
      expect(u).toEqual(user)
    });
    it("index method should return user array ", async (): Promise<void> => {
      const us : User[]  = await _UserModel.index(); 
      expect(us).not.toBeNull();
      expect(us.length).toBeGreaterThanOrEqual(1);
      
    });
  })
  
});
