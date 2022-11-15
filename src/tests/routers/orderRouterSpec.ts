import supertest from "supertest";
import { Order, OrderModel } from "../../models/order";
import app from "../../server";
import { product } from "./productRouterSpec";
import { token, user } from "./usersRouterSpec";

const request = supertest(app);

const _OrderModel = new OrderModel();


describe("Testing Order Routes Endpoints", () => {
  const order: Order = {
    id: "",
    userId: user.id as string,
  };

  describe("Creating orders and adding products", () => {
    it(" Post /orders should Create order and return it", async () => {
      const res = await request
        .post("/orders")
        .send({
          userId: user.id,
        })
        .set("Authorization", `Bearer ${token}`)
        .set("Content-type", "application/json");

      order.id = res.body.data.id;

      expect(res.status).toBe(200);
    });
    it("Post /orders/:orderId/products", async () => {
        const res = await request
        .post(`/orders/${order.id}/products`)
        .send({
          "productId" :  product.id , 
          "quantity" : 2
        })
        .set("Authorization", `Bearer ${token}`)
        .set("Content-type", "application/json")

        expect(res.status).toBe(200);

    });
  });

  describe("Retriving orders from the database with no token attached", () => {
    it("Get /orders/user/:userId should not return anything because no token attached", async () => {
      const res = await request
        .get(`/orders/user/${user.id}`)
        .set("Content-type", "application/json");

      expect(res.status).toBe(401);
    });
    it("Get /orders/user/:userId/status/active should not return anything because no token attached", async () => {
      const res = await request
        .get(`/orders/user/${user.id}/status/active`)
        .set("Content-type", "application/json");

      expect(res.status).toBe(401);
    });

    it("Get /orders/user/:userId/status/completed should not return anything because no token attached", async () => {
      const res = await request
        .get(`/orders/user/${user.id}/status/completed`)
        .set("Content-type", "application/json");

      expect(res.status).toBe(401);
    });
  });

  beforeAll(() => {
    //mutliple order all will have the same userId
    const orders: Order[] = [
      {
        userId: user.id as string,
      },
      {
        userId: user.id as string,
        status: false,
      },
    ];
    orders.forEach((el) => _OrderModel.create(el));
  });
  describe("Retriving orders from the database with Auth token attached", () => {
    it("Get /orders/user/:userId should return all orders", async () => {
      const res = await request
        .get(`/orders/user/${user.id}`)
        .set("Authorization", `Bearer ${token}`)
        .set("Content-type", "application/json");

      expect(res.status).toBe(200);
      expect(res.body.data.orders.length).toBeGreaterThanOrEqual(1);
    });
    it("Get /orders/user/:userId/status/active should return acitve orders", async () => {
      const res = await request
        .get(`/orders/user/${user.id}/status/active`)
        .set("Authorization", `Bearer ${token}`)
        .set("Content-type", "application/json");

      expect(res.status).toBe(200);
      expect(res.body.data.orders.length).toBeGreaterThanOrEqual(1);
    });

    it("Get /orders/user/:userId/status/completed should return completed orders", async () => {
      const res = await request
        .get(`/orders/user/${user.id}/status/completed`)
        .set("Authorization", `Bearer ${token}`)
        .set("Content-type", "application/json");

      expect(res.status).toBe(200);
      expect(res.body.data.orders.length).toBeGreaterThanOrEqual(1);
    });
  });
});
