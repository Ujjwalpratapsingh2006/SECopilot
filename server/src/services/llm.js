import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import 'dotenv/config';

if (!process.env.GOOGLE_API_KEY) {
    console.error("WARNING: GOOGLE_API_KEY is missing from .env");
}

// 1. The LLM used for routing, grading, rewriting, and generating answers
export const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: process.env.GOOGLE_API_KEY,
});

// 2. The Embedding model used to turn chunks of text into math vectors (768 dimensions)
export const embeddings = new GoogleGenerativeAIEmbeddings({
    model: "text-embedding-004", // Standard Gemini embedding model
    apiKey: process.env.GOOGLE_API_KEY,
});
