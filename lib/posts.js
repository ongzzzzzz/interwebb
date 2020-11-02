import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import unified from 'unified'
import remarkParse from 'remark-parse'
// import remarkMath from 'remark-math'
// import remarkHtmlKatex from 'remark-html-katex'

import remarkRehype from 'remark-rehype'
// import rehypeKatex from 'rehype-katex'

import mdxPrism from 'mdx-prism'
import rehypeStringify from 'rehype-stringify'


const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse metadata 
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'post1'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'post2'
  //     }
  //   }
  // ]
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Convert markdown into HTML string
  const processor = unified()
    .use(remarkParse)    
    // .use(remarkMath)

    .use(remarkRehype)
    // .use(rehypeKatex)
    .use(mdxPrism)
    .use(rehypeStringify, {
      quoteSmart: true,
      closeSelfClosing: true,
      omitOptionalTags: true,
      entities: {useShortestReferences: true}
    });

    var contentHtml = processor.processSync(matterResult.content).contents
    // console.log(contentHtml)

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}

//holy shit try this one out
// https://www.npmjs.com/package/react-markdown-plus
//https://www.google.com/search?q=reactmarkdown+katex&oq=reactmarkdown+katex&aqs=chrome..69i57.3288j0j1&sourceid=chrome&ie=UTF-8

//https://theme-next.js.org/docs/third-party-services/math-equations
//https://strapi.io/documentation/3.0.0-beta.x/content-api/api-endpoints.html#endpoints
//https://mdxjs.com/guides/math-blocks
//https://levelup.gitconnected.com/adding-katex-and-markdown-in-react-7b70694004ef