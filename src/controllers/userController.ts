import { NextFunction, Request, Response } from "express";
import { UserModel, User } from "../models/user";
import { OrderModel, Order } from "../models/order";
import jwt from "jsonwebtoken";

const User = new UserModel();
const Order = new OrderModel();

const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string);
};


export const getAll = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.index();

    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    }); //end of res
  } catch (error) {
    res.status(404).json({
      status: "fail",
      error,
    }); //end of res
  }
}; //end of function

///////////////////////////////////////////////////////

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.show(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    }); //end of res
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    }); //end of res
  }
}; //end of function

///////////////////////////////////////////////////////

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, firstName, lastName, password } = req.body;

    const userObj: User = {
      username,
      firstName,
      lastName,
      password,
    };

    const newUser = await User.create(userObj);

    
    
    newUser.password = undefined ;
    res.status(201).json({
      status: "success",
      data: {
        newUser
      },
    }); //end of res
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    }); //end of res
  }
}; //end of function

///////////////////////////////////////
