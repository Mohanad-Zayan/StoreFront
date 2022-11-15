import dotenv from "dotenv";
import { Pool } from "pg";
import env from "./helpers/env.helper";

dotenv.config();


// env => test 
const Client = new Pool({
  host: env("POSTGRES_HOST"),
  database:env('ENV') === "test" ? env("POSTGRES_TEST_DB") : env("POSTGRES_DB"),
  user: env("POSTGRES_USER"),
  password: env("POSTGRES_PASSWORD"),
});

export default Client;
