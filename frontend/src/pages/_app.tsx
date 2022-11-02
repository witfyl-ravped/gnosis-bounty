import Sentry from '@/services/sentry' // needs to be imported first
import type { ReactNode } from 'react'
import { type ReactElement } from 'react'
import { type AppProps } from 'next/app'
import Script from 'next/script'
import { useEffect, useState } from 'react'
// import { Urbit } from '@urbit/http-api'
import api from '@/hooks/useUrbit'
import Head from 'next/head'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { setBaseUrl as setGatewayBaseUrl } from '@gnosis.pm/safe-react-gateway-sdk'
import { CacheProvider, type EmotionCache } from '@emotion/react'
import '@/styles/globals.css'
import { IS_PRODUCTION, GATEWAY_URL_STAGING, GATEWAY_URL_PRODUCTION } from '@/config/constants'
import { StoreHydrator } from '@/store'
import PageLayout from '@/components/common/PageLayout'
import useLoadableStores from '@/hooks/useLoadableStores'
import usePathRewrite from '@/hooks/usePathRewrite'
import { useInitOnboard } from '@/hooks/wallets/useOnboard'
import { useInitWeb3 } from '@/hooks/wallets/useInitWeb3'
import { useInitSafeCoreSDK } from '@/hooks/coreSDK/useInitSafeCoreSDK'
import useTxNotifications from '@/hooks/useTxNotifications'
import useSafeNotifications from '@/hooks/useSafeNotifications'
import useTxPendingStatuses from '@/hooks/useTxPendingStatuses'
import { useInitSession } from '@/hooks/useInitSession'
import useStorageMigration from '@/services/ls-migration'
import Notifications from '@/components/common/Notifications'
import CookieBanner from '@/components/common/CookieBanner'
import { useLightDarkTheme } from '@/hooks/useDarkMode'
import { cgwDebugStorage } from '@/components/sidebar/DebugToggle'
import { useTxTracking } from '@/hooks/useTxTracking'
import useGtm from '@/services/analytics/useGtm'
import useBeamer from '@/hooks/useBeamer'
import ErrorBoundary from '@/components/common/ErrorBoundary'
import createEmotionCache from '@/utils/createEmotionCache'
import MetaTags from '@/components/common/MetaTags'


const GATEWAY_URL = IS_PRODUCTION || cgwDebugStorage.get() ? GATEWAY_URL_PRODUCTION : GATEWAY_URL_STAGING

const InitApp = (): null => {
  setGatewayBaseUrl(GATEWAY_URL)
  usePathRewrite()
  useStorageMigration()
  useGtm()
  useInitSession()
  useLoadableStores()
  useInitOnboard()
  useInitWeb3()
  useInitSafeCoreSDK()
  useTxNotifications()
  useSafeNotifications()
  useTxPendingStatuses()
  useTxTracking()
  useBeamer()

  return null
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export const AppProviders = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const theme = useLightDarkTheme()

  return (
    <ThemeProvider theme={theme}>
      <Sentry.ErrorBoundary showDialog fallback={ErrorBoundary}>
        {children}
      </Sentry.ErrorBoundary>
    </ThemeProvider>
  )
}

interface WebCoreAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const WebCoreApp = ({ Component, pageProps, emotionCache = clientSideEmotionCache }: WebCoreAppProps): ReactElement => {
  // const [api, setApi] = useState<any>()
  // const [updatesSub, setUpdatesSub] = useState<any>()

  // useEffect(() => {
  //   setApi(api)
  // }, [])

  useEffect(() => {
    api?.subscribe({
      app: 'gnosis',
      path: '/updates',
      event: console.log,
      err: console.log,
      quit: console.log,
    })
    // .then((subId: any) => {
    //   setUpdatesSub(subId)
    // })

    api?.poke({
      app: 'gnosis',
      mark: 'gnosis-action',
      json: {'fe-test': null}
    })
  }, [api])


  const testSafeData: any = {
    'add-safe': {
      value: '0x5F2da2F413f0d0C045BA63f779797F59efe93C79',
      name: 'test-safe-name',
      'owners': [{
        value: '0xedA8FA3F3bC39bC186a368Cb8CD07AB247F66665',
        name: 'witfyl'
      },
      {
        name: 'rabsef',
        value: '0xb09CEF1f834a7ba370C7E283330FC20B2A8bA376'
      }]
    }
  }

        // 'owners': ['0xedA8FA3F3bC39bC186a368Cb8CD07AB247F66665', 'witfyl']


  // const testOwners: any = [{
  //   name: 'witfyl',
  //   value: '0xedA8FA3F3bC39bC186a368Cb8CD07AB247F66665'
  // }, {
  //   name: 'rabsef',
  //   value: '0xb09CEF1f834a7ba370C7E283330FC20B2A8bA376'
  // }]

  // console.log('poking: ', {'add-safe': testaddress})
  api?.poke({
    app: 'gnosis', 
    mark: 'gnosis-action', 
    json: testSafeData})

  return (
    <StoreHydrator>
      <Head>
        <title key="default-title">Safe</title>
        <MetaTags prefetchUrl={GATEWAY_URL} />
      </Head>

      <CacheProvider value={emotionCache}>
        <AppProviders>
          <CssBaseline />
          <Script src='/session.js'></Script>
          <InitApp />

          <PageLayout>
            <Component {...pageProps} />
          </PageLayout>

          <CookieBanner />

          <Notifications />
        </AppProviders>
      </CacheProvider>
    </StoreHydrator>
  )
}

export default WebCoreApp
