import * as Types from '../types'

import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type ProfileQueryVariables = Types.Exact<{
  identifier: Types.Scalars['ID']
}>

export type ProfileQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'UsersPermissionsUser'
    id: string
    email: string
    username: string
  } | null
}

export const ProfileDocument = gql`
  query Profile($identifier: ID!) {
    user(id: $identifier) {
      id
      email
      username
    }
  }
`

export function useProfileQuery(
  options: Omit<Urql.UseQueryArgs<ProfileQueryVariables>, 'query'>
) {
  return Urql.useQuery<ProfileQuery>({ query: ProfileDocument, ...options })
}
