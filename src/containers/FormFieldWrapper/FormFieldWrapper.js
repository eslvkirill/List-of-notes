import React from "react";
import "./FormFieldWrapper.scss";

const FormFieldWrapper = (props) => (
  <div className="form-items__wrapper">{props.children}</div>
);

export default FormFieldWrapper;
