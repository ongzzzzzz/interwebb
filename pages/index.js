import Head from 'next/head'
import Link from 'next/link'

import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

import { getSortedPostsData } from '../lib/posts'

//https://developer.spotify.com/documentation/web-api/reference/player/get-the-users-currently-playing-track/
//https://benwiz.com/blog/create-spotify-refresh-token/
//unrelated but
//https://spotify-api-graphql-console.herokuapp.com/
//https://medium.com/french-make-beautiful/graphql-on-top-of-spotify-api-9fd6b771f2ce

export default function Home({ allPostsData }) {
  
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
    revalidate: 1
  }
}