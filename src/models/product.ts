import client from "../database";

export type Product = {
  id?: string;
  name: string;
  price: number;
  category: string;
};

export class ProductModel {
  async index(): Promise<Product[]> {
    try {
      const con = await client.connect();
      const sql = "SELECT * FROM products";
      const result = await con.query(sql);
      con.release();
      
      return result.rows;
    } catch (error) {
      throw new Error(`can't reterieve products:${error}`);
    }
  }
  
  async show(id: string): Promise<Product> {
    try {
      const con = await client.connect();
      const sql = "SELECT * FROM products WHERE id=($1)";
      const result = await con.query(sql, [id]);
      con.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`can't reterieve product with ${id} :${error}`);
    }
  }

  async create(p: Product) {
    try {
      const con = await client.connect();
      const sql = "INSERT INTO products (name , price , category  ) VALUES ($1 , $2 , $3 ) returning *;";
      const result = await con.query(sql, [p.name, p.price , p.category ]);
      con.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`something went wrong ${error}`);
    }
  }
  
  async getProductByCategory(category: string) : Promise<Product[]> {
    try {

      
      const con =await client.connect() ;
      const sql = "SELECT * FROM products  WHERE category =($1) ";
      const result = await con.query(sql, [category]);

      con.release();
      return result.rows;
    } catch (error) {
      throw new Error(`something went wrong ${error}`);
    }
  }

}
