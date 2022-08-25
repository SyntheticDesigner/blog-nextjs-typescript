import ReactMarkdown, { Components } from "react-markdown";
import React from "react";
import PostHeader from "./post-header";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";

import classes from "./post-content.module.css";
import { PostData } from "../../../lib/data.models";
import Image from "next/image";

SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("css", css);

const DUMMY_POST = {
  slug: "getting-started-with-nextjs4",
  title: "Getting Started with NextJS",
  image: "getting-started-nextjs.png",
  date: "2022-08-23",
  content: "# This is a first post",
};

interface Props {
  post: PostData;
}

interface MarkdownElement {
  type: string;
  tagName?: string;
  properties?: Object & { src: string; alt: string };
}

const PostContent = ({ post }: Props) => {
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const components: Components = {
    p(paragraph) {
      const { node } = paragraph;
      const element: MarkdownElement = JSON.parse(
        JSON.stringify(node.children[0])
      );
      if (element.tagName === "img") {
        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${element.properties!.src}`}
              alt={element.properties!.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }
      return <p>{paragraph.children}</p>;
    },
    code(code) {
      console.log(code);
      const { className, children } = code;
      const language = className!.split("-")[1];
      let retypedChildren: string[] = JSON.parse(JSON.stringify(children));
      return (
        <SyntaxHighlighter style={atomDark} language={language}>
          {retypedChildren}
        </SyntaxHighlighter>
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={components}>{post.content}</ReactMarkdown>
    </article>
  );
};

export default PostContent;
