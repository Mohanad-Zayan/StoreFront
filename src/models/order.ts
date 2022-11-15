import client from "../database";

export type Order = {
  id?: string;
  userId: string;
  status?: boolean;
};

export class OrderModel {
  async create(o: Order) {
    try {
      const con = await client.connect();
      let sql;
      let result;
      if (o.status === undefined) {
        sql =
          "INSERT INTO orders (user_id, status) VALUES($1 , true ) returning *;";
        result = await con.query(sql, [o.userId]);
      } else {
        
        sql =
          "INSERT INTO orders (user_id, status) VALUES($1 , $2 ) returning *;";
        result = await con.query(sql, [o.userId, o.status]);
      }

      con.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`could not create order ${o} : ${error}`);
    }
  }

  ////////////////////////////////////////////////////////

  async show(id: string): Promise<Order> {
    const con = await client.connect();
    const sql = "SELECT * FROM orders WHERE id=($1)";
    const order = await con.query(sql, [id]);
    con.release();
    return order.rows[0];
  }

  ////////////////////////////////////////////////////////

  async showAllOrdersByUserId(id: string): Promise<Order[]> {
    try {
      const con = await client.connect();
      const sql = "SELECT * FROM orders WHERE user_id=($1)";
      const orders = await con.query(sql, [id]);
      con.release();

      return orders.rows;
    } catch (error) {
      throw new Error(`could not show order with  ${id}: ${error}`);
    }
  }

  ////////////////////////////////////////////////////////

  async showActiveOrdersByUserId(user_id: number): Promise<Order[]> {
    try {
      const connection = await client.connect();
      const sql = `SELECT * FROM orders WHERE user_id =$1 AND status = true ;`;
      const result = await connection.query(sql, [user_id]);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error("somethin went wrong. " + err);
    }
  }

  ////////////////////////////////////////////////////////

  async showCompletedOrdersByUserId(user_id: number): Promise<Order[]> {
    try {
      const connection = await client.connect();
      const sql = `SELECT * FROM orders WHERE user_id =$1 AND status =false;`;
      const result = await connection.query(sql, [user_id]);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error("somethin went wrong. " + err);
    }
  }

  ////////////////////////////////////////////////////////
  // add product to order
  async addProduct(quantity: number, orderId: string, productId: string) {
    try {
      const con = await client.connect();

      const sql =
        "INSERT INTO orders_products (quantity , order_id , product_id ) VALUES($1 , $2 , $3) returning *;";

      const result = await con.query(sql, [quantity, orderId, productId]);
      con.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `coudld not add prodiuct with id ${productId} to order woth id ${orderId}: ${error}`
      );
    }
  }
}
