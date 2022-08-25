import React from "react";
import Link from "next/link";
import Logo from "./logo";
import classes from "./main-navigation.module.css";

const MainNavigation: React.FC = () => {
  return (
    <header className={classes.header}>
      <Link href='/'>
        {/* link does not render an anchor tag if you pass anything other than plain text into it therefore you must supply your own link will pass the href to the anchor tag for you*/}
        <a>
          <Logo />
        </a>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href='/posts'>Posts</Link>
          </li>
          <li>
            <Link href='/contact'>Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
