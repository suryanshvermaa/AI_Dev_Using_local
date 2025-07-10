import { Server } from "socket.io";

class SocketService{
    _io;
    constructor(){
        console.log("init socket server");
        this._io=new Server();
    }

    get io(){
        return this._io;
    }
}

export default SocketService;