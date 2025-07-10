import {Router} from 'express';
const userRouter=Router();

userRouter
.post("/signup",signUp)
.post("/login",login)

export default userRouter;