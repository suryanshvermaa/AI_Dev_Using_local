import client from "../config/vectorDb.js";
import embeddings from "./embeddings.js";

/**
 * 
 * @param {String} query query which have to search from vector database
 * @param {String} collection collection in which you want to search query
 * @returns {Array<String>} returns array of documents
 */
const searchQuery=async(query,col="local_ai_dev")=>{
    const collection=await client.getCollection({name:col});
    const documents=(await collection.query({
        nResults:4,
        queryEmbeddings:[await embeddings(query)],
        queryTexts:[query]
    })).documents;
    return documents.join("\n");
}
export default searchQuery;