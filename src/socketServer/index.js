import { Server } from "socket.io";
import {verifyToken} from "../middlewares/auth.middleware.js";
import { AppError } from "../utils/error.js";

class SocketService{
    _io;
    constructor(){
        console.log("Init Socket Server...");
        this._io=new Server();
    }

    get io(){
        return this._io;
    }

    auth(){
        const io=this._io;
        io.use(async(socket,next)=>{
            try {
                const token=socket.handshake.headers.authorization.split(" ")[1];
                const isVerified=await verifyToken(token);
                if(!isVerified) throw new AppError("Unauthorised",401);
                socket.userId=isVerified.userId;
                next();
            } catch (error) {
               next(new AppError("Unauthorised",401)); 
            }
        })
    }
    initListeners(){
        const io=this._io;
        io.on("connect",(socket)=>{
            console.log("New socket connected",socket.id);

            socket.on("event:message",async(message)=>{
                console.log("New message recieved:",message);
            })

            socket.on("disconnect",()=>{
                console.log("Socket server disconnected",socket.id)
            })
        });
    }
}

export default SocketService;