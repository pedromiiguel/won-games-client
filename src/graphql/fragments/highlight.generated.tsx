import * as Types from '../../types'

import gql from 'graphql-tag'
export type HighlightFragmentFragment = {
  __typename?: 'ComponentPageHighlight'
  title: string
  subtitle: string
  buttonLabel: string
  buttonLink: string
  alignment?: Types.Enum_Componentpagehighlight_Alignment | null
  background?: { __typename?: 'UploadFile'; url: string } | null
  floatImage?: { __typename?: 'UploadFile'; url: string } | null
}

export const HighlightFragmentFragmentDoc = gql`
  fragment HighlightFragment on ComponentPageHighlight {
    title
    subtitle
    background {
      url
    }
    floatImage {
      url
    }
    buttonLabel
    buttonLink
    alignment
  }
`
