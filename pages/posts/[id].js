import Head from 'next/head'
import Layout from '../../components/layout'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { getAllPostIds, getPostData } from '../../lib/posts'

export default function Post({ postData }) {
    const uri = postData.title
                .replace(/[^\w\s]|_/g, "")
                .replace(/\s+/g, " ")
                .toLowerCase()
                .replace(" ", "-");
    // console.log(uri)
    return (
        <Layout>
            <Head>
                {/* <!-- Primary Meta Tags --> */}
                <title>{postData.title}</title>
                <meta name="title" content={postData.title}/>
                <meta name="description" content={postData.date}/>

                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website"/>
                <meta property="og:url" content={`https://ongzz.me/posts/${uri}`}/>
                <meta property="og:title" content={postData.title}/>
                <meta property="og:description" content={postData.date}/>
                <meta property="og:image" content="../../public/images/profile.png"/>

                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:url" content={`https://ongzz.me/posts/${uri}`}/>
                <meta property="twitter:title" content={postData.title}/>
                <meta property="twitter:description" content={postData.date}/>
                <meta property="twitter:image" content="../../public/images/profile.png"/>

                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.16.0/themes/prism-okaidia.min.css"
                    integrity="sha256-Ykz0nNWK7w4QWJUYR7OraN4773aMB/11aMt1nZyrhuQ="
                    crossOrigin="anonymous"
                />
                <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
                <script id="MathJax-script" async
                        src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
                </script>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
                {/* <div>{postData.contentHtml}</div> */}
            </article>
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
        paths, 
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}