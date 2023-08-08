import Cors from "micro-cors";
import { NextRequest, NextResponse } from "next/server";
import stripe from "@/utils/GetStripe";
import { headers } from "next/headers";
import dbConnect from "../../../../../lib/MongoConnect";
import User from "../../../../../lib/Models/User";

const cors = Cors({
  allowMethods: ["POST", "GET"],
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async (req: NextRequest) => {
  try {
    const headersList = headers();
    const sig = headersList.get("stripe-signature")!;

    let event;
    event = stripe.webhooks.constructEvent(
      await req.text(),
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    await dbConnect();

    let eventObject: {
      metadata?: {
        userId?: string;
      };
    } = event.data.object;

    const { metadata } = eventObject;

    await User.updateOne(
      {
        userId: metadata?.userId,
      },
      {
        $inc: {
          accessTokens: 10,
        },
        $set: {
          userId: metadata?.userId,
        },
      },
      {
        upsert: true,
      }
    );

    return NextResponse.json({
      status: 200,
      message: "Success",
    });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({
      status: 400,
      message: err.message,
    });
  }
};
