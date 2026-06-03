import { Annotation } from "@langchain/langgraph";

// ============================================================
// 1. DEFINE THE GRAPH STATE
// This is the "memory" that flows through every node.
// ============================================================
export const GraphState = Annotation.Root({
    // The user's original question (never modified)
    question: Annotation({
        reducer: (x, y) => y ?? x,
        default: () => "",
    }),
    // The ticker symbol we are analyzing (added for SECopilot)
    ticker: Annotation({
        reducer: (x, y) => y ?? x,
        default: () => "",
    }),
    // An optimized search query (set by the rewrite node)
    searchQuery: Annotation({
        reducer: (x, y) => y ?? x,
        default: () => "",
    }),
    // Retrieved document chunks (from vector store or web)
    documents: Annotation({
        reducer: (x, y) => y ?? x,
        default: () => [],
    }),
    // The final generated answer
    generation: Annotation({
        reducer: (x, y) => y ?? x,
        default: () => "",
    }),
    // Where the data came from: "vector_store", "web", "web_search_failed"
    dataSource: Annotation({
        reducer: (x, y) => y ?? x,
        default: () => "vector_store",
    }),
    // How many times the rewrite loop has run (cap at 1)
    retryCount: Annotation({
        reducer: (x, y) => y ?? x,
        default: () => 0,
    }),
    // How many times the generate node has run (cap at 3)
    generationAttempts: Annotation({
        reducer: (x, y) => y ?? x,
        default: () => 0,
    }),
});
