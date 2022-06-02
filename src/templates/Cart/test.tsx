import { screen } from '@testing-library/react'

import gamesMock from 'components/GameCardSlider/mock'
import highlightMock from 'components/Highlight/mock'

import Cart from '.'
import { renderWithTheme } from 'utils/tests/helpers'
import React from 'react'

const props = {
  recommendedHighlight: highlightMock,
  recommendedGames: gamesMock,
  recommendedTitle: 'You may like these games'
}

jest.mock('templates/Base', () => {
  return {
    __esModule: true,
    default: function Mock({ children }: { children: React.ReactNode }) {
      return <div data-testid="Mock Base">{children}</div>
    }
  }
})

jest.mock('components/Showcase', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock Showcase"></div>
    }
  }
})

jest.mock('components/CartList', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock CartList"></div>
    }
  }
})

jest.mock('components/PaymentForm', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock PaymentForm"></div>
    }
  }
})

jest.mock('components/Empty', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock Empty"></div>
    }
  }
})

describe('<Cart />', () => {
  it('should render the heading', () => {
    renderWithTheme(<Cart {...props} />)

    expect(
      screen.getByRole('heading', { name: /My cart/i })
    ).toBeInTheDocument()

    expect(screen.getByTestId(/Mock Base/i)).toBeInTheDocument()
    expect(screen.getByTestId(/Mock Showcase/i)).toBeInTheDocument()
    expect(screen.getByTestId(/Mock CartList/i)).toBeInTheDocument()
    expect(screen.getByTestId(/Mock PaymentForm/i)).toBeInTheDocument()
    expect(screen.queryByTestId(/Mock Empty/i)).not.toBeInTheDocument()
  })
})
