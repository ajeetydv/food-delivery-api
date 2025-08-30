import { connectDB } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await mongoose.connect(connectDB, { useNewUrlParser: true });

  const data = await restaurantSchema.find();
  console.log(data);

  return NextResponse.json({ result: data });
}

export async function POST(request) {
  let mydata = await request.json();
  await mongoose.connect(connectDB, { useNewUrlParser: true });
  let finalresdata;
  let success = false

  if (mydata.login) {
    finalresdata = await restaurantSchema.findOne({
      email: mydata.email,
      password: mydata.password,
    });
    
    if(finalresdata){
        success=true
    }

  } 
  else {
    let restaurant = new restaurantSchema(mydata);
    finalresdata = await restaurant.save();
    if(finalresdata){
        success=true
    }
  }

  // console.log(mydata);
  return NextResponse.json({ result: finalresdata, success});
}
