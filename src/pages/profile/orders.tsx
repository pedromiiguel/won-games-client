import React from 'react'
import Profile from 'templates/Profile'
import { ordersMapper } from 'utils/mappers'
import OrdersList, { OrdersListProps } from 'components/OrdersList'
import { GetServerSidePropsContext } from 'next'
import protectedRoutes from 'utils/protected-routes'
import { initializeApollo } from 'utils/apollo'
import {
  OrdersQuery,
  OrdersQueryVariables
} from 'graphql/queries/orders.generated'
import { QUERY_ORDERS } from 'graphql/queries/orders'

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

  const apolloClient = initializeApollo(null, session)

  const { data } = await apolloClient.query<OrdersQuery, OrdersQueryVariables>({
    query: QUERY_ORDERS,
    variables: {
      identifier: session?.id as string
    },
    fetchPolicy: 'no-cache'
  })

  return {
    props: {
      items: ordersMapper(data.orders),
      session
    }
  }
}
