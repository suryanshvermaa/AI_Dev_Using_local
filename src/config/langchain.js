import {OllamaEmbeddings} from "@langchain/ollama";
import {ChatGoogleGenerativeAI} from "@langchain/google-genai";
import "dotenv/config";

export const embeddings=new OllamaEmbeddings({
    model: "nomic-embed-text",
    baseUrl: "http://localhost:11434", // Default value
})

export const llm=new ChatGoogleGenerativeAI({
    model:"gemini-2.5-flash",
    apiKey: process.env.GEMINI_API_KEY,
    temperature:1
})