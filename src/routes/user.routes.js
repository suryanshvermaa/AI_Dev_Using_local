import {Router} from 'express';
import {signUp,login} from "../controllers/user.controller.js";
const userRouter=Router();

userRouter
.post("/signup",signUp)
.post("/login",login)

export default userRouter;