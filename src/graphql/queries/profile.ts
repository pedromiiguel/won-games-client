import { gql } from '@apollo/client'

export const QUERY_PROFILE_ME = gql`
  query Profile($identifier: ID!) {
    user(id: $identifier) {
      id
      email
      username
    }
  }
`
