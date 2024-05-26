import React, { useState } from 'react'
import AreaCard from '../card/AreaCard'
import axios from 'axios'

const Home = () => {
    const [amount , setAmount] = useState(1000)
    const checkoutHandler = async(amount) => {
        const {key} = await axios.get('http://localhost:4000/api/getkey')
        const {data} = await axios.post('http://localhost:4000/api/checkout' , {
            amount
        })
        console.log('data from axios:' , data)
        console.log('amount:' , data.amount)
        const options = {
            key: key,
            amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Dave pandit",
            description: "Test Transaction",
            image: "https://avatars.githubusercontent.com/u/145253619?v=4",
            order_id: data.id, 
            callback_url: "http://localhost:4000/api/paymentverification",
            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9000090000"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#3399cc"
            }
        };
        const razor = new window.Razorpay(options);
            razor.open();
            
        
    }
  return (
    <>
        <div className='mt-11 flex gap-6 items-center justify-center'>
            <AreaCard amount={amount} checkoutHandler={checkoutHandler}/>
            <AreaCard amount={amount} checkoutHandler={checkoutHandler}/>
            <AreaCard amount={amount} checkoutHandler={checkoutHandler}/>
        </div>
    </>
  )
}

export default Home