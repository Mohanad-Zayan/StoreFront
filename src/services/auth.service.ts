//class register login

import env from "../helpers/env.helper";
import { User, UserModel } from "../models/user";
import { comparePassword } from "../util/passwordHandler";
import jwt from "jsonwebtoken";

const _UserModel= new UserModel() ; 
export default class AuthService {
     generateToken (id: string) : string  {
        return jwt.sign({ id }, env('JWT_SECRET') as string);
      };
      

    async register(u:User): Promise<User> { 
        return await  _UserModel.create(u) ;

    }    

    async login (username : string , password: string) {

        // get user from database
        const dbUser = await _UserModel.getByUsername(username);

        
        // if user is not found, return throw error
        if (dbUser == null) throw new Error("User not found");

        
        // compare passwords
        const isMatch = await comparePassword(
            password as string + env("PASS_PEPPER"),
            dbUser.password as string
        );

        // if passwords don't match, throw error
        if (!isMatch)
            throw new Error("Incorrect password");

        // generate token
        const token = this.generateToken(dbUser.id);

        dbUser.password = undefined ;
        
        // if passwords match, return user
        // delete dbUser.password;

        return { ...dbUser, token };    
    }

}