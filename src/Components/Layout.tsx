import * as React from "react";
import { Header } from "./Header";

interface IProps {
  children?: JSX.Element;
}

const Layout = (props: IProps) => {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
}

export {Layout}