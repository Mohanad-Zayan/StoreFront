import express, { Request, Response } from "express";
import bodyParser from "body-parser";
// import productsRouter from './routers/productsRouter'
import ordersRouter from "./routers/ordersRouter";
import userRouter from "./routers/userRouter";
import productsRouter from "./routers/productsRouter";

const app: express.Application = express();

app.use(bodyParser.json());

//index




app.use("/products", productsRouter);
app.use("/orders", ordersRouter);
app.use("/", userRouter);




app.listen(3000, function () {
  console.log(`starting app on localHost:3000 `);
});


export default app ;
