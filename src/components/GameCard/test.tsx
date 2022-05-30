import 'session.mock'

import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import GameCard from '.'

const props = {
  id: '1',
  slug: 'population-zero',
  title: 'Population Zero',
  developer: 'Rockstar Games',
  img: 'https://source.unsplash.com/user/willianjusten/300x140',
  price: 200
}

describe('<GameCard />', () => {
  it('should render the heading', () => {
    renderWithTheme(<GameCard {...props} />)

    expect(
      screen.getByRole('img', { name: /population zero/i })
    ).toHaveAttribute('src', props.img)

    expect(
      screen.getByRole('heading', { name: /population zero/i })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: /rockstar games/i })
    ).toBeInTheDocument()

    expect(screen.getByRole('link', { name: props.title })).toHaveAttribute(
      'href',
      '/game/population-zero'
    )

    expect(screen.getByLabelText(/Add to Wishlist/i)).toBeInTheDocument()
  })

  it('should render price in label', () => {
    renderWithTheme(<GameCard {...props} />)

    expect(screen.getByText('$200.00')).not.toHaveStyle({
      'text-decoration': 'line-through'
    })

    expect(screen.getByText('$200.00')).toHaveStyle({
      'background-color': '#3CD3C1'
    })
  })

  it('should render a line-through in price when promotional', () => {
    renderWithTheme(<GameCard {...props} promotionPrice={235} />)

    expect(screen.getByText(/\$200\.00/i)).toHaveStyle({
      'text-decoration': 'line-through'
    })

    expect(screen.getByText('$235.00')).not.toHaveStyle({
      'text-decoration': 'line-through'
    })

    expect(screen.getByText('$235.00')).toHaveStyle({
      'background-color': '#3CD3C1'
    })
  })

  it('should render a Ribbon', () => {
    renderWithTheme(
      <GameCard
        {...props}
        ribbon="My Ribbon"
        ribbonSize="small"
        ribbonColor="secondary"
      />
    )
    const ribbon = screen.getByText(/My Ribbon/i)

    expect(ribbon).toBeInTheDocument()
    expect(ribbon).toHaveStyle({ height: '2.6rem', fontSize: '1.2rem' })
    expect(ribbon).toHaveStyle({ 'background-color': '#3CD3C1' })
  })
})
