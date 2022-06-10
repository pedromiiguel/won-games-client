import '../.jest/next-image.mock'

import { RouterContext } from 'next/dist/shared/lib/router-context'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from '../src/styles/global'
import theme from 'styles/theme'
import { CartContext, CartContextDefaultValues } from 'hooks/useCart'

export const parameters = {
  nextRouter: {
    Provider: RouterContext.Provider
  },
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: theme.colors.white
      },
      {
        name: 'dark',
        value: theme.colors.mainBg
      }
    ]
  }
}

export const decorators = [
  (Story, context) => (
    <ThemeProvider theme={theme}>
      <GlobalStyles removeBg />
      <CartContext.Provider
        value={{
          ...CartContextDefaultValues,
          ...(context?.args?.cartContextValue || {}),
          ...context.args
        }}
      >
        <Story />
      </CartContext.Provider>
    </ThemeProvider>
  )
]
