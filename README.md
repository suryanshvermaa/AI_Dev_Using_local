# AI_Dev_Using_local

A local-first AI development environment for vector embeddings, search, and LLM-based question answering, using ChromaDB, LangChain, and local/remote LLMs. This project demonstrates how to build a local vector database, embed documents, and query them using modern AI tools.

## Overview
This project enables you to:
- Ingest and split text documents into chunks
- Generate vector embeddings for text using local or remote models
- Store and search embeddings in a local ChromaDB instance
- Query the database and use an LLM to answer questions based on retrieved context

## Features
- **Local vector database** with ChromaDB
- **Embeddings** via Ollama or other LangChain-supported models
- **LLM-powered Q&A** using Google Gemini or other LLMs
- **Modular codebase** for easy extension

## Project Structure
```
├── nitp.txt                  # Example text file for ingestion
├── package.json              # Project metadata and dependencies
├── pnpm-lock.yaml            # Lockfile for reproducible installs
├── scripts/
│   └── createCollection.js   # Script to create a ChromaDB collection
├── src/
│   ├── index.js              # Main entry point: runs a sample Q&A pipeline
│   ├── config/
│   │   ├── langchain.js      # Embeddings and LLM configuration
│   │   └── vectorDb.js       # ChromaDB client setup
│   └── llm/
│       ├── embeddings.js     # Embedding function using configured model
│       ├── promptTemplate.js # Prompt template for LLM Q&A
│       ├── searchQuery.js    # Search function for vector DB
│       └── text_spitter.js   # Loads, splits, and ingests text into DB
```

## Installation
1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd AI_Dev_Using_local
   ```
2. **Install dependencies** (requires Node.js 18+ and pnpm)
   ```bash
   pnpm install
   ```
3. **Set up environment variables**
   - Create a `.env` file with your `GEMINI_API_KEY` for Google Gemini LLM access.

4. **Start ChromaDB**
   - Ensure a ChromaDB server is running locally (default: `http://localhost:8000`).

## Usage
- **Create a collection** (run once):
  ```bash
  pnpm exec node scripts/createCollection.js
  ```
- **Ingest a text file** (see `src/llm/text_spitter.js` for usage):
  ```js
  import text_splitter from './src/llm/text_spitter.js';
  await text_splitter('nitp.txt');
  ```
- **Run the main Q&A pipeline:**
  ```bash
  pnpm start
  ```
  This will search the vector DB for context and use the LLM to answer a sample question.

## Configuration
- **Models:**
  - Embeddings: Configured in `src/config/langchain.js` (default: Ollama's `nomic-embed-text`)
  - LLM: Google Gemini (requires API key)
- **Vector DB:**
  - ChromaDB client setup in `src/config/vectorDb.js`
  - Collection name: `local_ai_dev`

## File/Folder Descriptions
- `nitp.txt`: Example document for ingestion and search.
- `scripts/createCollection.js`: Script to create a new ChromaDB collection.
- `src/index.js`: Main script running a Q&A pipeline.
- `src/config/langchain.js`: Sets up embedding and LLM models.
- `src/config/vectorDb.js`: Initializes ChromaDB client.
- `src/llm/embeddings.js`: Embeds text using the configured model.
- `src/llm/promptTemplate.js`: Defines the prompt for the LLM.
- `src/llm/searchQuery.js`: Searches the vector DB for relevant documents.
- `src/llm/text_spitter.js`: Loads, splits, and ingests text into the vector DB.

## Dependencies
- `@chroma-core/default-embed`
- `@langchain/community`
- `@langchain/core`
- `@langchain/google-genai`
- `@langchain/ollama`
- `chromadb`
- `dotenv`
- `langchain`

### Dev Dependencies
- `nodemon`

See `package.json` for full details.

## License
MIT 