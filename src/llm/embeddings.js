import {embeddings as embs} from "../config/langchain.js";

const embeddings=async(text)=>{
    return await embs.embedQuery(text);
}

export default embeddings;