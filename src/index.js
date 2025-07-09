import searchQuery from "./llm/searchQuery.js";
import {llm} from "./config/langchain.js";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import promptTemplate from "./llm/promptTemplate.js"; 


(async function (){
    const chain=RunnableSequence.from([
        promptTemplate,
        llm,
        new StringOutputParser()
    ])
    const context=await searchQuery("When NITP started?");
    const result = await chain.invoke({
        context,
        question: "When NITP started?",
    });
    console.log(result)
})()