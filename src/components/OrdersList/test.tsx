import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'
import mock from './mock'
import OrdersList from '.'

jest.mock('components/Empty', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock Empty" />
    }
  }
})

jest.mock('components/GameItem', () => {
  return {
    __esModule: true,
    default: function Mock({ children }: { children: React.ReactNode }) {
      return <div data-testid="Mock GameItem">{children}</div>
    }
  }
})

describe('<OrdersList />', () => {
  it('should render the game items', () => {
    renderWithTheme(<OrdersList items={mock} />)

    expect(
      screen.getByRole('heading', { name: /my orders/i })
    ).toBeInTheDocument()

    expect(screen.getAllByTestId('Mock GameItem')).toHaveLength(2)
  })

  it('should render empty state', () => {
    renderWithTheme(<OrdersList />)

    expect(screen.getByTestId('Mock Empty')).toBeInTheDocument()
  })
})
