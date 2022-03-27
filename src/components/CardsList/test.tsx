import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import CardsList from '.'

const cards = [
  {
    flag: 'visa',
    img: '/img/visa.png',
    number: '*** *** **** 4325'
  }
]

describe('<CardsList />', () => {
  it('should render the heading', () => {
    renderWithTheme(<CardsList cards={cards} />)

    expect(
      screen.getByRole('heading', { name: /my cards/i })
    ).toBeInTheDocument()

    expect(screen.getByRole('img', { name: /visa/i })).toHaveAttribute(
      'src',
      '/img/visa.png'
    )
    expect(screen.getByText(/4325/)).toBeInTheDocument()
  })
})
