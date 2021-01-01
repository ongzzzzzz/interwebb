import Head from 'next/head'
import Link from 'next/link'

import Date from '../components/date'
import Layout, { siteTitle, name } from '../components/layout'

import utilStyles from '../styles/utils.module.css'
import styles from '../styles/Home.module.css'

import { getSortedPostsData } from '../lib/posts'

import { useEffect } from 'react'

export default function Home({ allPostsData }) {

  useEffect(() => {
    const script = document.createElement('script');
  
    script.src = "https://webring.hackclub.com/public/embed.min.js";
    script.async = true;
  
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    }
  }, []);
  
  return (
    
    <Layout>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteTitle}/>

        <meta name="og:title" content={siteTitle}/>
        <meta property="og:image" content="/images/profile.png"/>
        <meta name="twitter:card" content="summary_large_image"/>
        
      </Head>

      <header className={styles.header}>
        <img
          src="/images/profile.png"
          className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
          alt={name}
        />
        <h1 className={utilStyles.heading2Xl}>{name}</h1>
      </header>
      
      <section className={utilStyles.headingMd}>
        <h2>this site is under construction 👀</h2>
        <h4>it's scaffolded from the starter nextjs app - i'm  still learning it!</h4>
      </section>

      <div id="webring-wrapper" className={styles.webringcontainer}>
        <a href="https://webring.hackclub.com/" id="previousBtn" className="webring-anchor" title="Previous">‹</a>
        <a href="https://webring.hackclub.com/" className="webring-logo" title="Hack Club Webring" alt="Hack Club Webring"></a>
        <a href="https://webring.hackclub.com/" id="nextBtn" className="webring-anchor" title="Next">›</a>
        {/* <script src="https://webring.hackclub.com/public/embed.min.js"></script> */}
      </div>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
    
    
  )
}

export async function getStaticProps() {
  const allPostsData = await getSortedPostsData().catch(err => console.error(err));
  return {
    props: {
      allPostsData,
    },
    revalidate: 1,
  }
}