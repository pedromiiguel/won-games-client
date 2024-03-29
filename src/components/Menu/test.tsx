import { fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import Menu from '.'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter')

useRouter.mockImplementation(() => ({
  push: jest.fn()
}))

describe('<Menu />', () => {
  it('should render the menu', () => {
    renderWithTheme(<Menu status="unauthenticated" />)

    expect(screen.getByLabelText(/Open Menu/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Search/i)).toBeInTheDocument()

    expect(screen.getByRole('img', { name: /Won Games/i })).toBeInTheDocument()
  })

  it('should handle the open/close mobile menu', () => {
    renderWithTheme(<Menu status="unauthenticated" />)

    const fullMenuElement = screen.getByRole('navigation', { hidden: true })

    expect(fullMenuElement.getAttribute('aria-hidden')).toBe('true')
    expect(fullMenuElement).toHaveStyle({ opacity: 0 })

    fireEvent.click(screen.getByLabelText(/Open Menu/i))

    expect(fullMenuElement.getAttribute('aria-hidden')).toBe('false')
    expect(fullMenuElement).toHaveStyle({ opacity: 1 })

    fireEvent.click(screen.getByLabelText(/Close Menu/i))

    expect(fullMenuElement.getAttribute('aria-hidden')).toBe('true')
    expect(fullMenuElement).toHaveStyle({ opacity: 0 })
  })

  it('should show register box when logged out', () => {
    renderWithTheme(<Menu status="unauthenticated" />)
    expect(screen.getByText(/Sign up/i)).toBeInTheDocument()

    expect(screen.queryByText(/My account/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Wishlist/i)).not.toBeInTheDocument()
  })

  it('should show wishlist and account when logged in', () => {
    renderWithTheme(<Menu username="Pedro" status="authenticated" />)

    expect(screen.queryByText(/Sign in/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Sign up/i)).not.toBeInTheDocument()

    fireEvent.click(screen.getByLabelText(/Open Menu/i))

    expect(screen.getByRole('link', { name: /Wishlist/i })).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /My profile/i })
    ).toBeInTheDocument()
  })

  it('should not show sign in or dropdownUser if loading', () => {
    renderWithTheme(<Menu username="Pedro" status="authenticated" />)

    expect(screen.queryAllByText(/Wishlist/i)).toHaveLength(2)
    expect(screen.queryAllByText(/My profile/i)).toHaveLength(2)
  })
})
