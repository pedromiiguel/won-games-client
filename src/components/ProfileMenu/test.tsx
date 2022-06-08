import { screen } from '@testing-library/react'
import theme from 'styles/theme'
import { renderWithTheme } from 'utils/tests/helpers'

import ProfileMenu from '.'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter')

useRouter.mockImplementation(() => ({
  push: jest.fn()
}))

describe('<ProfileMenu />', () => {
  it('should render the menu', () => {
    const { container } = renderWithTheme(<ProfileMenu />)

    expect(
      screen.getByRole('link', { name: /My Profile/i })
    ).toBeInTheDocument()

    expect(screen.getByRole('link', { name: /My orders/i })).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: /Sign out/i })
    ).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render the menu with an active link actived', () => {
    renderWithTheme(<ProfileMenu activeLink="/profile/orders" />)

    expect(screen.getByRole('link', { name: /My orders/i })).toHaveStyle({
      background: theme.colors.primary,
      color: theme.colors.white
    })
  })
})
