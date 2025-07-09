import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import path from "path";
import {Chroma} from "@langchain/community/vectorstores/chroma"
import { embeddings } from "../config/langchain.js";

/**
 * 
 * @description takes location of file and converts it into chunks and then return
 * @param {String} loc 
 */
const text_splitter=async(loc)=>{
    const textSplitter=new RecursiveCharacterTextSplitter({
        chunkSize: 200,
        chunkOverlap: 30
    })
    const loader = new TextLoader(path.resolve(loc));
    const docs = await loader.load();
    const splits=await textSplitter.splitDocuments(docs);
    const vectorStore = await Chroma.fromDocuments(splits, embeddings, {
        collectionName: "local_ai_dev",
        url: "http://localhost:8000",
    });
    return vectorStore;
}

export default text_splitter;