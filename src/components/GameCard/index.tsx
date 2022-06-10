/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import Image from 'next/image'

import Ribbon from 'components/Ribbon'
import CartButton from 'components/CartButton'

import formatPrice from 'utils/formatPrice'
import * as S from './styles'
import WislistButton from 'components/WislistButton'

export type GameCardProps = {
  id: string
  slug: string
  title: string
  developer: string
  img: string
  price: number
  promotionPrice?: number
  ribbon?: string
  ribbonSize?: 'normal' | 'small'
  ribbonColor?: 'primary' | 'secondary'
}

const GameCard = ({
  id,
  slug,
  title,
  developer,
  img,
  price,
  promotionPrice,
  ribbon,
  ribbonSize = 'small',
  ribbonColor = 'primary'
}: GameCardProps) => (
  <S.Wrapper>
    {!!ribbon && (
      <Ribbon color={ribbonColor} size={ribbonSize}>
        {ribbon}
      </Ribbon>
    )}
    <Link href={`game/${slug}`} passHref>
      <S.ImageBox>
        <Image src={img} alt={title} layout="fill" objectFit="cover" />
      </S.ImageBox>
    </Link>

    <S.Content>
      <Link href={`game/${slug}`} passHref>
        <S.Info>
          <S.Title>{title}</S.Title>
          <S.Developer>{developer}</S.Developer>
        </S.Info>
      </Link>
      <S.FavButton>
        <WislistButton id={id} />
      </S.FavButton>

      <S.BuyBox>
        {!!promotionPrice && (
          <S.Price isPromotional>{formatPrice(price)}</S.Price>
        )}
        <S.Price>{formatPrice(promotionPrice || price)}</S.Price>
        <CartButton id={id} />
      </S.BuyBox>
    </S.Content>
  </S.Wrapper>
)

export default GameCard
