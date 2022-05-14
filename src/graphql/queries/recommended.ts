import { gql } from '@apollo/client'

import { GameFragment } from 'graphql/fragments/game'
import { HighlightFragment } from 'graphql/fragments/highlight'

export const QUERY_RECOMMENDED = gql`
  query Recommended {
    recommended {
      section {
        title
        highlight {
          ...HighlightFragment
        }
        games {
          ...GameFragment
        }
      }
    }
  }

  ${GameFragment}
  ${HighlightFragment}
`
