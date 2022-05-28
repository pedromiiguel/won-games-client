/* eslint-disable @typescript-eslint/no-explicit-any */
import gql from 'graphql-tag'
export type GameFragmentFragment = {
  __typename?: 'Game'
  id: string
  name: string
  slug: string
  price: number
  cover?: { __typename?: 'UploadFile'; url: string } | null
  developers: Array<{ __typename?: 'Developer'; name: string }>
}

export const GameFragmentFragmentDoc = gql`
  fragment GameFragment on Game {
    id
    name
    slug
    cover {
      url
    }
    developers {
      name
    }
    price
  }
`
