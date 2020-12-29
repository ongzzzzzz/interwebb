import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Header from './header'
import Footer from './footer'

export const name = 'Ong Zhi Zheng'
export const siteTitle = 'ongzz ✨'

export default function Layout({ children }) {
  return (
    <>
    <div className={styles.container}>
      
      <Head>
        
        {/* <link rel="manifest" href="/manifest.json"/> */}

        <link rel="apple-touch-icon" href="../public/images/profile.png"/>
        <meta name="apple-mobile-web-app-status-bar" content="#FFE1C4"/>
        <meta name="theme-color" content="#FFE1C4"/>
      
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
        <link rel="icon" href="/favicon.ico" type="image/x-icon"/>

      </Head>
      
      <main>{children}</main>
    </div>
    <Footer />
    </>
  )
}