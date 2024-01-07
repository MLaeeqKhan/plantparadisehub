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
const controllerRouter = require("./Router/Controller");
const { Socket } = require("socket.io");
const User = require("./Models/userModel");
app.use(cors());
app.use("/", authRouter);
app.use("/", controllerRouter); 

connection().then(() => {
 const server= app.listen(PORT, () => {
    console.log(`Server is running at port No http://localhost:${PORT}`);
  });

  const io = require("socket.io")(server,{
    pingTimeout:60000,
    cors:{
      origin:"http://localhost:3000",
    }
  });
  io.on("connection",(socket)=>{
    console.log("connected to socket.io");

   
    socket.on("setup",(userData)=>{
      console.log("userData:",userData)
      if(userData && userData._id){
        socket.join(userData._id);
        console.log("userData._id:",userData._id)
        socket.emit("connected");
      }
      else {
        console.error("Invalid userData:");
      }
    });
  });

 

}).catch((err)=>{
  console.error("Error connecting to the database:", err);
});

