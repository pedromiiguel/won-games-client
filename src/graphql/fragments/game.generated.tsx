import gql from 'graphql-tag'
export type GameFragmentFragment = {
  __typename?: 'Game'
  name: string
  slug: string
  price: number
  cover?: { __typename?: 'UploadFile'; url: string } | null
  developers: Array<{ __typename?: 'Developer'; name: string }>
}

export const GameFragmentFragmentDoc = gql`
  fragment GameFragment on Game {
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
