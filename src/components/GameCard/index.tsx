/* eslint-disable @next/next/no-img-element */
import {
  AddShoppingCart,
  FavoriteBorder,
  Favorite
} from '@styled-icons/material-outlined'

import Button from 'components/Button'
import Ribbon from 'components/Ribbon'

import * as S from './styles'

export type GameCardProps = {
  title: string
  developer: string
  img: string
  price: string
  promotionPrice?: string
  favorite?: boolean
  onFav?: () => void
  ribbon?: string
  ribbonSize?: 'normal' | 'small'
  ribbonColor?: 'primary' | 'secondary'
}

const GameCard = ({
  title,
  developer,
  img,
  price,
  promotionPrice,
  favorite = false,
  onFav,
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
    <S.ImageBox>
      <img src={img} alt={title} />
    </S.ImageBox>
    <S.Content>
      <S.Info>
        <S.Title>{title}</S.Title>
        <S.Developer>{developer}</S.Developer>
      </S.Info>
      <S.FavButton role="button" onClick={onFav}>
        {favorite ? (
          <Favorite aria-label="Remove from wishlist" />
        ) : (
          <FavoriteBorder aria-label="Add to Wishlist" />
        )}
      </S.FavButton>
      <S.BuyBox>
        {!!promotionPrice && <S.Price isPromotional>{price}</S.Price>}
        <S.Price>{promotionPrice || price}</S.Price>
        <Button icon={<AddShoppingCart />} size="small" />
      </S.BuyBox>
    </S.Content>
  </S.Wrapper>
)

export default GameCard
