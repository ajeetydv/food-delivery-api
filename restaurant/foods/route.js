import { connectDB } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";



export async function POST(request) {
     let mydata = await request.json();
     let success = false
      await mongoose.connect(connectDB, { useNewUrlParser: true });
      const foodinfos = new foodSchema(mydata);
      const finalresdata = await foodinfos.save();
      if(finalresdata){
            success=true
      }
      return NextResponse.json({ finalresdata, success});
}