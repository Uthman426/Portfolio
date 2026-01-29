import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    liveUrl: { type: String, required: true },
    repoUrl: { type: String, required: true },
    description: { type: String, required: true },

    category: { type: String, enum: ["web", "server"], required: true },
    isClient: { type: Boolean, default: false },

    images: {
      type: [String],
      validate: [(arr) => arr.length === 2, "Must be 2 images"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
