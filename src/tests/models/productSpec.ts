import { Product, ProductModel } from "../../models/product";

const _ProductModel = new ProductModel();

describe("Product Model Testing", () => {
  
  
  describe('Product Model should Have index ,show , create , getProductByCategory ', () => {
    it("Product model should have an index method", (): void => {
      expect(_ProductModel.index).toBeDefined();
    });
    it("Product model should have an create method", (): void => {
      expect(_ProductModel.create).toBeDefined();
    });
    it("Product model should have an show method", (): void => {
      expect(_ProductModel.show).toBeDefined();
    });
    it("Product model should have an getProductByCategory method", (): void => {
      expect(_ProductModel.getProductByCategory).toBeDefined();
    });
   })
  
  describe('check the truthness of the data',  () => { 
    const p   = { 
      id : "" ,   
      name: "tempProduct",
      price: 1000,
      category: "tempCategory"
  }
    it("create method should return a new product", async (): Promise<void> => {
      const product =  await _ProductModel.create({    
        name: p.name,
        price: p.price,
        category: p.category
    });
      p.id = product.id 
      p.price = product.price
      expect(p).not.toBeNull();
      expect(p).toEqual(product) ;
    });
  
   
    it("getProductsByCategory method should return a product Obj with the same category", async (): Promise<void> => {
      let isSameCategory = true ;
      const products : Product[] = await _ProductModel.getProductByCategory(p.category); 


      products.forEach( product => {
          if(product.category !== p.category) isSameCategory = false
            
      });
      expect(products).not.toBeNull();
      expect(isSameCategory).toBeTrue();
      expect(products.length).toBeGreaterThanOrEqual(1) ;

    });
    it("show method should return a product Obj", async (): Promise<void> => {
      const product : Product = await _ProductModel.show(p.id); 
      p.id = product.id as string 
      p.price = product.price
      expect(product).not.toBeNull();
      expect(product).toEqual(p) ;
    });
    it("index method should return products array ", async (): Promise<void> => {
      const products : Product[]  = await _ProductModel.index(); 
      expect(p).not.toBeNull();
      expect(products.length).toBeGreaterThanOrEqual(1) ;
    });
   })
  
});
