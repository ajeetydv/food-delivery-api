import { connectDB } from "@/app/lib/db";
import { userSchema } from "@/app/lib/useModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  const mydata = await request.json();
  let success = false;
  await mongoose.connect(connectDB, { useNewUrlParser: true });
  const newuser = new userSchema(mydata);
  const result = await newuser.save();
  if (result) {
    success = true;
  }
  return NextResponse.json({ result, success });
}
