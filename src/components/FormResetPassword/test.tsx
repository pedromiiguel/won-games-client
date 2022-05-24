import userEvent from '@testing-library/user-event'
import 'server.mock'
import { render, screen, waitFor } from 'utils/test-utils'
import { signIn } from 'next-auth/react'

import FormForgotPassword from '.'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter')
let query = {}

useRouter.mockImplementation(() => ({
  query
}))

jest.mock('next-auth/react', () => ({
  signIn: jest.fn()
}))

describe('<FormForgotPassword/>', () => {
  it('should render the form', () => {
    render(<FormForgotPassword />)

    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Confirm Password/i)).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: /Reset Password/i })
    ).toBeInTheDocument()
  })

  it('should show validation errors', async () => {
    render(<FormForgotPassword />)

    await userEvent.type(screen.getByPlaceholderText('Password'), '123')
    await userEvent.type(
      screen.getByPlaceholderText(/Confirm Password/i),
      '312'
    )

    userEvent.click(screen.getByRole('button', { name: /Reset Password/i }))

    expect(
      await screen.findByText(/confirm password does not match with password/i)
    ).toBeInTheDocument()
  })

  it('should show error code provided is wrong', async () => {
    query = { code: 'wrong_code' }
    render(<FormForgotPassword />)

    await userEvent.type(screen.getByPlaceholderText('Password'), '123')
    await userEvent.type(
      screen.getByPlaceholderText(/Confirm Password/i),
      '123'
    )

    userEvent.click(screen.getByRole('button', { name: /Reset Password/i }))

    expect(
      await screen.findByText(/Incorrect code provided/i)
    ).toBeInTheDocument()
  })

  it('should reset the password and sign in the user', async () => {
    query = { code: 'right_code' }
    render(<FormForgotPassword />)

    await userEvent.type(screen.getByPlaceholderText('Password'), '123')
    await userEvent.type(
      screen.getByPlaceholderText(/Confirm Password/i),
      '123'
    )

    userEvent.click(screen.getByRole('button', { name: /Reset Password/i }))

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('credentials', {
        email: 'valid@email.com',
        password: '123',
        callbackUrl: '/'
      })
    })
  })
})
