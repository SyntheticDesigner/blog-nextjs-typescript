import React from "react";
import PostsGrid from "../posts/post-grid";
import { Post } from "../posts/post.model";
import classes from "./featured-posts.module.css";

interface Props {
  posts: Post[];
}

const FeaturedPosts = ({ posts }: Props) => {
  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={posts} />
    </section>
  );
};

export default FeaturedPosts;
