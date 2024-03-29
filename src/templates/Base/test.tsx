import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import Base from '.'

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => {
    return [{ session: null }]
  })
}))

jest.mock('components/Menu', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock Menu"></div>
    }
  }
})

jest.mock('components/Footer', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock Footer"></div>
    }
  }
})

describe('<Base />', () => {
  it('should rendermenu, footer and children', () => {
    renderWithTheme(
      <Base>
        <h1>Heading</h1>
      </Base>
    )

    expect(screen.getByTestId(/Mock Menu/i)).toBeInTheDocument()
    expect(screen.getByTestId(/Mock Footer/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Heading' })).toBeInTheDocument()
  })
})
