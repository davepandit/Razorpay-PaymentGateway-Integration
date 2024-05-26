import mongoose from 'mongoose'

export const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect('mongodb://127.0.0.1:27017/razorpay-payment-gateway');

        console.log(`Database connected ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log('Error in connecting the database:', error.message)
    }
}