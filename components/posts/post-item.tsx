import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import classes from "./post-item.module.css";
import { Post } from "./post.model";

interface Props {
  post: Post;
}

const PostItem = ({ post }: Props) => {
  const { title, image, excerpt, date, slug } = post;
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  };
  //have to specify the timezone to prevent hydration errors
  const formattedDate = new Date(date).toLocaleDateString("en-US", options);
  const imagePath = `/images/posts/${slug}/${image}`;
  const linkPath = `/posts/${slug}`;

  return (
    <li className={classes.post}>
      <Link href={linkPath}>
        <a href=''>
          <div className={classes.image}>
            <Image
              src={imagePath}
              alt={title}
              width={300}
              height={200}
              layout='responsive'
            />
          </div>
          <div className={classes.content}>
            <h3>{title}</h3>
            <time>{formattedDate}</time>
            <p>{excerpt}</p>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default PostItem;
