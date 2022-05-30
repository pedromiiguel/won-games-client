import WishlistButton from '.'
import { WishlistContextDefaultValues } from 'hooks/useWishlist'
import { render, screen, act, waitFor } from 'utils/test-utils'
import userEvent from '@testing-library/user-event'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useSession = jest.spyOn(require('next-auth/react'), 'useSession')
const session = { jwt: '123', user: { email: 'lorem@ipsum.com' } }
useSession.mockImplementation(() => {
  return { data: session, status: 'authenticated' }
})

describe('<WishlistButton/>', () => {
  it('should render a button to add to wishlist', () => {
    const wishlistProviderProps = {
      ...WishlistContextDefaultValues,
      isInWishlist: () => false
    }

    render(<WishlistButton id="1" />, {
      wishlistProviderProps
    })

    expect(screen.getByLabelText(/add to wishlist/i)).toBeInTheDocument()
  })

  it('should render a button to remove to wishlist', () => {
    const wishlistProviderProps = {
      ...WishlistContextDefaultValues,
      isInWishlist: () => true
    }

    render(<WishlistButton id="1" />, { wishlistProviderProps })

    expect(screen.getByLabelText(/remove from wishlist/i)).toBeInTheDocument()
  })

  it('should render a button with text', () => {
    const wishlistProviderProps = {
      ...WishlistContextDefaultValues,
      isInWishlist: () => false
    }

    render(<WishlistButton id="1" hasText />, { wishlistProviderProps })

    expect(
      screen.getByRole('button', { name: /add to wishlist/i })
    ).toBeInTheDocument()
  })

  it('should render a button with small size', () => {
    const wishlistProviderProps = {
      ...WishlistContextDefaultValues,
      isInWishlist: () => false
    }

    render(<WishlistButton id="1" hasText />, { wishlistProviderProps })
    expect(
      screen.getByRole('button', { name: /add to wishlist/i })
    ).toHaveStyle({
      height: '3rem',
      'font-size': '1.2rem'
    })
  })

  it('should add to wishlist', () => {
    const wishlistProviderProps = {
      ...WishlistContextDefaultValues,
      isInWishlist: () => false,
      addToWishlist: jest.fn()
    }
    render(<WishlistButton id="1" hasText />, { wishlistProviderProps })

    act(() => {
      userEvent.click(screen.getByText(/add to wishlist/i))
    })
    waitFor(() => {
      expect(wishlistProviderProps.addToWishlist).toHaveBeenCalledWith('1')
    })
  })

  it('should remove from wishlist', async () => {
    const wishlistProviderProps = {
      ...WishlistContextDefaultValues,
      isInWishlist: () => true,
      removeFromWishlist: jest.fn()
    }

    render(<WishlistButton id="1" hasText />, { wishlistProviderProps })

    act(() => {
      userEvent.click(screen.getByText(/remove from wishlist/i))
    })

    waitFor(() => {
      expect(wishlistProviderProps.removeFromWishlist).toHaveBeenCalledWith('1')
    })
  })

  it('should not render if not logged', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const useSession = jest.spyOn(require('next-auth/react'), 'useSession')

    useSession.mockImplementation(() => {
      return { data: null, status: 'unauthenticated' }
    })

    const wishlistProviderProps = {
      ...WishlistContextDefaultValues,
      isInWishlist: () => false
    }
    render(<WishlistButton id="1" hasText />, { wishlistProviderProps })

    expect(screen.queryByText(/add to wishlist/i)).not.toBeInTheDocument()
  })
})
