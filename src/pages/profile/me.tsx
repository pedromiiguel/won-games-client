import FormProfile from 'components/FormProfile'
import { GetServerSidePropsContext } from 'next'
import React from 'react'
import Profile from 'templates/Profile'
import protectedRoutes from 'utils/protected-routes'

const ProfileMe = () => {
  return (
    <Profile>
      <FormProfile />
    </Profile>
  )
}

export default ProfileMe

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)

  return {
    props: { session }
  }
}
