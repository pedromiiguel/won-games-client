import axios from 'axios'
import { CartItem } from 'hooks/useCart'
import { PaymentIntent } from '@stripe/stripe-js'

type PaymentIntentParams = {
  items: CartItem[]
  token: string
}

export const createPaymentIntent = async ({
  items,
  token
}: PaymentIntentParams) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/create-payment-intent`,
    { cart: items },
    { headers: { Authorization: `Bearer ${token}` } }
  )

  return await response.data
}

type CreatePaymentParams = {
  items: CartItem[]
  paymentIntent?: PaymentIntent
  token: string
}

export const createPayment = async ({
  items,
  paymentIntent,
  token
}: CreatePaymentParams) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/orders`,
    {
      cart: items,
      paymentIntentId: paymentIntent?.id,
      paymentMethod: paymentIntent?.payment_method
    },
    { headers: { Authorization: `Bearer ${token}` } }
  )

  return await response.data
}
