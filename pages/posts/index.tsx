import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/posts-util";

const AllPostsPage: NextPage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <AllPosts posts={posts} />;
};

export const getStaticProps: GetStaticProps = () => {
  const allPosts = getAllPosts();
  return {
    props: {
      posts: allPosts,
    },
  };
};

export default AllPostsPage;
