import dbConnect from "../../../../lib/MongoConnect";
import User from "../../../../lib/Models/User";
import { getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  let statusCode = 400,
    message: string[] = [],
    data = {};
  try {
    await dbConnect();
    let session = await getSession();
    let user = await User.findOne({
      userId: session?.user?.sub,
    });
    if (user) {
        console.log(user);
      statusCode = 200;
      message = ["The user is already registered in our database"];
      return;
    }

    await User.create({
      userId: session?.user?.sub,
      accessTokens: 0,
    });
  } catch (err: any) {
    message.push("The error occurred: " + err.message);
    statusCode = 400;
  } finally {
    return NextResponse.json({
      statusCode,
      data,
      message,
    });
  }
};
