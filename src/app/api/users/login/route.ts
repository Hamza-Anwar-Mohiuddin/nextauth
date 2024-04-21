import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'



connect()


export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        console.log(reqBody);

        //check if user already exists
        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error: "User doesn't exists"}, {status: 400})
        }

        if (!user.isVerified) {
            return NextResponse.json({error: "Please Verify your email"}, {status: 400})
        }

        console.log("user exist: "+ user);

        const validPassword = await bcryptjs.compare(password, user.password)

        if (!validPassword) {
            return NextResponse.json({error: "Check Your Credentials"}, {status: 400})
        }


        const tokenData = {
            id: user._id,
            email:user.email,
            username:user.username
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})


        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })

        // next me aapko direct cookies ka access mil jata hai response me
        response.cookies.set("token", token, {
            httpOnly: true, 
        })
        return response;


    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}