import prisma from "../../config/db.js";
import {AppError} from "../../utils/error.js";

export const addChat=async(chat)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            const {message="",type="HUMAN_MESSAGE",userId=0}=chat;
            if(!message||!type||!userId) throw new AppError("all properties are required");
            const newChat=await prisma.chat.create({
                data:{
                    message,type,userId
                }
            });
            resolve(newChat);
        } catch (error) {
            reject(error);
        }
    })
}

export const deleteChat=async(chatId)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            if(!chatId) throw new AppError("id is required");
            const newChat=await prisma.chat.delete({
                where:{
                    id:chatId
                }
            });
            resolve(true);
        } catch (error) {
            reject(false);
        }
    })
}

export const getChats=async(userId)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            if(!userId) throw new AppError("id is required");
            const chats=await prisma.chat.findMany({
                where:{
                    userId
                }
            });
            if(!chats) resolve([]);
            resolve(chats);
        } catch (error) {
            reject(error);
        }
    })
}