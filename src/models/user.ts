import client from "../database";
import { hashPassword } from "../util/passwordHandler";


export type User = {
  id?: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string | undefined;
};


export class UserModel {
  
  async index(): Promise<User[]> {
    //would could go wrong ? database coneection fail
    try {
      const con = await client.connect();
      const sql = `SELECT id ,"firstName" , "lastName" , userName FROM users `;
      const result = await con.query(sql);
      con.release();
      return result.rows;
    } catch (error) {
      throw new Error(`can't retrieve users ${error}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const con = await client.connect();

      const sql = `SELECT id ,"firstName" , "lastName" , userName FROM users WHERE id=($1)` ;

      const result = await con.query(sql, [id]);

      con.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`can't retrieve user with ${id} ${error}`);
    }
}

async create(u: User) {
    try {
        const con = await client.connect();
        
        const sql =
        'INSERT INTO users ("firstName" , "lastName" ,username, password ) VALUES ($1 , $2 , $3 , $4) returning *';
        
        const passwordDigest = await hashPassword(u.password as string);
        
        const newUser = await con.query(sql, [
            u.firstName,
            u.lastName,
            u.username,
            passwordDigest,
        ]);
        
        con.release();
       
        return newUser.rows[0];
        
    } catch (error) {
        throw new Error(`can't create user : ${error}`);
    }
  }


  async getByUsername(username: string){
    try {

      
      const con = await client.connect() ; 
    
      const sql = `SELECT * FROM users WHERE username=$1`

      const user = await con.query(sql , [username] ) 
      
      con.release() ;
      return user.rows[0] ;
    } catch (error) {
      throw new Error(`User with username ${username} not found: ${error}`)
    }
  }
}
