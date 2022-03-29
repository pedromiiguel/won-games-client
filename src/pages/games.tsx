import React from 'react'
import GamesTemplate, { GamesTemplateProps } from 'templates/Games'
import filterItemsMock from 'components/ExploreSidebar/mock'
import gamesMock from 'components/GameCardSlider/mock'
const GamesPages = ({ games, filterItems }: GamesTemplateProps) => {
  return <GamesTemplate games={games} filterItems={filterItems} />
}

export default GamesPages

export function getServerSideProps() {
  return {
    props: {
      games: gamesMock,
      filterItems: filterItemsMock
    }
  }
}
