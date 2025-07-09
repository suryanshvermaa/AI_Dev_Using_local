import { ChatPromptTemplate } from "@langchain/core/prompts";

const promptTemplate = ChatPromptTemplate.fromTemplate(`
    You are an expert science tutor. Based on the following context, answer the question.
    
    Context:
    {context}
    
    Question:
    {question}
`);

export default promptTemplate;