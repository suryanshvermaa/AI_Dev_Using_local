import express from 'express';
import 'dotenv/config';
// import router from './routes/index.routes.js';
import cors from 'cors';
import asyncHandler from "./utils/asyncHandler.js";
import response from "./utils/response.js";
import SocketService from './socketServer/index.js';
import http from "http";

const server=http.createServer();
const app=express(server);
const socketService=new SocketService();
socketService.io.attach(server,{cors:{
    origin:"*"
}});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.use('/',router);

//health route
app.get('/health',asyncHandler(async(req,res)=>{
   response(res,200,"server is healthy",{state:"healthy"});
}))

const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log('server is running on port',port);
})