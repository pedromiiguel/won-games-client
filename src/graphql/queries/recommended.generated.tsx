import * as Types from '../../types'

import gql from 'graphql-tag'
import { HighlightFragmentFragmentDoc } from '../fragments/highlight.generated'
import { GameFragmentFragmentDoc } from '../fragments/game.generated'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type RecommendedQueryVariables = Types.Exact<{ [key: string]: never }>

export type RecommendedQuery = {
  __typename?: 'Query'
  recommended?: {
    __typename?: 'Recommended'
    section?: {
      __typename?: 'ComponentPagePopularGames'
      title: string
      highlight?: {
        __typename?: 'ComponentPageHighlight'
        title: string
        subtitle: string
        buttonLabel: string
        buttonLink: string
        alignment?: Types.Enum_Componentpagehighlight_Alignment | null
        background?: { __typename?: 'UploadFile'; url: string } | null
        floatImage?: { __typename?: 'UploadFile'; url: string } | null
      } | null
      games: Array<{
        __typename?: 'Game'
        name: string
        slug: string
        price: number
        cover?: { __typename?: 'UploadFile'; url: string } | null
        developers: Array<{ __typename?: 'Developer'; name: string }>
      }>
    } | null
  } | null
}

export const RecommendedDocument = gql`
  query Recommended {
    recommended {
      section {
        title
        highlight {
          ...HighlightFragment
        }
        games {
          ...GameFragment
        }
      }
    }
  }
  ${HighlightFragmentFragmentDoc}
  ${GameFragmentFragmentDoc}
`

export function useRecommendedQuery(
  options?: Omit<Urql.UseQueryArgs<RecommendedQueryVariables>, 'query'>
) {
  return Urql.useQuery<RecommendedQuery>({
    query: RecommendedDocument,
    ...options
  })
}
