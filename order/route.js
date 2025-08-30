import { connectDB} from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import { orderSchema } from "@/app/lib/orderModel";
import { restaurantSchema } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";

import { NextResponse } from "next/server";


export async function POST(request) {
    const payload = await request.json();
    await mongoose.connect(connectDB, { useNewUrlParser: true });
    let success = false;
    const orderObj = new orderSchema(payload);
    const result = await orderObj.save();
    if (result) {
        success = true
    }
    return NextResponse.json({ result, success })
}


export async function GET(request) {
    const userId = request.nextUrl.searchParams.get('id');
    let success = false
    await mongoose.connect(connectDB, { useNewUrlParser: true })
    let result = await orderSchema.find({ user_id: userId });
    
    if (result) {
        let restoData = await Promise.all(
            result.map(async (item) => {
                let restoInfo = {};
                let festInfo = {};
                restoInfo.data = await restaurantSchema.findOne({ _id: item.resto_id })
                festInfo.datanxt = await foodSchema.findOne({foodName:item._id})
                restoInfo.amount = item.amount;
                restoInfo.foodname = item.foodName;
                restoInfo.status = item.status;
                return restoInfo;
            })
        )
        result = restoData;
        success = true
    }

    return NextResponse.json({ result,success })

}