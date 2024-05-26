import React from 'react'
import { useSearchParams } from 'react-router-dom';

const PaymentSuccess = () => {
    const [search , setSearch] = useSearchParams()
    const queryParams = search.get('reference')
  return (
    <>
        <div className='flex flex-col justify-center items-center h-screen'>
            <span className='text-5xl font-bold'>Order Successfull</span>
            <span className='text-lg opacity-60'>Payment ID:{queryParams}</span>
        </div>
    </>
  )
}

export default PaymentSuccess