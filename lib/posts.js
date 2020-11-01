import React from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import unified from 'unified'
import remarkParse from 'remark-parse'
import remarkMath from 'remark-math'
// import remarkHtmlKatex from 'remark-html-katex'

import remarkRehype from 'remark-rehype'
import rehypeKatex from 'rehype-katex'

import mdxPrism from 'mdx-prism'
import rehypeStringify from 'rehype-stringify'

import rehype2react from "rehype-react";


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
  
  // var contentHtml;
  const processor = unified()
    .use(remarkParse)    
    // .use(remarkHtmlKatex)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(mdxPrism)
    .use(rehypeStringify, {
      quoteSmart: true,
      closeSelfClosing: true,
      omitOptionalTags: true,
      entities: {useShortestReferences: true}
    });

    // .use(html)
    // .process(matterResult.content, function (err, file) {
    //   if (err) throw err
    //   contentHtml = String(file)
    //   // console.log(String(file))
    // });

    var contentHtml = processor.processSync(matterResult.content).contents
    console.log(contentHtml)

  // const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}