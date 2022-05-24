import { gql } from '@apollo/client'

export const MUTATION_REGISTER = gql`
  mutation Register($input: UsersPermissionsRegisterInput!) {
    register(input: $input) {
      jwt
    }
  }
`
