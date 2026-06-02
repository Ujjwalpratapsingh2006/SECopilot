import mongoose from "mongoose";

// Sub-schema for individual messages in a conversation
const messageSchema = new mongoose.Schema({
    role: { 
        type: String, 
        enum: ["user", "agent"], 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    
    // AgenticRAG Specific Metadata (Populated for 'agent' responses)
    // This allows the frontend to show badges like "Sourced from Web" or "Rewrote Query"
    agentData: {
        dataSource: { 
            type: String, 
            enum: ["vector_store", "web", "web_search_failed", null], 
            default: null 
        },
        searchQuery: { 
            type: String, 
            default: null // Useful to show the user if the AI rewrote their question
        },
        generationAttempts: { 
            type: Number, 
            default: null 
        },
        retryCount: { 
            type: Number, 
            default: null 
        },
        // We could store snippets or source links here if you want citation UI
        sources: [{ type: String }] 
    }
}, { 
    timestamps: true 
});

// Main Chat Session Schema
const chatSessionSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    title: { 
        type: String, 
        default: "New Chat" 
    },
    
    // An array of the message sub-documents
    messages: [messageSchema],

    // Lock the chat session to a specific company and a single filing.
    // Example: AAPL, 10-K, 2023
    companyTicker: { 
        type: String, 
        uppercase: true, 
        trim: true,
        required: true 
    },
    filingType: {
        type: String,
        uppercase: true,
        trim: true,
        default: "10-K"
    },
    filingYear: {
        type: Number,
        required: true
    }
}, { 
    timestamps: true 
});

export default mongoose.model("ChatSession", chatSessionSchema);
