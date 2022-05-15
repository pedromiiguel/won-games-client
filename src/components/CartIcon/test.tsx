import { CartContextDefaultValues } from 'hooks/useCart'
import { screen, render } from 'utils/test-utils'

import CartIcon from '.'

describe('<CartIcon />', () => {
  it('should render the without badge', () => {
    render(<CartIcon />)

    expect(screen.getByLabelText(/shopping cart/i)).toBeInTheDocument()
    expect(screen.queryByLabelText(/cart items/i)).not.toBeInTheDocument()
  })

  it('should render with badge only if has positive numbers', () => {
    render(<CartIcon />, {
      cartProviderProps: { ...CartContextDefaultValues, quantity: 3 }
    })

    expect(screen.getByLabelText(/cart items/i)).toBeInTheDocument()
    expect(screen.getByText(/3/)).toBeInTheDocument()
  })
})
