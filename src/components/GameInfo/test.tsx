import 'session.mock'
import { render, screen } from 'utils/test-utils'

import GameInfo from '.'

const props = {
  id: '1',
  title: 'My Game Title',
  description: 'My Game Description',
  price: 210.0
}

describe('<GameInfo />', () => {
  it('should render game informations', () => {
    const { container } = render(<GameInfo {...props} />)

    expect(
      screen.getByRole('heading', { name: /My Game Title/i })
    ).toBeInTheDocument()

    expect(screen.getByText(/My Game Description/i)).toBeInTheDocument()

    expect(screen.getByText(/210\.00/i)).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render buttons', () => {
    render(<GameInfo {...props} />)

    expect(
      screen.getByRole('button', { name: /add to wishlist/i })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: /add to cart/i })
    ).toBeInTheDocument()
  })
})
