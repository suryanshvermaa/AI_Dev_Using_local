import express from 'express';
import 'dotenv/config';
import router from './routes/index.routes.js';
import cors from 'cors';
import asyncHandler from "./utils/asyncHandler.js";
import response from "./utils/response.js";
import SocketService from './socketServer/index.js';
import http from "http";
import errorHandler from "./middlewares/error.middleware.js";

const app=express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api',router);

const server=http.createServer(app);
const socketService=new SocketService();
socketService.io.attach(server,{cors:{
    allowedHeaders:["*"],
    origin:"*"
}});
socketService.auth();
socketService.initListeners();


//health route
app.get('/health',asyncHandler(async(req,res)=>{
   response(res,200,"server is healthy",{state:"healthy"});
}))
app.use(errorHandler)

const port=process.env.PORT || 3000;
server.listen(port,()=>{
    console.log('server is running on port',port);
})