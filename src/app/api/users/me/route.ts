import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request:NextRequest){

    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId}).select("-password -isAdmin");
        
        if (user.isVerified) {
            return NextResponse.json({
                mesaaage: "User found",
                data: user
            })
        }else{
            return NextResponse.json({
                mesaaage: "User not found",
            },{status:401})
        }


    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}