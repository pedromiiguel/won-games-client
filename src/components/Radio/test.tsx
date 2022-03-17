import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from 'utils/tests/helpers'

import Radio from '.'

describe('<Radio />', () => {
  it('should render radio with label', () => {
    const { container } = renderWithTheme(
      <Radio label="radio" labelFor="radio input" />
    )

    expect(screen.getByRole('radio')).toBeInTheDocument()
    expect(screen.getByText(/radio/i)).toBeInTheDocument()
    expect(screen.getByText(/radio/i)).toHaveAttribute('for', 'radio input')

    expect(screen.getByText(/radio/i)).toHaveStyle({ color: '#FAFAFA' })

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render radio with labelColor black', () => {
    renderWithTheme(
      <Radio label="radio" labelFor="radio input" labelColor="black" />
    )

    expect(screen.getByText(/radio/i)).toHaveStyle({ color: '#030517' })
  })

  it('should render without label', () => {
    renderWithTheme(<Radio />)

    expect(screen.queryByLabelText(/radio/i)).not.toBeInTheDocument()
  })

  it('should dispatch onCheck when label status changes', async () => {
    const onCheck = jest.fn()
    renderWithTheme(<Radio onCheck={onCheck} value="anyValue" />)

    userEvent.click(screen.getByRole('radio'))

    await waitFor(() => {
      expect(onCheck).toBeCalledTimes(1)
    })

    expect(onCheck).toHaveBeenCalledWith('anyValue')
  })

  it('Should be accessible with tab', async () => {
    renderWithTheme(<Radio value="anyValue" />)
    expect(document.body).toHaveFocus()

    userEvent.tab()

    expect(screen.getByRole('radio')).toHaveFocus()
  })
})
