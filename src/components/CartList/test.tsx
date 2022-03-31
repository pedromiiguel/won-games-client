import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'
import mock from './mock'

import CartList from '.'

describe('<CartList />', () => {
  it('should render the heading', () => {
    const { container } = renderWithTheme(
      <CartList items={mock} total="R$ 200,00" />
    )

    expect(screen.getAllByRole('heading')).toHaveLength(2)

    expect(screen.getByText('R$ 200,00')).toHaveStyle({ color: '#F231A5' })

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render with button', () => {
    renderWithTheme(<CartList items={mock} total="R$ 200,00" hasButton />)
    expect(screen.getByText(/but it now/i)).toBeInTheDocument()
  })

  it('should render with button', () => {
    renderWithTheme(<CartList />)
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument()
    expect(screen.queryByText(/total/i)).not.toBeInTheDocument()
  })
})
