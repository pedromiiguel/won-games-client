import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import FormSignUp from '.'

describe('<FormSignIn />', () => {
  it('should render the form', () => {
    const { container } = renderWithTheme(<FormSignUp />)

    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: 'Sign up now' })
    ).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render the text and link to sign up', () => {
    renderWithTheme(<FormSignUp />)

    expect(screen.getByText('Already have an account?')).toBeInTheDocument()

    expect(screen.getByRole('link', { name: 'Sign in' })).toBeInTheDocument()
  })
})
