import mongoose from 'mongoose';

const layoutConfigSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxLength: [20, 'title cannot be more than 20 characters'],
    },
    content: {
      type: String,
      maxLength: [250, 'content cannot be more than 250 characters'],
    },
    footer: {
      type: String,
      maxLength: [20, 'footer cannot be more than 20 characters'],
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('layoutConfig', layoutConfigSchema);
