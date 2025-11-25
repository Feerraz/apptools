// firebase
import '@/config/firebase'

// contexts
import { ThemeProvider } from '@/contexts/theme'
import { ResultsProvider } from '@/contexts/results'

// types
import { AppProps } from 'next/app'
import { ReactNode } from 'react'

// styles
import 'antd/dist/reset.css'
import '@/styles/globals.css'

// components
import { MetaHeader } from '@/components/Header'
import Layout from '@/components/Layout'

/**
 * Root component
 *
 * @param {AppProps} props
 * @return {ReactNode} Page
 */
function _app( {
  Component,
  pageProps
}: AppProps ): ReactNode {
  return (
    <ThemeProvider>
      <ResultsProvider>
        <Layout>
          <MetaHeader />
          <Component { ...pageProps } />
        </Layout>
      </ResultsProvider>
    </ThemeProvider>
  )
}

export default _app
