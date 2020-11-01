import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'

import unified from 'unified'
import markdown from 'remark-parse'
import math from 'remark-math'
import htmlKatex from 'remark-html-katex'
import html from 'remark-html'

//https://github.com/remarkjs/remark-math/tree/main/packages/remark-html-katex 
//https://theme-next.js.org/docs/third-party-services/math-equations
//https://strapi.io/documentation/3.0.0-beta.x/content-api/api-endpoints.html#endpoints
//https://mdxjs.com/guides/math-blocks
//https://levelup.gitconnected.com/adding-katex-and-markdown-in-react-7b70694004ef

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

    // Use gray-matter to parse the post metadata section
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
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
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

  // Use remark to convert markdown into HTML string
  // const processedContent = await remark()
  //   .use(html)
  
  var contentHtml
  unified()
    .use(markdown)
    .use(math)
    // .use(htmlKatex)
    .use(html)
    .process(matterResult.content, function (err, file) {
      if (err) throw err
      contentHtml = String(file)
      // console.log(String(file))
  })

  // const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}