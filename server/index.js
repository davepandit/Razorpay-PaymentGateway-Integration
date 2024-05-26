import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import Razorpay from 'razorpay';
import paymentRouter from './routes/PaymentRoutes.js'
import { connectDB } from './config/Database.js';

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors(
  {
    origin:'http://localhost:5173'
  }

))

app.get('/' , (req ,res)=>{
    res.send('Server is up and running!')
})

// get the razorpay key in the frontend 
app.get('/api/getkey' , (req , res)=>{
  res.status(200).json({key:process.env.RAZORPAY_API_ID})
})


//connect to the database
connectDB()


export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_ID,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });


app.use('/api' ,  paymentRouter)

app.listen(process.env.PORT, ()=>{console.log(`Server is running at port ${process.env.PORT}`)})

