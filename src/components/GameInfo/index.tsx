import Heading from 'components/Heading'

import Ribbon from 'components/Ribbon'

import WislistButton from 'components/WislistButton'

import * as S from './styles'
import formatPrice from 'utils/formatPrice'
import CartButton from 'components/CartButton'

export type GameInfoProps = {
  id: string
  title: string
  description: string
  price: number
}

const GameInfo = ({ id, title, description, price }: GameInfoProps) => (
  <S.Wrapper data-cy="game-info">
    <Heading lineBottom color="black">
      {title}
    </Heading>
    <Ribbon color="secondary">{formatPrice(price)}</Ribbon>
    <S.Description>{description}</S.Description>

    <S.ButtonsWrapper>
      <CartButton id={id} size="large" hasText />
      <WislistButton id={id} hasText size="large" />
    </S.ButtonsWrapper>
  </S.Wrapper>
)

export default GameInfo
