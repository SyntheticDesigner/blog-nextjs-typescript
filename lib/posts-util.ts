import fs from "fs";
import path from "path";

import matter from "gray-matter";
//gray-matter is a package that lets us separate meta data from the content after we read the markdown files
const postsDirectory = path.join(process.cwd(), "posts");
//create a absolute path to the post mark down files

export function getPostFiles() {
  return fs.readdirSync(postsDirectory);
}

interface metaData {
  title: string;
  date: string;
  image: string;
  excerpt: string;
  isFeatured: boolean;
}

export function getPostData(postIdentifier: string) {
  const postSlug = postIdentifier.replace(/\.md$/, ""); //removes file extension
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  //matter returns an object with two properties, data with an object with the meta data, content which contains the markdown as a string
  const postData = {
    slug: postSlug,
    ...(data as metaData),
    content,
  };
  return postData;
}

export function getAllPosts() {
  const postFiles = getPostFiles();
  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );
  return sortedPosts;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter((post) => post.isFeatured);
  return featuredPosts;
}
