/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Types from '../types'

import gql from 'graphql-tag'
import { GameFragmentFragmentDoc } from '../fragments/game.generated'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type OrdersQueryVariables = Types.Exact<{
  identifier: Types.Scalars['ID']
}>

export type OrdersQuery = {
  __typename?: 'Query'
  orders: Array<{
    __typename?: 'Order'
    id: string
    created_at: any
    card_brand?: string | null
    card_last4?: string | null
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

export const OrdersDocument = gql`
  query Orders($identifier: ID!) {
    orders(where: { user: { id: $identifier } }) {
      id
      created_at
      card_brand
      card_last4
      games {
        ...GameFragment
      }
    }
  }
  ${GameFragmentFragmentDoc}
`

export function useOrdersQuery(
  options: Omit<Urql.UseQueryArgs<OrdersQueryVariables>, 'query'>
) {
  return Urql.useQuery<OrdersQuery>({ query: OrdersDocument, ...options })
}
