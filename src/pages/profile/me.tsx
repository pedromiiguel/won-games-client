import React from 'react'
import { GetServerSidePropsContext } from 'next'
import FormProfile, { FormProfileProps } from 'components/FormProfile'
import protectedRoutes from 'utils/protected-routes'
import Profile from 'templates/Profile'
import { initializeApollo } from 'utils/apollo'
import { QUERY_PROFILE_ME } from 'graphql/queries/profile'
import {
  ProfileQuery,
  ProfileQueryVariables
} from 'graphql/queries/profile.generated'

const ProfileMe = (props: FormProfileProps) => {
  return (
    <Profile>
      <FormProfile {...props} />
    </Profile>
  )
}

export default ProfileMe

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)
  const apolloClient = initializeApollo(null, session)

  if (!session) {
    return { props: {} }
  }

  const { data } = await apolloClient.query<
    ProfileQuery,
    ProfileQueryVariables
  >({
    query: QUERY_PROFILE_ME,
    variables: { identifier: session?.id as string }
  })

  return {
    props: { session, username: data.user?.username, email: data.user?.email }
  }
}
