import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from 'utils/tests/helpers'
import { Email } from 'styled-icons/material-outlined'

import TextField from '.'

describe('<TextField />', () => {
  it('Renders with Label', () => {
    renderWithTheme(<TextField label="Label" labelFor="Field" id="Field" />)

    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByText(/Label/i)).toBeInTheDocument()
  })

  it('Renders without Label', () => {
    renderWithTheme(<TextField />)
    expect(screen.queryByText(/Label/i)).not.toBeInTheDocument()
  })

  it('Renders with placeholder', () => {
    renderWithTheme(<TextField placeholder="What your name" />)

    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/What your name/i)).toBeInTheDocument()
  })

  it('Changes its value when typing', async () => {
    const onInput = jest.fn()
    renderWithTheme(
      <TextField label="Label" labelFor="Field" id="Field" onInput={onInput} />
    )
    const input = screen.getByRole('textbox')
    const text = 'This is my new text'
    userEvent.type(input, text)

    await waitFor(() => {
      expect(input).toHaveValue(text)
      expect(onInput).toHaveBeenCalledTimes(text.length)
    })

    expect(onInput).toHaveBeenCalledWith(text)
  })
  it('Is accessible by tab', () => {
    renderWithTheme(<TextField label="Label" labelFor="Field" id="Field" />)

    expect(document.body).toHaveFocus()

    userEvent.tab()
    const input = screen.getByRole('textbox')

    expect(input).toHaveFocus()
  })

  it('Renders with Icon', () => {
    renderWithTheme(<TextField icon={<Email data-testid="icon" />} />)

    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('Renders with Icon', () => {
    renderWithTheme(
      <TextField icon={<Email data-testid="icon" />} iconPosition="right" />
    )

    expect(screen.getByTestId('icon').parentElement).toHaveStyle({ order: 0 })
  })

  it('Does not changes its value when disabled', async () => {
    const onInput = jest.fn()

    renderWithTheme(
      <TextField
        label="Label"
        labelFor="Field"
        id="Field"
        onInput={onInput}
        disabled
      />
    )
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
    const text = 'This is my new text'
    userEvent.type(input, text)

    await waitFor(() => {
      expect(input).not.toHaveValue(text)
      expect(onInput).not.toHaveBeenCalled()
    })
  })

  it('Is not accessible by tab when disabled', () => {
    renderWithTheme(
      <TextField label="Label" labelFor="Field" id="Field" disabled />
    )

    expect(document.body).toHaveFocus()

    userEvent.tab()
    const input = screen.getByRole('textbox')

    expect(input).not.toHaveFocus()
  })

  it('renders with error', () => {
    const { container } = renderWithTheme(
      <TextField
        label="Label"
        icon={<Email data-testid="icon" />}
        labelFor="Field"
        error="error message"
      />
    )

    expect(screen.getByText(/error message/i)).toBeInTheDocument()
    expect(container.firstChild).toMatchSnapshot()
  })
})
