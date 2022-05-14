/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Types from '../../types'

import gql from 'graphql-tag'
import { GameFragmentFragmentDoc } from '../fragments/game.generated'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type GamesQueryVariables = Types.Exact<{
  limit: Types.Scalars['Int']
  start?: Types.InputMaybe<Types.Scalars['Int']>
  where?: Types.InputMaybe<Types.Scalars['JSON']>
  sort?: Types.InputMaybe<Types.Scalars['String']>
}>

export type GamesQuery = {
  __typename?: 'Query'
  games: Array<{
    __typename?: 'Game'
    name: string
    slug: string
    price: number
    cover?: { __typename?: 'UploadFile'; url: string } | null
    developers: Array<{ __typename?: 'Developer'; name: string }>
  }>
  gamesConnection?: {
    __typename?: 'GameConnection'
    values?: Array<{ __typename?: 'Game'; id: string } | null> | null
  } | null
}

export type GameBySlugQueryVariables = Types.Exact<{
  slug: Types.Scalars['String']
}>

export type GameBySlugQuery = {
  __typename?: 'Query'
  games: Array<{
    __typename?: 'Game'
    name: string
    short_description: string
    description: string
    price: number
    rating: Types.Enum_Game_Rating
    release_date?: any | null
    gallery: Array<{
      __typename?: 'UploadFile'
      src: string
      label?: string | null
    }>
    cover?: { __typename?: 'UploadFile'; src: string } | null
    developers: Array<{ __typename?: 'Developer'; name: string }>
    publisher?: { __typename?: 'Publisher'; name: string } | null
    categories: Array<{ __typename?: 'Category'; name: string }>
    platforms: Array<{ __typename?: 'Platform'; name: string }>
  }>
}

export const GamesDocument = gql`
  query Games($limit: Int!, $start: Int, $where: JSON, $sort: String) {
    games(limit: $limit, start: $start, where: $where, sort: $sort) {
      ...GameFragment
    }
    gamesConnection(where: $where) {
      values {
        id
      }
    }
  }
  ${GameFragmentFragmentDoc}
`

export function useGamesQuery(
  options: Omit<Urql.UseQueryArgs<GamesQueryVariables>, 'query'>
) {
  return Urql.useQuery<GamesQuery>({ query: GamesDocument, ...options })
}
export const GameBySlugDocument = gql`
  query GameBySlug($slug: String!) {
    games(where: { slug: $slug }) {
      name
      short_description
      description
      price
      rating
      release_date
      gallery {
        src: url
        label: alternativeText
      }
      cover {
        src: url
      }
      developers {
        name
      }
      publisher {
        name
      }
      categories {
        name
      }
      platforms {
        name
      }
    }
  }
`

export function useGameBySlugQuery(
  options: Omit<Urql.UseQueryArgs<GameBySlugQueryVariables>, 'query'>
) {
  return Urql.useQuery<GameBySlugQuery>({
    query: GameBySlugDocument,
    ...options
  })
}
