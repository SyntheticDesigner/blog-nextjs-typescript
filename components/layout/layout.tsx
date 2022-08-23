import React, { ReactNode } from "react";
import MainNavigation from "./main-navigation";
const Layout: React.FC<{ children: ReactNode }> = (props) => {
  return (
    <>
      <MainNavigation />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
