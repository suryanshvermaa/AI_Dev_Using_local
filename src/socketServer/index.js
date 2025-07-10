import { Server } from "socket.io";

class SocketService{
    _io;
    constructor(){
        console.log("Init Socket Server...");
        this._io=new Server();
    }

    get io(){
        return this._io;
    }
}

export default SocketService;