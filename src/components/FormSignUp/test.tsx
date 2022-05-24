import { MockedProvider } from '@apollo/client/testing'
import { screen, render } from 'utils/test-utils'

import FormSignUp from '.'

describe('<FormSignIn />', () => {
  it('should render the form', () => {
    const { container } = render(
      <MockedProvider>
        <FormSignUp />
      </MockedProvider>
    )

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
    render(
      <MockedProvider>
        <FormSignUp />
      </MockedProvider>
    )

    expect(screen.getByText('Already have an account?')).toBeInTheDocument()

    expect(screen.getByRole('link', { name: 'Sign in' })).toBeInTheDocument()
  })
})
