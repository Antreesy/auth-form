import React from "react";
import { Header } from "../Header";

import c from "./layout.module.scss"

interface IProps {
  children?: JSX.Element[];
}

const Layout = (props: IProps) => {
  return (
    <div className={c.container}>
      <Header />
      {props.children}
    </div>
  );
}

export {Layout}