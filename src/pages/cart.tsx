import React from 'react'
import Cart, { CartTemplateProps } from 'templates/Cart'

import itemsMock from 'components/CartList/mock'
import cardsMock from 'components/PaymentOptions/mock'
import gamesMock from 'components/GameCardSlider/mock'
import highlightMock from 'components/Highlight/mock'

const CartPage = (props: CartTemplateProps) => {
  return <Cart {...props} />
}

export default CartPage

export async function getServerSideProps() {
  return {
    props: {
      cards: cardsMock,
      items: itemsMock,
      total: 'R$ 430,00',
      recommendedGames: gamesMock,
      recommendedHighlight: highlightMock
    }
  }
}
