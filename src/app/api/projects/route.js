import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import Project from "@/models/projectsuploads";

export async function GET() {
  await connectDB();
  const projects = await Project.find().sort({ createdAt: -1 });
  return NextResponse.json({ success: true, projects });
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();

  const project = await Project.create(body);
  return NextResponse.json({ success: true, project });
}
