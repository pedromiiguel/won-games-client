import React from 'react'
import Profile from 'templates/Profile'
import mockOrders from 'components/OrdersList/mock'
import OrdersList, { OrdersListProps } from 'components/OrdersList'
import { GetServerSidePropsContext } from 'next'
import protectedRoutes from 'utils/protected-routes'

const ProfileOrders = ({ items }: OrdersListProps) => {
  return (
    <Profile>
      <OrdersList items={items} />
    </Profile>
  )
}

export default ProfileOrders

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)
  return {
    props: {
      items: mockOrders,
      session
    }
  }
}
