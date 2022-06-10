import NextNProgress from 'nextjs-progressbar'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ApolloProvider } from '@apollo/client'
import { SessionProvider as AuthProvider } from 'next-auth/react'
import { ThemeProvider } from 'styled-components'
import { CartProvider } from 'hooks/useCart'
import { WishlistProvider } from 'hooks/useWishlist'
import theme from 'styles/theme'
import SEO from '../../next-seo.config'
import { DefaultSeo } from 'next-seo'
import GlobalStyles from 'styles/global'
import { useApollo } from 'utils/apollo'

function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState)

  return (
    <AuthProvider session={pageProps.session}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <CartProvider>
            <WishlistProvider>
              <Head>
                <title>Won Games</title>
                <link rel="shortcut icon" href="/img/icon-512.png" />
                <link rel="apple-touch-icon" href="/img/icon-512.png" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#06092B" />
                <meta
                  name="description"
                  content="The best Game Store in the world!"
                />
              </Head>
              <DefaultSeo {...SEO} />
              <GlobalStyles />
              <NextNProgress
                color="#F231A5"
                startPosition={0.3}
                stopDelayMs={200}
                height={3}
                showOnShallow={true}
              />
              <Component {...pageProps} />
            </WishlistProvider>
          </CartProvider>
        </ThemeProvider>
      </ApolloProvider>
    </AuthProvider>
  )
}

export default App
