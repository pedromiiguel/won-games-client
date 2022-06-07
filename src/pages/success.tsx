import React from 'react'
import Success, { SuccessTemplateProps } from 'templates/Success'
import { initializeApollo } from 'utils/apollo'
import { RecommendedQuery } from 'graphql/queries/recommended.generated'
import { QUERY_RECOMMENDED } from 'graphql/queries/recommended'
import { gamesMapper, highlightMapper } from 'utils/mappers'

const PageSuccess = (props: SuccessTemplateProps) => {
  return <Success {...props} />
}

export default PageSuccess

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query<RecommendedQuery>({
    query: QUERY_RECOMMENDED
  })

  return {
    revalidate: 60 * 60,
    props: {
      recommendedTitle: data.recommended?.section?.title,
      recommendedGames: gamesMapper(data.recommended?.section?.games),
      recommendedHighlight: highlightMapper(
        data.recommended?.section?.highlight
      )
    }
  }
}
