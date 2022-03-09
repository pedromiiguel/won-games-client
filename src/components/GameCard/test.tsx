import { fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import GameCard from '.'

const props = {
  title: 'Population Zero',
  developer: 'Rockstar Games',
  img: 'https://source.unsplash.com/user/willianjusten/300x140',
  price: 'R$ 235,00'
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

    expect(screen.getByLabelText(/Add to Wishlist/i)).toBeInTheDocument()
  })

  it('should render price in label', () => {
    renderWithTheme(<GameCard {...props} />)

    expect(screen.getByText(/r\$ 235,00/i)).not.toHaveStyle({
      'text-decoration': 'line-through'
    })

    expect(screen.getByText(/r\$ 235,00/i)).toHaveStyle({
      'background-color': '#3CD3C1'
    })
  })

  it('should render a line-through in price when promotional', () => {
    renderWithTheme(<GameCard {...props} promotionPrice="R$ 200,00" />)

    expect(screen.getByText(/r\$ 235,00/i)).toHaveStyle({
      'text-decoration': 'line-through'
    })

    expect(screen.getByText(/r\$ 200,00/i)).not.toHaveStyle({
      'text-decoration': 'line-through'
    })

    expect(screen.getByText(/r\$ 200,00/i)).toHaveStyle({
      'background-color': '#3CD3C1'
    })
  })
  it('should render a filled Favorite icon when favorite is true', () => {
    renderWithTheme(<GameCard {...props} favorite />)

    expect(screen.getByLabelText(/remove from wishlist/i)).toBeInTheDocument()
  })

  it('should call onFav method whe favorite is clicked', () => {
    const onFav = jest.fn()

    renderWithTheme(<GameCard {...props} favorite onFav={onFav} />)

    fireEvent.click(screen.getAllByRole('button')[0])

    expect(onFav).toBeCalled()
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
