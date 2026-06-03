import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "@langchain/core/documents";
import mongoose from "mongoose";
import { FilingChunk } from "../models/filingChunk.model.js";
import { embeddings } from "./llm.js";

/**
 * Returns an instance of the MongoDBAtlasVectorSearch hooked up to our FilingChunk collection.
 */
function getVectorStore() {
    // We pass the raw MongoDB collection object from Mongoose to LangChain
    const collection = FilingChunk.collection;
    
    return new MongoDBAtlasVectorSearch(embeddings, {
        collection: collection,
        indexName: "vector_index", // This MUST match the name of the index you created in the Atlas UI
        textKey: "text",
        embeddingKey: "embedding",
    });
}

/**
 * Splits an HTML document into chunks and loads them into the MongoDB Vector Store.
 * @param {string} htmlContent - The raw HTML from the SEC.
 * @param {object} metadata - Information to tag each chunk with (ticker, year, etc.)
 */
export async function loadDocumentIntoVectorStore(htmlContent, metadata) {
    console.log(`Starting to split and load document for ${metadata.ticker}...`);
    
    // We split by standard HTML/Text breaks. 1000 characters is a good sweet spot for context.
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });

    // Create a single LangChain Document from the massive HTML string
    const docs = [new Document({ pageContent: htmlContent, metadata: metadata })];
    
    // Split it into hundreds/thousands of smaller chunks
    const splitDocs = await textSplitter.splitDocuments(docs);
    console.log(`Document split into ${splitDocs.length} chunks. Generating embeddings and saving to MongoDB...`);

    const vectorStore = getVectorStore();
    
    // This pushes the chunks to MongoDB. The 'embeddings' model we passed will automatically
    // calculate the vectors for each chunk before saving.
    await vectorStore.addDocuments(splitDocs);
    
    console.log(`Successfully embedded and saved ${splitDocs.length} chunks!`);
}

/**
 * Searches the vector store for chunks that semantically match the user's query.
 * @param {string} query - The user's question or the rewritten search query.
 * @param {string} ticker - The specific ticker to filter by.
 * @param {number} topK - How many chunks to retrieve (default: 4).
 */
export async function retrieveRelevantChunks(query, ticker, topK = 4) {
    console.log(`Searching vector store for: "${query}" (Ticker: ${ticker})`);
    const vectorStore = getVectorStore();
    
    // Perform the similarity search. 
    // We use the preFilter option to ensure we ONLY search chunks that belong to the correct ticker.
    const results = await vectorStore.similaritySearch(query, topK, {
        preFilter: {
            ticker: { $eq: ticker }
        }
    });

    // We extract the raw string text from the LangChain Documents to pass to the Grade node
    return results.map(doc => doc.pageContent);
}
