import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostFiles } from "../../lib/posts-util";

const PostDetailPage: NextPage = ({
  post,
}: InferGetStaticPropsType<GetStaticProps>) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>\
        <meta name='description' content={post.excerpt} />
      </Head>
      <PostContent post={post} />
    </>
  );
};

interface SlugParam extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps = (context) => {
  const { slug } = context.params as SlugParam;
  const postData = getPostData(slug);
  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const postFilenames = getPostFiles();
  const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ""));
  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
};

export default PostDetailPage;
