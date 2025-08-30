import { connectDB } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
    let queryParams = request.nextUrl.searchParams;
    console.log(queryParams.get(`restaurant`))
    let filter = {}
     if(queryParams.get('location')){
        let city = queryParams.get('location')
        filter={city: {$regex: new RegExp(city, 'i')}}
     }
     else if (queryParams.get(`restaurant`)){
        let restaurantName = queryParams.get('restaurant')
        filter={restaurantName: {$regex: new RegExp(restaurantName, 'i')}}
     }

    
    await mongoose.connect(connectDB, {useNewUrlParser:true})
    let result = await restaurantSchema.find(filter)
    return NextResponse.json({success:true, result})
}