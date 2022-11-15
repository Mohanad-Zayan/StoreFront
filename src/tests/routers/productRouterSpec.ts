import supertest from "supertest";
import { Product, ProductModel } from "../../models/product";
import app from "../../server";
import { token } from "./usersRouterSpec";

const request = supertest(app);

const _ProductModel = new ProductModel();

export let product : Product ;
describe("Testing Product Routes Endpoints", () => {
     product = {
        "id" : "" ,
        "name" : "TempProduct",
        "price" : 100,
        "category" : "TempCategory"
    }
    it(" Post /products should Create product and return it", async () => {
      const res = await request
        .post("/products")
        .send(product)
        .set('Authorization', `Bearer ${token}`)
        .set("Content-type", "application/json");

        product.id = res.body.data.id 
      expect(res.status).toBe(200) ;
    });
    
  it(" get /products should return all available products", async () => {
    const res = await request
      .get("/products")
      .set("Content-type", "application/json");

    expect(res.status).toBe(200) ;
    expect(res.body.data.products.length).toBeGreaterThanOrEqual(1) ;
  });

  it(" get /products/:id should return  product with this id", async () => {
    const res = await request
      .get(`/products/${product.id}`)
      .set("Content-type", "application/json");
    
    expect(res.status).toBe(200) ;
    expect(res.body.data.product).not.toBeNull() ;
  });
  it(" get /products/category/:category should return  product with this category", async () => {
    const res = await request
      .get(`/products/category/${product.category}`)
      .set("Content-type", "application/json");

    expect(res.status).toBe(200) ;
    expect(res.body.data.product).not.toBeNull() ;
  });

});
