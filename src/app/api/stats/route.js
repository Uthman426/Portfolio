import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import Projects from "@/models/projectsuploads";
import Settings from "@/models/yearsofexperience";

export async function GET() {
  await connectDB();

  const totalProjects = await Project.countDocuments();
  const totalClients = await Project.countDocuments({ isClient: true });

  let settings = await Settings.findOne();
  if (!settings) settings = await Settings.create({ experienceStartYear: 2024 });

  const currentYear = new Date().getFullYear();
  const years = Math.max(0, currentYear - settings.experienceStartYear);

  return NextResponse.json({ success: true, totalProjects, totalClients, years });
}
