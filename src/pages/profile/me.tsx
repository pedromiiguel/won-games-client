import React from 'react'
import { GetServerSidePropsContext } from 'next'
import FormProfile, { FormProfileProps } from 'components/FormProfile'
import protectedRoutes from 'utils/protected-routes'
import Profile from 'templates/Profile'
import { initializeApollo } from 'utils/apollo'
import { QUERY_PROFILE_ME } from 'graphql/queries/profile'
import { ProfileQuery } from 'graphql/queries/profile.generated'

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

  const { data } = await apolloClient.query<ProfileQuery>({
    query: QUERY_PROFILE_ME
  })

  return {
    props: { session, username: data.me?.username, email: data.me?.email }
  }
}
