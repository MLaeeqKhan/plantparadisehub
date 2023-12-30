//server.js file

const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT;
const connection = require("../backend/DB/conn");
const cors = require("cors");

console.log("hello from  server.js");
const authRouter = require("./Router/auth");
const controllerRouter = require("./Router/Controller")
app.use(cors());
app.use("/", authRouter);
app.use("/", controllerRouter); 

connection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at port No http://localhost:${PORT}`);
  });
}).catch((err)=>{
    console.log(err);
})
