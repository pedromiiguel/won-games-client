import Button from 'components/Button'
import Empty from 'components/Empty'
import GameItem, { GameItemProps } from 'components/GameItem'
import Link from 'next/link'
import * as S from './styles'

export type CardListProps = {
  items?: GameItemProps[]
  total?: string
  hasButton?: boolean
}

const CartList = ({ items = [], total, hasButton = false }: CardListProps) => (
  <S.Wrapper isEmpty={!items.length}>
    {items.length ? (
      <>
        {items.map((item) => (
          <GameItem {...item} key={item.title} />
        ))}
        <S.Footer>
          {!hasButton && <span> Total </span>}
          <S.Total>{total}</S.Total>
          {hasButton && (
            <Link href="/cart" passHref>
              <Button as="a">But it now</Button>
            </Link>
          )}
        </S.Footer>
      </>
    ) : (
      <>
        <Empty
          title="Your cart is empty"
          description="Go back to the store and explore great games and offers."
          hasLink
        />
      </>
    )}
  </S.Wrapper>
)

export default CartList
