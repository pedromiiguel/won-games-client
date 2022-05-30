import * as Types from '../../types'

import gql from 'graphql-tag'
import { GameFragmentFragmentDoc } from '../fragments/game.generated'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CreateWishlistMutationVariables = Types.Exact<{
  input: Types.CreateWishlistInput
}>

export type CreateWishlistMutation = {
  __typename?: 'Mutation'
  createWishlist?: {
    __typename?: 'createWishlistPayload'
    wishlist?: {
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
    } | null
  } | null
}

export type UpdateWishlistMutationVariables = Types.Exact<{
  input: Types.UpdateWishlistInput
}>

export type UpdateWishlistMutation = {
  __typename?: 'Mutation'
  updateWishlist?: {
    __typename?: 'updateWishlistPayload'
    wishlist?: {
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
    } | null
  } | null
}

export const CreateWishlistDocument = gql`
  mutation CreateWishlist($input: createWishlistInput!) {
    createWishlist(input: $input) {
      wishlist {
        id
        games {
          ...GameFragment
        }
      }
    }
  }
  ${GameFragmentFragmentDoc}
`

export function useCreateWishlistMutation() {
  return Urql.useMutation<
    CreateWishlistMutation,
    CreateWishlistMutationVariables
  >(CreateWishlistDocument)
}
export const UpdateWishlistDocument = gql`
  mutation UpdateWishlist($input: updateWishlistInput!) {
    updateWishlist(input: $input) {
      wishlist {
        id
        games {
          ...GameFragment
        }
      }
    }
  }
  ${GameFragmentFragmentDoc}
`

export function useUpdateWishlistMutation() {
  return Urql.useMutation<
    UpdateWishlistMutation,
    UpdateWishlistMutationVariables
  >(UpdateWishlistDocument)
}
