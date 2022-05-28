import { WishlistQuery, WishlistQueryVariables } from './wishlist.generated'
import { gql, QueryHookOptions, useQuery } from '@apollo/client'
import { GameFragment } from 'graphql/fragments/game'

export const QUERY_WISHLIST = gql`
  query Wishlist($identifier: String!) {
    wishlists(where: { user: { email: $identifier } }) {
      id
      games {
        ...GameFragment
      }
    }
  }
  ${GameFragment}
`
export function useQueryWishlist(
  options?: QueryHookOptions<WishlistQuery, WishlistQueryVariables>
) {
  return useQuery<WishlistQuery, WishlistQueryVariables>(
    QUERY_WISHLIST,
    options
  )
}
