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
            name,email,password:pass,
        },
    })
    const token=await createToken({userId:user.id,email:user.email},60*24);
    response(res,201,"user signup successful",{token,user:{id:user.id,name:user.name,email:user.email}});
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
    const isPasswordMatched=await bcrypt.compare(password,isExisting.password);
    if(!isPasswordMatched) throw new AppError("Password is incorrect",401);
    const token=await createToken({userId:isExisting.id,email:isExisting.email},60*24);
    response(res,200,"login sucessful",{token,user:{name:isExisting.name,email:isExisting.email}});
})
