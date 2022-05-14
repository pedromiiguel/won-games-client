import React from 'react'
import Wishlist, { WishlistTemplateProps } from 'templates/Wishlist'

import gamesMock from 'components/GameCardSlider/mock'
import { initializeApollo } from 'utils/apollo'
import { QUERY_RECOMMENDED } from 'graphql/queries/recommended'
import { gamesMapper, highlightMapper } from 'utils/mappers'
import { RecommendedQuery } from 'graphql/queries/recommended.generated'

const WishlistPage = (props: WishlistTemplateProps) => {
  return <Wishlist {...props} />
}

export default WishlistPage

export async function getServerSideProps() {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query<RecommendedQuery>({
    query: QUERY_RECOMMENDED
  })

  return {
    props: {
      games: gamesMock,
      recommendedTitle: data.recommended?.section?.title,
      recommendedGames: gamesMapper(data.recommended?.section?.games),
      recommendedHighlight: highlightMapper(
        data.recommended?.section?.highlight
      )
    }
  }
}
