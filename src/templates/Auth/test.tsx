import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import Auth from '.'

describe('<Auth />', () => {
  it('should render all components and children', () => {
    renderWithTheme(
      <Auth title="Auth Title">
        <input type="text" />
      </Auth>
    )

    expect(
      screen.getByRole('heading', { name: /All favorite games in one place/i })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {
        name: /WON is the best and most complete gaming platform./i
      })
    ).toBeInTheDocument()

    expect(
      screen.getByText('Won Games 2020 Todos os Direitos Reservados')
    ).toBeInTheDocument()

    expect(screen.getAllByRole('img', { name: 'Won Games' })).toHaveLength(2)

    expect(
      screen.getByRole('heading', {
        name: /Auth Title/i
      })
    ).toBeInTheDocument()

    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })
})
