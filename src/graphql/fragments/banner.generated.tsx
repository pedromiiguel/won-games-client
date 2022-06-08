import * as Types from '../types'

import gql from 'graphql-tag'
export type BannerFragmentFragment = {
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
}

export const BannerFragmentFragmentDoc = gql`
  fragment BannerFragment on Banner {
    image {
      url
    }
    title
    subtitle
    button {
      label
      link
    }
    ribbon {
      text
      color
      size
    }
  }
`
