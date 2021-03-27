import React from "react";
import "./Button.scss";

const Button = (props) => (
  <button
    onClick={props.onClick}
    type={props.type}
    className={[
      props.className,
      "button",
      `${props.disabled !== undefined ? "_disabled_" + props.disabled : null}`,
    ].join(" ")}
    disabled={props.disabled}
  >
    {props.children}
  </button>
);

export default Button;
