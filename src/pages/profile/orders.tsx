import React from 'react'
import Profile from 'templates/Profile'
import mockOrders from 'components/OrdersList/mock'
import OrdersList, { OrdersListProps } from 'components/OrdersList'

const ProfileOrders = ({ items }: OrdersListProps) => {
  return (
    <Profile>
      <OrdersList items={items} />
    </Profile>
  )
}

export default ProfileOrders

export function getServerSideProps() {
  return {
    props: {
      items: mockOrders
    }
  }
}
