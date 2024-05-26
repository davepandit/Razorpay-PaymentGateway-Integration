import { useState } from 'react'
import { Routes , Route } from 'react-router-dom'
import Home from './pages/Home'
import PaymentSuccess from './pages/PaymentSuccess'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/paymentsuccess' element={<PaymentSuccess />} />
     </Routes>
    </>
  )
}

export default App
