import * as Types from '../../types'

import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type RegisterMutationVariables = Types.Exact<{
  input: Types.UsersPermissionsRegisterInput
}>

export type RegisterMutation = {
  __typename?: 'Mutation'
  register: { __typename?: 'UsersPermissionsLoginPayload'; jwt?: string | null }
}

export const RegisterDocument = gql`
  mutation Register($input: UsersPermissionsRegisterInput!) {
    register(input: $input) {
      jwt
    }
  }
`

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument
  )
}
