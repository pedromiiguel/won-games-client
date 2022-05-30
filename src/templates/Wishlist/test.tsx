import 'session.mock'
import { render, screen } from 'utils/test-utils'
import gamesMock from 'components/GameCardSlider/mock'
import highlightMock from 'components/Highlight/mock'

import Wishlist from '.'
import { WishlistContextDefaultValues } from 'hooks/useWishlist'

const props = {
  recommendedGames: gamesMock.slice(0, 2),
  recommendedHighlight: highlightMock,
  recommendedTitle: 'You may like these games'
}

jest.mock('templates/Base', () => ({
  __esModule: true,
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock Base">{children}</div>
  }
}))

jest.mock('components/Showcase', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Mock Showcase" />
  }
}))

describe('<Wishlist />', () => {
  it('should render all components', () => {
    const wishlistProviderProps = {
      ...WishlistContextDefaultValues,
      items: [gamesMock[0]]
    }

    render(<Wishlist {...props} />, { wishlistProviderProps })

    expect(
      screen.getByRole('heading', { name: /Wishlist/i })
    ).toBeInTheDocument()
    expect(screen.getByText(/population zero/i)).toBeInTheDocument()
    expect(screen.getByTestId('Mock Showcase')).toBeInTheDocument()
  })

  it('should render empty when there are no games', () => {
    const wishlistProviderProps = {
      ...WishlistContextDefaultValues,
      items: []
    }

    render(
      <Wishlist
        recommendedGames={gamesMock}
        recommendedHighlight={highlightMock}
        recommendedTitle="You may like these games"
      />,
      { wishlistProviderProps }
    )

    expect(screen.queryByText(/population zero/i)).not.toBeInTheDocument()

    expect(
      screen.getByText(/Games added to your wishlist will appear here/i)
    ).toBeInTheDocument()
  })
})
