import { CartContextDefaultValues } from 'hooks/useCart'
import { screen, render } from 'utils/test-utils'
import items from './mock'
import CartList from '.'

describe('<CartList />', () => {
  it('should render the heading', () => {
    const cartProviderProps = {
      ...CartContextDefaultValues,
      items,
      total: '$ 200.00'
    }

    const { container } = render(<CartList />, { cartProviderProps })

    expect(screen.getAllByRole('heading')).toHaveLength(2)

    expect(screen.getByText('$ 200.00')).toHaveStyle({ color: '#F231A5' })

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render the button', () => {
    const cartProviderProps = {
      ...CartContextDefaultValues,
      items
    }

    render(<CartList hasButton />, { cartProviderProps })
    expect(screen.getByText(/but it now/i)).toBeInTheDocument()
  })

  it('should render with button', () => {
    render(<CartList />)
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument()
    expect(screen.queryByText(/total/i)).not.toBeInTheDocument()
  })

  it('should render loading ', () => {
    const cartProviderProps = {
      ...CartContextDefaultValues,
      items,
      loading: true
    }

    render(<CartList hasButton />, { cartProviderProps })
    expect(screen.getByTitle(/loading/i)).toBeInTheDocument()
  })
})
