import Head from 'next/head'
import Link from 'next/link'

import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

import { getSortedPostsData } from '../lib/posts'
import { addLike } from '../lib/stats'

import { Button } from '@geist-ui/react'

export default function Home({ allPostsData }) {

  // function clickedLike(){
  //   //use state, removeLike if toggleed
  //   addLike("blog-update");
  // }
  
  return (
    
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteTitle}/>

        <meta name="og:title" content={siteTitle}/>
        <meta property="og:image" content="/images/profile.png"/>
        <meta name="twitter:card" content="summary_large_image"/>
        
      </Head>
      
      <section className={utilStyles.headingMd}>
        <h2>this site is under construction 👀</h2>
        <h4>it's scaffolded from the starter nextjs app - i'm  still learning it!</h4>
      </section>

      {/* <Button onClick={clickedLike()}>add firebase</Button> */}

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
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
      
    }
  }
}