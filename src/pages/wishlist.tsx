import React from 'react'
import Wishlist, { WishlistTemplateProps } from 'templates/Wishlist'

import gamesMock from 'components/GameCardSlider/mock'
import { initializeApollo } from 'utils/apollo'
import { QUERY_RECOMMENDED } from 'graphql/queries/recommended'
import { gamesMapper, highlightMapper } from 'utils/mappers'
import { RecommendedQuery } from 'graphql/queries/recommended.generated'
import { GetServerSidePropsContext } from 'next'
import protectedRoutes from 'utils/protected-routes'
import {
  WishlistQuery,
  WishlistQueryVariables
} from 'graphql/queries/wishlist.generated'
import { QUERY_WISHLIST } from 'graphql/queries/wishlist'

const WishlistPage = (props: WishlistTemplateProps) => {
  return <Wishlist {...props} />
}

export default WishlistPage

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)
  const apolloClient = initializeApollo(null, session)

  if (!session) return {}

  await apolloClient.query<WishlistQuery, WishlistQueryVariables>({
    query: QUERY_WISHLIST,
    variables: { identifier: session?.user?.email as string }
  })

  const { data } = await apolloClient.query<RecommendedQuery>({
    query: QUERY_RECOMMENDED
  })

  return {
    props: {
      games: gamesMock,
      initialApolloState: apolloClient.cache.extract(),
      recommendedTitle: data.recommended?.section?.title,
      recommendedGames: gamesMapper(data.recommended?.section?.games),
      recommendedHighlight: highlightMapper(
        data.recommended?.section?.highlight
      ),
      session
    }
  }
}
