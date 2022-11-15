import { NextFunction, Request, Response } from "express";
import { ProductModel, Product } from "../models/product";

const Product = new ProductModel();

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    
    const products = await Product.index();
    
    res.status(200).json({
      status: "success",
      data: {
        products,
      },
    }); //end of res
  } catch (error) {
    console.log(error);
    
    res.status(404).json({
      status: "fail",
      error ,
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
    const product = await Product.show(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        product,
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
export const getProductByCategory =  async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category } = req.params;

    const products = await Product.getProductByCategory(category);
  
    res.status(200).json({
      status: "success",
      data: {
        products
      },
    }); //end of res
  } catch (error) {
    res.status(404).json({
      status: "fail",
      error,
    }); //end of res
  }

}

///////////////////////////////////////////////////////

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, price , category } = req.body;
    const productObj: Product = {
      name,
      price,
      category
    };
    const product = await Product.create(productObj);

    res.status(200).json({
      status: "success",
      data: {
        ...product,
      },
    }); //end of res
  } catch (error) {
    res.status(404).json({
      status: "fail",
      error,
    }); //end of res
  }
}; //end of function
