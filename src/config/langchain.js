import {OllamaEmbeddings} from "@langchain/ollama";
import {ChatGoogleGenerativeAI} from "@langchain/google-genai";

export const embeddings=new OllamaEmbeddings({
    model: "nomic-embed-text",
    baseUrl: "http://localhost:11434", // Default value
})

export const llm=new ChatGoogleGenerativeAI({
    model:""
})