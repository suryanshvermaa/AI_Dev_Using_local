import "dotenv/config";
import bcrypt from "bcryptjs";
import asyncHander from "../utils/asyncHandler.js"
import prisma from "../config/db.js";
import {createToken} from "../middlewares/auth.middleware.js";
import response from "../utils/response.js";
import { AppError } from "../utils/error.js";

/**
 * 
 * @description Sign up a new user
 * @route POST /user/signup
 * @access Private
 * @param {import("express").Request} req 
 * @param {import("express").Response} res  
 */
export const signUp=asyncHander(async(req,res)=>{
    const {name="",email="",password=""}=req.body;
    if(!name || !email ||!password) throw new AppError("these fields cannot be empty",400);
    const isExisting=await prisma.user.findUnique({
        where:{
            email
        }
    });
    if(isExisting) throw new AppError("email already in use",400);
    const pass=await bcrypt.hash(password,10);
    const user=await prisma.user.create({
        data:{
            name,email,password:pass
        },
        select:{
            password:false
        }
    })
    const token=createToken({userId:user.id,email:user.email});
    response(res,201,"user signup successful",{token,user});
}
);

/**
 * 
 * @description Login a user
 * @route POST /user/login
 * @access Private
 * @param {import("express").Request} req 
 * @param {import("express").Response} res  
 */
export const login=asyncHander(async(req,res)=>{
    const {email,password}=req.body
    if(!email ||!password) throw new AppError("these fields cannot be empty",400);
    const isExisting=await prisma.user.findUnique({
        where:{
            email
        }
    });
    if(!isExisting) throw new AppError("email not registered",400);
    const isPasswordMatched=await bcrypt.compare(isExisting.password,password);
    if(!isPasswordMatched) throw new AppError("Password is incorrect",401);
    const token=createToken({userId:isExisting.id,email:isExisting.email});
    response(res,200,"login sucessful",{token,user:{name:isExisting.name,email:isExisting.email}});
})
