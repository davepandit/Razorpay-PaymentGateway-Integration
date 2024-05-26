import express from 'express'
import { checkout } from '../controllers/PaymentController.js'
import { paymentVerification} from '../controllers/PaymentController.js'

const router = express.Router()

router.post('/checkout' , checkout)
router.post('/paymentverification' , paymentVerification)

export default router