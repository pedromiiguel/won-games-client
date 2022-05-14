import * as Types from '../../types'

import gql from 'graphql-tag'
import { BannerFragmentFragmentDoc } from '../fragments/banner.generated'
import { GameFragmentFragmentDoc } from '../fragments/game.generated'
import { HighlightFragmentFragmentDoc } from '../fragments/highlight.generated'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type HomeQueryVariables = Types.Exact<{
  date: Types.Scalars['Date']
}>

export type HomeQuery = {
  __typename?: 'Query'
  banners: Array<{
    __typename?: 'Banner'
    title: string
    subtitle: string
    image?: { __typename?: 'UploadFile'; url: string } | null
    button?: {
      __typename?: 'ComponentPageButton'
      label: string
      link: string
    } | null
    ribbon?: {
      __typename?: 'ComponentPageRibbon'
      text?: string | null
      color?: Types.Enum_Componentpageribbon_Color | null
      size?: Types.Enum_Componentpageribbon_Size | null
    } | null
  }>
  newGames: Array<{
    __typename?: 'Game'
    id: string
    name: string
    slug: string
    price: number
    cover?: { __typename?: 'UploadFile'; url: string } | null
    developers: Array<{ __typename?: 'Developer'; name: string }>
  }>
  upcommingGames: Array<{
    __typename?: 'Game'
    id: string
    name: string
    slug: string
    price: number
    cover?: { __typename?: 'UploadFile'; url: string } | null
    developers: Array<{ __typename?: 'Developer'; name: string }>
  }>
  freeGames: Array<{
    __typename?: 'Game'
    id: string
    name: string
    slug: string
    price: number
    cover?: { __typename?: 'UploadFile'; url: string } | null
    developers: Array<{ __typename?: 'Developer'; name: string }>
  }>
  sections?: {
    __typename?: 'Home'
    newGames?: {
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
    popularGames?: {
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
        id: string
        name: string
        slug: string
        price: number
        cover?: { __typename?: 'UploadFile'; url: string } | null
        developers: Array<{ __typename?: 'Developer'; name: string }>
      }>
    } | null
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
    freeGames?: {
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

export const HomeDocument = gql`
  query Home($date: Date!) {
    banners {
      ...BannerFragment
    }
    newGames: games(
      where: { release_date_lte: $date }
      sort: "release_date:desc"
      limit: 8
    ) {
      ...GameFragment
    }
    upcommingGames: games(
      where: { release_date_gt: $date }
      sort: "release_date:asc"
      limit: 8
    ) {
      ...GameFragment
    }
    freeGames: games(where: { price: 0 }, sort: "release_date:desc", limit: 8) {
      ...GameFragment
    }
    sections: home {
      newGames {
        title
        highlight {
          ...HighlightFragment
        }
      }
      popularGames {
        title
        highlight {
          ...HighlightFragment
        }
        games(limit: 8) {
          ...GameFragment
        }
      }
      upcomingGames {
        title
        highlight {
          ...HighlightFragment
        }
      }
      freeGames {
        title
        highlight {
          ...HighlightFragment
        }
      }
    }
  }
  ${BannerFragmentFragmentDoc}
  ${GameFragmentFragmentDoc}
  ${HighlightFragmentFragmentDoc}
`

export function useHomeQuery(
  options: Omit<Urql.UseQueryArgs<HomeQueryVariables>, 'query'>
) {
  return Urql.useQuery<HomeQuery>({ query: HomeDocument, ...options })
}
