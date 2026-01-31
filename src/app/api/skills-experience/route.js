import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import skills from "@/models/skillsupload";

export async function GET() {
  try {
    await connectDB();
    const skillInfo = await skills.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, skillInfo });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
// export async function POST(req) {
//   try {
//     await connectDB();
//     const body = await req.json();
//     // const skill = await skills.create(body);
//     // return NextResponse.json({ success: true, skill });
//      const created = await skills.create({
//       SkillEduExp: body.SkillEduExp,
//       TheSkill: body.TheSkill,
//     });
//   } catch (err) {
//     return NextResponse.json(
//       { success: false, message: err.message },
//       { status: 500 }
//     );
//   }
// }
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const created = await skills.create({
      SkillEduExp: body.SkillEduExp,
      TheSkill: body.TheSkill,
    });

    return NextResponse.json({ success: true, created }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
