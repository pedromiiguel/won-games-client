import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Base from 'templates/Base'
import CartList, { CardListProps } from 'components/CartList'
import { Container } from 'components/Container'
import { Divider } from 'components/Divider'
import Heading from 'components/Heading'
import { GameCardProps } from 'components/GameCard'
import { HighlightProps } from 'components/Highlight'
import PaymentForm from 'components/PaymentForm'
import Showcase from 'components/Showcase'

import * as S from './styles'
import { Session } from 'next-auth'

export type CartTemplateProps = {
  session: Session
  recommendedGames: GameCardProps[]
  recommendedHighlight: HighlightProps
  recommendedTitle: string
} & CardListProps

const stripe = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
)

const Cart = ({
  session,
  recommendedTitle,
  recommendedGames,
  recommendedHighlight
}: CartTemplateProps) => {
  return (
    <Base>
      <Container>
        <Heading lineLeft lineColor="secondary">
          My cart
        </Heading>

        <S.Content>
          <CartList />
          <Elements stripe={stripe}>
            <PaymentForm session={session} />
          </Elements>
        </S.Content>
        <Divider />
        <Showcase
          title={recommendedTitle}
          games={recommendedGames}
          highlight={recommendedHighlight}
        />
      </Container>
    </Base>
  )
}

export default Cart
