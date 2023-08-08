import { NextRequest, NextResponse } from "next/server";
import stripe from "@/utils/GetStripe";
import { getSession } from "@auth0/nextjs-auth0";
import { UserInterface } from "@/utils/Interfaces";

export async function POST(req: NextRequest) {
  let message = [],
    data = {},
    statusCode = 200;
  try {

     let {href}=await req.json();
     let session = await getSession();

    
    let lineItems=[{
      price:process.env.STRIPE_PRODUCT_PRICE_ID+"",
      quantity:1,
    }];

    let user:UserInterface={
      sub:""
    }
    if(session) user.sub=session.user.sub;

    let checkoutRes =await stripe.checkout.sessions.create({
      line_items:lineItems,
      mode:"payment",
      success_url: `${href}/tokens/?success=true`,
      cancel_url: `${href}/tokens/?canceled=true`,   
      payment_intent_data:{
      metadata:{
        userId:user.sub!,
        dummy:"yes"
      } 
    },
    metadata:{
      userId:user.sub!,
      dummy:"yes"
    } 
    })

    message.push("The tokes are successfully added");
    statusCode = 200;
    data={checkout:checkoutRes}
  } catch (err: any) {
    statusCode = 400;
    message.push("An error occured while adding tokens", err.message);
    console.log(err);
  } finally {
    return NextResponse.json({
      statusCode,
      message,
      data,
    });
  }
}
