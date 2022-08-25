import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import FeaturedPosts from "../components/home-page/featured-posts";
import Hero from "../components/home-page/hero";
import { PostData } from "../lib/data.models";
import { getFeaturedPosts } from "../lib/posts-util";

interface Props{
  posts: PostData[]
}

const HomePage: NextPage = ({posts}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
};

export const getStaticProps: GetStaticProps = () => {
  const featuredPosts = getFeaturedPosts();

  return { props: { posts: featuredPosts } };
}

export default HomePage;
//1) Hero Page
//2) Featured Posts
