import { fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'
import items from './mock'
import { Overlay } from './styles'

import ExploreSidebar from '.'

import userEvent from '@testing-library/user-event'
import { css } from 'styled-components'

describe('<ExploreSidebar />', () => {
  it('should render headings', () => {
    const onFilter = jest.fn()
    renderWithTheme(<ExploreSidebar items={items} onFilter={onFilter} />)

    expect(screen.getByRole('heading', { name: /price/i })).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: /sort by/i })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: /platforms/i })
    ).toBeInTheDocument()

    expect(screen.getByRole('heading', { name: /genre/i })).toBeInTheDocument()
  })

  it('should render inputs', () => {
    const onFilter = jest.fn()

    renderWithTheme(<ExploreSidebar items={items} onFilter={onFilter} />)

    expect(
      screen.getByRole('checkbox', { name: /under \$50/i })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('radio', { name: /low to high/i })
    ).toBeInTheDocument()
  })

  it('should render the filter button', () => {
    const onFilter = jest.fn()

    renderWithTheme(<ExploreSidebar items={items} onFilter={onFilter} />)

    expect(screen.getByRole('button', { name: /filter/i })).toBeInTheDocument()
  })

  it('should check initial values that are passed', () => {
    const onFilter = jest.fn()

    renderWithTheme(
      <ExploreSidebar
        items={items}
        onFilter={onFilter}
        initialValues={{
          platforms: ['windows', 'linux'],
          sort_by: 'low-to-high'
        }}
      />
    )

    expect(screen.getByRole('checkbox', { name: /windows/i })).toBeChecked()

    expect(screen.getByRole('radio', { name: /low to high/i })).toBeChecked()
  })

  it('should filter with initial values', () => {
    const onFilter = jest.fn()
    renderWithTheme(
      <ExploreSidebar
        items={items}
        initialValues={{
          platforms: ['windows'],
          sort_by: 'low-to-high'
        }}
        onFilter={onFilter}
      />
    )

    expect(onFilter).toBeCalledWith({
      platforms: ['windows'],
      sort_by: 'low-to-high'
    })
  })

  it('should filter with checked values', () => {
    const onFilter = jest.fn()
    renderWithTheme(<ExploreSidebar items={items} onFilter={onFilter} />)

    fireEvent.click(screen.getByLabelText(/windows/i))
    fireEvent.click(screen.getByLabelText(/linux/i))
    fireEvent.click(screen.getByLabelText(/low to high/i))

    expect(onFilter).toHaveBeenCalledTimes(4)

    expect(onFilter).toBeCalledWith({
      platforms: ['windows', 'linux'],
      sort_by: 'low-to-high'
    })
  })

  it('should filter between radio options', () => {
    const onFilter = jest.fn()
    renderWithTheme(<ExploreSidebar items={items} onFilter={onFilter} />)

    fireEvent.click(screen.getByLabelText(/low to high/i))
    fireEvent.click(screen.getByLabelText(/high to low/i))

    expect(onFilter).toBeCalledWith({
      sort_by: 'high-to-low'
    })
  })

  it('should open/close sidebar when filtering on mobile ', () => {
    const { container } = renderWithTheme(
      <ExploreSidebar items={items} onFilter={jest.fn} />
    )

    const variant = {
      media: '(max-width:768px)',
      modifier: String(css`
        ${Overlay}
      `)
    }

    const Element = container.firstChild

    expect(Element).not.toHaveStyleRule('opacity', '1', variant)

    userEvent.click(screen.getByLabelText(/open filters/))

    // expect(Element).toHaveStyleRule('opacity', '1', variant)

    userEvent.click(screen.getByLabelText(/close filters/))

    expect(Element).not.toHaveStyleRule('opacity', '1', variant)

    userEvent.click(screen.getByLabelText(/open filters/))

    userEvent.click(screen.getByRole('button', { name: /filter/i }))
  })
})
