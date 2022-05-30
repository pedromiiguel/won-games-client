import 'session.mock'

import 'match-media-mock'

import { screen } from '@testing-library/react'
import highlightMock from 'components/Highlight/mock'
import gamesMock from 'components/GameCardSlider/mock'

import Showcase from '.'
import { renderWithTheme } from 'utils/tests/helpers'

const props = {
  title: 'Showcase',
  highlight: highlightMock,
  games: gamesMock.slice(0, 1)
}

describe('<Showcase />', () => {
  it('should render full Showcase', () => {
    renderWithTheme(<Showcase {...props} />)

    expect(
      screen.getByRole('heading', { name: /Showcase/i })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: /Read Dead it’s back/i })
    ).toBeInTheDocument()

    expect(
      screen.getAllByRole('heading', { name: /Population Zero/i })
    ).toHaveLength(1)
  })

  it('should without title', () => {
    renderWithTheme(
      <Showcase highlight={props.highlight} games={props.games} />
    )

    expect(
      screen.queryByRole('heading', { name: /Showcase/i })
    ).not.toBeInTheDocument()

    expect(screen.getByRole('heading', { name: /Read Dead it’s back/i }))

    expect(screen.getAllByRole('heading', { name: /Population Zero/i }))
  })

  it('should without highlight', () => {
    renderWithTheme(<Showcase title={props.title} games={props.games} />)

    expect(screen.getByRole('heading', { name: /Showcase/i }))

    expect(screen.getAllByRole('heading', { name: /Population Zero/i }))
    expect(
      screen.queryByRole('heading', { name: /Read Dead it’s back/i })
    ).not.toBeInTheDocument()
  })

  it('should without games', () => {
    renderWithTheme(
      <Showcase title={props.title} highlight={props.highlight} />
    )

    expect(screen.getByRole('heading', { name: /Showcase/i }))

    expect(screen.getByRole('heading', { name: /Read Dead it’s back/i }))

    expect(
      screen.queryByRole('heading', { name: /Population Zero/i })
    ).not.toBeInTheDocument()
  })
})
