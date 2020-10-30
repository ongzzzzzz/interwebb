import React, { useState } from 'react'
import { GeistProvider, CssBaseline, Button } from '@geist-ui/react'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  const [themeType, setThemeType] = useState('dark')
  const switchThemes = () => {
    setThemeType(lastThemeType => (lastThemeType === 'dark' ? 'light' : 'dark'))
  }

  return (
    <GeistProvider theme={{ type: themeType }}>
      <CssBaseline />
      <Button onClick={switchThemes}>Toggle</Button>
      <Component {...pageProps} />
    </GeistProvider>
  )
}

export default MyApp
