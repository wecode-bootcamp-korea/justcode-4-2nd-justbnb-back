const http = require("http");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const routes = require("./routes");
const cors = require("cors");


const prisma = new PrismaClient();
const serverPort = process.env.SERVER_PORT;
const app = express();
const server = http.createServer(app);

//app.use(cors);
app.use(express.json());
app.use(routes);

const start = async () => {
    try {
      server.listen(serverPort, () => console.log(`server is listening on PORT ${serverPort}`))
    } catch (err) { 
      console.error(err)
      await prisma.$disconnect();
    }
  }
  
  start();