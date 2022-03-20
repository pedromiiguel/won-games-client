import Heading from 'components/Heading'
import Button from 'components/Button'
import Ribbon from 'components/Ribbon'

import { AddShoppingCart } from '@styled-icons/material-outlined/AddShoppingCart'
import { FavoriteBorder } from '@styled-icons/material-outlined/FavoriteBorder'

import * as S from './styles'

export type GameInfoProps = {
  title: string
  description: string
  price: string
}

const GameInfo = ({ title, description, price }: GameInfoProps) => (
  <S.Wrapper>
    <Heading lineBottom color="black">
      {title}
    </Heading>
    <Ribbon color="secondary">{`$${price}`}</Ribbon>
    <S.Description>{description}</S.Description>

    <S.ButtonsWrapper>
      <Button icon={<AddShoppingCart />} size="large">
        Add to cart
      </Button>
      <Button icon={<FavoriteBorder />} minimal size="large">
        Wishlist
      </Button>
    </S.ButtonsWrapper>
  </S.Wrapper>
)

export default GameInfo
