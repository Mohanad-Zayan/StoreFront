import { Order, OrderModel } from "../../models/order";
import { user } from "../routers/usersRouterSpec";

const _OrderModel = new OrderModel();

describe("first", () => {
  describe("Order Model should have create , show , showAllOrdersByUserId , showActiveOrdersByUserId , showCompletedOrdersByUserId , addProduct", () => {
    it("Order should have create", () => {
      expect(_OrderModel.create).toBeDefined();
    });
    it("Order should have show", () => {
      expect(_OrderModel.show).toBeDefined();
    });
    it("Order should have showAllOrdersByUserId", () => {
      expect(_OrderModel.showAllOrdersByUserId).toBeDefined();
    });
    it("Order should have showActiveOrdersByUserId", () => {
      expect(_OrderModel.showActiveOrdersByUserId).toBeDefined();
    });
    it("Order should have showCompletedOrdersByUserId", () => {
      expect(_OrderModel.showCompletedOrdersByUserId).toBeDefined();
    });
    it("Order should have addProduct", () => {
      expect(_OrderModel.addProduct).toBeDefined();
    });
  });

});
