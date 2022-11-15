import { NextFunction, Request, Response } from "express";
import { OrderModel, Order } from "../models/order";

const Order = new OrderModel();

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await Order.show(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        ...order,
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

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    
    const { userId } = req.body ;

    const orderProj: Order = {
      userId
    };

    const order = await Order.create(orderProj);
    

    res.status(200).json({
      status: "success",
      data: {
        ...order,
      },
    }); //end of res
  } catch (error) {
    console.log(error)
    res.status(404).json({
      status: "fail",
      error,
    }); //end of res
  }
}; //end of function

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { quantity, productId } = req.body;
    const orderId = req.params.orderId;

    const addedProduct = await Order.addProduct(
      parseInt(quantity),
      orderId,
      productId
    );

    res.status(200).json({
      status: "success",
      data: {
        addedProduct,
      },
    }); //end of res
  } catch (error) {

    
    res.status(400).json({
      status: "fail",
      error,
    }); //end of res
  }
}; //end of function
export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    
    const orders = await Order.showAllOrdersByUserId(req.params.userid);
    
    res.status(200).json({
      status: "success",
      data: {
        orders,
      },
    }); //end of res
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    }); //end of res
  }
}; //end of function

export const getOrdersWithStatusCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status } = req.params;
    let orders;
    if (status === "active") {
      orders = await Order.showActiveOrdersByUserId(parseInt(req.params.userid));
    } else {
      orders = await Order.showCompletedOrdersByUserId(parseInt(req.params.userid));
    }
    res.status(200).json({
      status: "sucess",
      data: {
        orders,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

// export const getActiveOrders = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const orders = await Order.showActiveOrdersByUserId(
//       parseInt(req.params.id)
//     );

//     res.status(200).json({
//       status: "success",
//       data: {
//         orders,
//       },
//     }); //end of res
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       error,
//     }); //end of res
//   }
// }; //end of function
// export const getCompletedOreders = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const orders = await Order.showCompletedOrdersByUserId(
//       parseInt(req.params.id)
//     );

//     res.status(200).json({
//       status: "success",
//       data: {
//         orders,
//       },
//     }); //end of res
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       error,
//     }); //end of res
//   }
// }; //end of function
