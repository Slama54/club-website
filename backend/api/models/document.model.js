import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    filepdf: {
      type: String,
      required: true,
     

    },
    category: {
      type: String,
      default: 'private',
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  
  },
  { timestamps: true }
);

const Document = mongoose.model('Document', documentSchema);

export default Document;