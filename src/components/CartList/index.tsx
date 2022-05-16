import Button from 'components/Button'
import Empty from 'components/Empty'
import GameItem from 'components/GameItem'
import { useCart } from 'hooks/useCart'
import Link from 'next/link'
import * as S from './styles'

export type CardListProps = {
  hasButton?: boolean
}

const CartList = ({ hasButton = false }: CardListProps) => {
  const { items, total } = useCart()

  return (
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
}

export default CartList
