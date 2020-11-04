import { useState } from 'react'
import { GeistProvider, CssBaseline } from '@geist-ui/react'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
library.add(fas, fab, far)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'

import firebase from '../lib/firebase'

import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
  const [themeType, setThemeType] = useState('dark')
  const switchThemes = () => {
    setThemeType(lastThemeType => (lastThemeType === 'dark' ? 'light' : 'dark'))
  }

  return (
    <GeistProvider theme={{ type: themeType }}>
      <CssBaseline />
      <Header>
        <FontAwesomeIcon 
          icon={themeType === 'dark' ? ['fas', 'sun'] : ['fas', 'moon']} 
          onMouseUp={switchThemes} 
          className={themeType === 'dark' ? 'icon icon-dark sun' : 'icon icon-light moon'}
        />
      </Header>
      <Component {...pageProps} />
    </GeistProvider>
  )
}