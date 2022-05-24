import * as Types from '../types'

import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type ProfileQueryVariables = Types.Exact<{ [key: string]: never }>

export type ProfileQuery = {
  __typename?: 'Query'
  me?: {
    __typename?: 'UsersPermissionsMe'
    username: string
    email: string
  } | null
}

export const ProfileDocument = gql`
  query Profile {
    me {
      username
      email
    }
  }
`

export function useProfileQuery(
  options?: Omit<Urql.UseQueryArgs<ProfileQueryVariables>, 'query'>
) {
  return Urql.useQuery<ProfileQuery>({ query: ProfileDocument, ...options })
}
