import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    // ==========================================
    // 1. AUTHENTICATION (Inherited from PlacePrep)
    // ==========================================
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: function() {
            return this.googleId === null;
        },
        minlength: 6,
    },
    googleId: {
        type: String,
        default: null
    },
    avatar: {
        type: String,
        default: null
    },

    // ==========================================
    // 2. SECOPILOT SPECIFIC
    // ==========================================
    
    // Link to their conversation history with the LangGraph agent
    chatSessions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChatSession"
    }],

    // Optional: API Usage Tracking (since Gemini/Tavily cost credits)
    usageStats: {
        queriesThisMonth: { type: Number, default: 0 },
        lastQueryDate: { type: Date, default: null }
    }

}, { 
    timestamps: true 
});

export default mongoose.model("User", userSchema);
