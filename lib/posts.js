import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import unified from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import mdxPrism from 'mdx-prism'
import rehypeStringify from 'rehype-stringify'

import firebase from './firebase'
import { bucket } from './firebaseAdmin'

const db = firebase.firestore();

const postsDirectory = path.join(process.cwd(), 'posts')



async function downloadFile(filename, destination) {
  const options = {
    // The path to which the file should be downloaded, e.g. "./file.txt"
    destination: destination,
  };
  // Downloads the file
  await bucket.file(filename).download(options);

  console.log(`${filename} downloaded to ${destination}`);
  
  // let fileContents = fs.readFileSync(destination, 'utf8');
  // console.log({fileContents});
	
	return;
}

function readFile(destination) {
  let fileContents = fs.readFileSync(destination, 'utf8');
  return fileContents;
}



export async function getSortedPostsData() {
  // Get file names under /posts
	// const fileNames = fs.readdirSync(postsDirectory);

	const [files] = await bucket.getFiles({ prefix: "posts/" });
	// console.log(files);
	files.shift();

	const allPostsData = await Promise.all(
    files.map(async file => {
      // Remove "posts%2F<name>.md" from file name to get id
      const MDfile = file.id.replace('posts%2F', '');
      const id = MDfile.replace(/\.md$/, '');

      await db.collection('blogs').doc(id).get()
        .then((docSnapshot) => {
          if (!docSnapshot.exists) {
            db.collection('blogs').doc(id).set({
              reads: 0,
              likes: 0,
              comments: []
            }, { merge: true });
            console.log("I created a new Firebase doc!! :D")
          }
      });

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, `${id}.md`)

      //get cloud storage 'posts/id.md' to fullPath
      let fileContents = await downloadFile(`posts/${id}.md`, fullPath).then(() => readFile(fullPath))

      // let fileContents = fs.readFileSync(fullPath, 'utf8')
      let matterResult = matter(fileContents)

      console.log(matterResult.data)
      
      matterResult.data = Object.keys(matterResult.data).length ?	matterResult.data 
      : { title: "Loading...", date:"2020-02-20" }

      // Combine the data with the id
      console.log(matterResult.data)
      return {
        id,
        ...matterResult.data
      }
    })
  )

  let realPosts = allPostsData;
	console.log({realPosts})
	
	// Sort posts by date
  return realPosts.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}



export async function getAllPostIds() {
	// const fileNames = fs.readdirSync(postsDirectory)
	const [files] = await bucket.getFiles({ prefix: "posts/" });
	// console.log(files);
	files.shift();

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
  return files.map(file => {
		const MDfile = file.id.replace('posts%2F', '');
		const id = MDfile.replace(/\.md$/, '');
    return {
      params: {
        id
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