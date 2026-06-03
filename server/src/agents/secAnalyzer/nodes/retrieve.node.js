import { retrieveRelevantChunks } from "../../../services/vectorStore.js";

// ============================================================
// NODE 2: RETRIEVE
// Fetches relevant document chunks from the vector store.
// Uses searchQuery if available (from a rewrite), otherwise
// falls back to the original question.
// ============================================================
export async function retrieveNode(state) {
    console.log("--- RETRIEVE NODE ---");
    // Use the optimized searchQuery if it exists, otherwise use the original question
    const queryToSearch = state.searchQuery || state.question;
    const ticker = state.ticker;

    // Retrieve documents filtering specifically by this company's ticker
    const documents = await retrieveRelevantChunks(queryToSearch, ticker, 4);

    return { documents: documents };
}
