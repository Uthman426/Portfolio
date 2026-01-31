import mongoose from "mongoose"
const skillschema = new mongoose.Schema(
    {
        SkillEduExp: { type: String, enum: ["skills", "education","experience"], required: true },
        TheSkill:{type: String, required: true}

    },
     { timestamps: true }
);
export default mongoose.models.skills || mongoose.model('skills', skillschema)