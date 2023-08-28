// scroll bar
import 'simplebar/dist/simplebar.css'
// editor
import 'react-quill/dist/quill.snow.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

// next
import Head from 'next/head'
import { CacheProvider } from '@emotion/react'
import { SettingsProvider } from '@/contexts/SettingsContext'
import { CollapseDrawerProvider } from '@/contexts/CollapseDrawerContext'
import ThemeConfig from '@/theme'
import GlobalStyles from '@/theme/globalStyles'
import createEmotionCache from '@/utils/createEmotionCache'
import RtlLayout from '@/components/RtlLayout'
import ProgressBar from '@/components/ProgressBar'
import LoadingScreen from '@/components/LoadingScreen'
import ThemePrimaryColor from '@/components/ThemePrimaryColor'
import { SessionProvider } from 'next-auth/react'
import '../../styles/global.css'

// ----------------------------------------------------------------------

const clientSideEmotionCache = createEmotionCache()

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <SessionProvider session={pageProps.session}>
      <SettingsProvider>
        <CollapseDrawerProvider>
          <CacheProvider value={emotionCache}>
            <Head>
              <meta
                name="viewport"
                content="initial-scale=1, width=device-width"
              />
            </Head>

            <ThemeConfig>
              <ThemePrimaryColor>
                <RtlLayout>
                  <GlobalStyles />
                  <ProgressBar />
                  <LoadingScreen />
                  <Component {...pageProps} />
                </RtlLayout>
              </ThemePrimaryColor>
            </ThemeConfig>
          </CacheProvider>
        </CollapseDrawerProvider>
      </SettingsProvider>
    </SessionProvider>
  )
}
