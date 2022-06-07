import { FormEvent, useEffect, useState } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { ErrorOutline, ShoppingCart } from '@styled-icons/material-outlined'
import { StripeCardElementChangeEvent } from '@stripe/stripe-js'
import Button from 'components/Button'
import Heading from 'components/Heading'
import { PaymentIntent } from '@stripe/stripe-js'

import * as S from './styles'
import { useCart } from 'hooks/useCart'
import { createPaymentIntent, createPayment } from 'utils/stripe/methods'
import { Session } from 'next-auth'
import { FormLoading } from 'components/Form'
import { useRouter } from 'next/router'

type PaymentFormProps = {
  session: Session
}

const PaymentForm = ({ session }: PaymentFormProps) => {
  const stripe = useStripe()
  const elements = useElements()

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState('')
  const [freeGames, setFreeGames] = useState(false)

  const { items } = useCart()
  const { push } = useRouter()

  useEffect(() => {
    async function setPaymentMode() {
      if (items.length) {
        setFreeGames(false)
        setError('')

        const data = await createPaymentIntent({
          items,
          token: session.jwt as string
        })

        if (data.freeGames) {
          setFreeGames(true)
          return
        }

        if (data.error) {
          setError(data.error)
          return
        }

        setClientSecret(data.client_secret)
      }
    }

    setPaymentMode()
  }, [items, session])

  const handleChange = async (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
  }

  const saveOrder = async (paymentIntent?: PaymentIntent) => {
    const token = session.jwt as string
    const data = await createPayment({ items, paymentIntent, token })

    return data
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)

    if (freeGames) {
      push('success')
      saveOrder()
      return
    }

    const payload = await stripe!.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements!.getElement(CardElement)!
      }
    })

    if (payload.error) {
      setError(`Payment Failed ${payload.error.message}`)
      setLoading(false)
      return
    } else {
      setError(null)
      setLoading(false)

      saveOrder(payload.paymentIntent)
      push('success')
    }
  }

  return (
    <S.Wrapper>
      <form onSubmit={handleSubmit}>
        <S.Body>
          <Heading lineBottom color="black" size="small">
            Payment
          </Heading>
          {freeGames ? (
            <S.FreeGames>Only free games, click buy and enjoy!</S.FreeGames>
          ) : (
            <>
              <CardElement
                onChange={handleChange}
                options={{
                  hidePostalCode: true,
                  style: {
                    base: { fontSize: '16px' }
                  }
                }}
              />
            </>
          )}

          {error && (
            <S.Error>
              <ErrorOutline size={20} />
              {error}
            </S.Error>
          )}
        </S.Body>
        <S.Footer>
          <Button minimal as="a" fullWidth>
            Continue Shopping
          </Button>
          <Button
            fullWidth
            icon={loading ? <FormLoading /> : <ShoppingCart />}
            disabled={!freeGames && (!!error || disabled)}
          >
            {!loading && <span> Buy now</span>}
          </Button>
        </S.Footer>
      </form>
    </S.Wrapper>
  )
}

export default PaymentForm
