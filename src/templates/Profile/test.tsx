import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import Profile from '.'

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ asPath: '/profile/me' }))
}))

jest.mock('components/Heading', () => {
  return {
    __esModule: true,
    default: function Mock({ children }: { children: React.ReactNode }) {
      return <div data-testid="Mock Heading">{children}</div>
    }
  }
})

jest.mock('components/ProfileMenu', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock ProfileMenu"></div>
    }
  }
})

jest.mock('templates/Base', () => {
  return {
    __esModule: true,
    default: function Mock({ children }: { children: React.ReactNode }) {
      return <div data-testid="Mock Base">{children}</div>
    }
  }
})

describe('<Profile />', () => {
  it('should render sections', () => {
    renderWithTheme(
      <Profile>lorem ipsum dolor sit amet, consectetur adipis</Profile>
    )
    expect(
      screen.getByText('lorem ipsum dolor sit amet, consectetur adipis')
    ).toBeInTheDocument()
    expect(screen.getByText('My profile')).toBeInTheDocument()
    expect(screen.getByTestId('Mock ProfileMenu')).toBeInTheDocument()
  })
})
