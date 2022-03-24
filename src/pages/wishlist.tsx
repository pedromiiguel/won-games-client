import React from 'react'
import Wishlist, { WishlistTemplateProps } from 'templates/Wishlist'

import gamesMock from 'components/GameCardSlider/mock'
import highlightMock from 'components/Highlight/mock'

const WishlistPage = (props: WishlistTemplateProps) => {
  return <Wishlist {...props} />
}

export default WishlistPage

export async function getServerSideProps() {
  return {
    props: {
      games: gamesMock,
      recommendedGames: gamesMock.slice(0, 5),
      recommendedHighlight: highlightMock
    }
  }
}
