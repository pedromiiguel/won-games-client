import { screen, waitFor } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'
import mock from './mock'
import PaymentOptions from '.'
import userEvent from '@testing-library/user-event'

describe('<PaymentOptions />', () => {
  const handlePayment = jest.fn()
  it('should render the heading', () => {
    renderWithTheme(
      <PaymentOptions cards={mock} handlePayment={handlePayment} />
    )

    expect(screen.getByText(/4325/i)).toBeInTheDocument()
    expect(screen.getByText(/4326/i)).toBeInTheDocument()

    expect(screen.getByRole('button', { name: 'Add a new credit card' }))
  })

  it('should handle select card when clicking on the label', async () => {
    const handlePayment = jest.fn()
    renderWithTheme(
      <PaymentOptions cards={mock} handlePayment={handlePayment} />
    )
    userEvent.click(screen.getByLabelText(/4325/i))

    await waitFor(() => {
      expect(screen.getByRole('radio', { name: /4325/ })).toBeChecked()
    })
  })

  it('should not call handlePayment when button is disabled', async () => {
    const handlePayment = jest.fn()
    renderWithTheme(
      <PaymentOptions cards={mock} handlePayment={handlePayment} />
    )
    screen.logTestingPlaygroundURL()

    userEvent.click(
      screen.getByRole('button', {
        name: /buy now/i
      })
    )

    expect(handlePayment).not.toHaveBeenCalled()
  })

  it('should  call handlePayment when credit card is selected', async () => {
    const handlePayment = jest.fn()
    renderWithTheme(
      <PaymentOptions cards={mock} handlePayment={handlePayment} />
    )
    userEvent.click(screen.getByLabelText(/4325/i))

    userEvent.click(
      screen.getByRole('button', {
        name: /buy now/i
      })
    )

    await waitFor(() => {
      expect(handlePayment).toHaveBeenCalled()
    })
  })
})
