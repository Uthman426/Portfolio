import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema(
  {
    experienceStartYear: { type: Number, required: true, default: 2021 },
  },
  { timestamps: true }
);

export default mongoose.models.Settings || mongoose.model("Settings", SettingsSchema);
