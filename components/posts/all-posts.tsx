import React from "react";
import classes from "./all-posts.module.css";
import PostsGrid from "./post-grid";
import { Post } from "./post.model";

interface Props {
  posts: Post[];
}

const AllPosts = ({ posts }: Props) => {
  return (
    <section className={classes.posts}>
      <h1>All Posts</h1>
      <PostsGrid posts={posts} />
    </section>
  );
};

export default AllPosts;
