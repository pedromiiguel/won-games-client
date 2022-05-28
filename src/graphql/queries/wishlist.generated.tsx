import * as Types from '../../types'

import gql from 'graphql-tag'
import { GameFragmentFragmentDoc } from '../fragments/game.generated'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type WishlistQueryVariables = Types.Exact<{
  identifier: Types.Scalars['String']
}>

export type WishlistQuery = {
  __typename?: 'Query'
  wishlists: Array<{
    __typename?: 'Wishlist'
    id: string
    games: Array<{
      __typename?: 'Game'
      id: string
      name: string
      slug: string
      price: number
      cover?: { __typename?: 'UploadFile'; url: string } | null
      developers: Array<{ __typename?: 'Developer'; name: string }>
    }>
  }>
}

export const WishlistDocument = gql`
  query Wishlist($identifier: String!) {
    wishlists(where: { user: { email: $identifier } }) {
      id
      games {
        ...GameFragment
      }
    }
  }
  ${GameFragmentFragmentDoc}
`

export function useWishlistQuery(
  options: Omit<Urql.UseQueryArgs<WishlistQueryVariables>, 'query'>
) {
  return Urql.useQuery<WishlistQuery>({ query: WishlistDocument, ...options })
}
