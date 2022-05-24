import CardsList, { CardsListProps } from 'components/CardsList'
import React from 'react'
import Profile from 'templates/Profile'
import mockCards from 'components/PaymentOptions/mock'
import protectedRoutes from 'utils/protected-routes'
import { GetServerSidePropsContext } from 'next'

const ProfileCards = ({ cards }: CardsListProps) => {
  return (
    <Profile>
      <CardsList cards={cards} />
    </Profile>
  )
}

export default ProfileCards

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)
  return {
    props: {
      cards: mockCards,
      session
    }
  }
}
