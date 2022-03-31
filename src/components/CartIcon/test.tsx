import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import CartIcon from '.'

describe('<CartIcon />', () => {
  it('should render the without badge', () => {
    renderWithTheme(<CartIcon />)

    expect(screen.getByLabelText(/shopping cart/i)).toBeInTheDocument()
    expect(screen.queryByLabelText(/cart items/i)).not.toBeInTheDocument()
  })

  it('should render with badge only if has positive numbers', () => {
    renderWithTheme(<CartIcon quantity={3} />)

    expect(screen.getByLabelText(/cart items/i)).toBeInTheDocument()
    expect(screen.getByText(/3/)).toBeInTheDocument()
  })

  it('should not render with negative numbers', () => {
    renderWithTheme(<CartIcon quantity={-19} />)

    expect(screen.queryByLabelText(/cart items/i)).not.toBeInTheDocument()
  })
})
