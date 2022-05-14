import React from 'react'
import Cart, { CartTemplateProps } from 'templates/Cart'

import itemsMock from 'components/CartList/mock'
import cardsMock from 'components/PaymentOptions/mock'

import { initializeApollo } from 'utils/apollo'
import { RecommendedQuery } from 'graphql/queries/recommended.generated'
import { QUERY_RECOMMENDED } from 'graphql/queries/recommended'
import { gamesMapper, highlightMapper } from 'utils/mappers'

const CartPage = (props: CartTemplateProps) => {
  return <Cart {...props} />
}

export default CartPage

export async function getServerSideProps() {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query<RecommendedQuery>({
    query: QUERY_RECOMMENDED
  })

  return {
    props: {
      cards: cardsMock,
      items: itemsMock,
      total: 'R$ 430,00',
      recommendedTitle: data.recommended?.section?.title,
      recommendedGames: gamesMapper(data.recommended?.section?.games),
      recommendedHighlight: highlightMapper(
        data.recommended?.section?.highlight
      )
    }
  }
}
