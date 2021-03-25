import React from "react";
import "./Layout.scss";

const Layout = (props) => (
  <div className="layout">
    <div className="content">{props.children}</div>
  </div>
);

export default Layout;
