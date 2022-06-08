import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from 'utils/tests/helpers'

import UserDropdown from '.'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter')

useRouter.mockImplementation(() => ({
  push: jest.fn()
}))

describe('<UserDropdown />', () => {
  it('should render the username', () => {
    renderWithTheme(<UserDropdown username="John Doe" />)

    expect(screen.getByText(/John Doe/)).toBeInTheDocument()
  })

  it('should render the menu', () => {
    renderWithTheme(<UserDropdown username="John Doe" />)

    userEvent.click(screen.getByText(/John Doe/))

    expect(
      screen.getByRole('link', { name: /My profile/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Wishlist/i })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Sign out/i })
    ).toBeInTheDocument()
  })
})
