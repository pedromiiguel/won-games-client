import * as Types from '../../types'

import gql from 'graphql-tag'
import { GameFragmentFragmentDoc } from '../fragments/game.generated'
import { HighlightFragmentFragmentDoc } from '../fragments/highlight.generated'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type UpcomingQueryVariables = Types.Exact<{
  date: Types.Scalars['Date']
}>

export type UpcomingQuery = {
  __typename?: 'Query'
  upcommingGames: Array<{
    __typename?: 'Game'
    id: string
    name: string
    slug: string
    price: number
    cover?: { __typename?: 'UploadFile'; url: string } | null
    developers: Array<{ __typename?: 'Developer'; name: string }>
  }>
  showcase?: {
    __typename?: 'Home'
    upcomingGames?: {
      __typename?: 'ComponentPageSection'
      title?: string | null
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
    } | null
  } | null
}

export const UpcomingDocument = gql`
  query Upcoming($date: Date!) {
    upcommingGames: games(
      where: { release_date_gt: $date }
      sort: "release_date:asc"
      limit: 8
    ) {
      ...GameFragment
    }
    showcase: home {
      upcomingGames {
        title
        highlight {
          ...HighlightFragment
        }
      }
    }
  }
  ${GameFragmentFragmentDoc}
  ${HighlightFragmentFragmentDoc}
`

export function useUpcomingQuery(
  options: Omit<Urql.UseQueryArgs<UpcomingQueryVariables>, 'query'>
) {
  return Urql.useQuery<UpcomingQuery>({ query: UpcomingDocument, ...options })
}
