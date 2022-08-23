/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";

import classes from "./hero.module.css";

export default function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}><Image src="/images/site/fat-gaming-hippo.jpg" alt="An image showing Andrew" width={300} height={300}></Image></div>
      <h1>Hi, I'm Andrew</h1>
      <p>I blog about tech and web and game development and technologies</p>
    </section>
  );
}
