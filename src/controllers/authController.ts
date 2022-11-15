import { Request, RequestHandler, Response , NextFunction } from 'express';
import AuthService from '../services/auth.service';
import env from '../helpers/env.helper';
import { User } from '../models/user';
import jwt from "jsonwebtoken";


const _authService = new AuthService();

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token  = req.headers.authorization?.split(" ")[1];
     jwt.verify(token as string , env('JWT_SECRET') as string);
  
    next() ;
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
};


const registerHandler = (async (req: Request, res: Response): Promise<void> => {
    try {
        // get user from request body
        
        const {firstName,lastName,username,password} = req.body ;
        const user:User = {firstName,lastName,username,password}
        // use authService to register user
        const registeredUser = await _authService.register(user);
        // return response
        
        registeredUser.password = undefined ;
        res.status(201).json({
          status : "success" ,
          data : {
            registeredUser
          }
        });
    } catch (error: any) {
        res.status(500).json({
          status : 'fail' ,
          error : error.message
        });
    }
}) as RequestHandler

const loginHandler = (async (req: Request, res: Response): Promise<void> => {
  try {
    // get user from request body
    const {username  , password } = req.body ;
    
        
        // use authService to login user
        const loggedInUserWithToken = await _authService.login(username , password);

        // return response
        res.status(200).json({
          status : "success" , 
          data : {
            ...loggedInUserWithToken
          }
        });
    } catch (error: any) {
        res.status(500).send(error.message);
    }
}) as RequestHandler

export { registerHandler, loginHandler };