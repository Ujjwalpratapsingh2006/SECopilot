import mongoose from 'mongoose';

const filingChunkSchema = new mongoose.Schema({
  // The actual text content of this chunk
  text: {
    type: String,
    required: true,
  },
  // The mathematical vector representing the semantic meaning of the text
  embedding: {
    type: [Number], // An array of numbers
    required: true,
  },
  // Metadata for filtering
  ticker: {
    type: String,
    required: true,
    index: true, // We index this so we can quickly filter chunks by company
  },
  formType: {
    type: String,
    required: true,
  },
  accessionNumber: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export const FilingChunk = mongoose.model('FilingChunk', filingChunkSchema);
