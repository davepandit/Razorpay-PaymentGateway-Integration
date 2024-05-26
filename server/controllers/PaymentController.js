import { create } from 'domain';
import { instance } from '../index.js';
import Payment from '../models/PaymentModel.js';
import crypto from 'crypto';
export const checkout = async(req , res) => {
    try {
        const options = {
            amount: Number(req.body.amount * 100),  // amount in the smallest currency unit
            currency: "INR",
          };
          const order = await instance.orders.create(options);
          console.log(order)
          //sending back the details added automatically by razorpay
          res.status(200).json(order)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

export const paymentVerification = async(req , res) => {
    try {
          const {razorpay_payment_id , razorpay_order_id , razorpay_signature } = req.body

          const body =  razorpay_order_id + "|" + razorpay_payment_id 
          
        //   matching the signature 
          const expectedSignature = crypto.createHmac('sha256' , process.env.RAZORPAY_API_SECRET).update(body.toString()).digest('hex')

          const isVerified = expectedSignature === razorpay_signature
          
          if(isVerified){
            // save to the database
            const createdDoc = await Payment.create({
              razorpay_payment_id:razorpay_payment_id,
              razorpay_order_id:razorpay_order_id,
              razorpay_signature :razorpay_signature 


            })
            console.log(createdDoc)
            res.redirect(`http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`)

          }
          else{
            res.send('error')
          }

    } catch (error) {
        res.status(400).json({error:error.message})
    }
}


