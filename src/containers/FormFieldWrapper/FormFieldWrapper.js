import React from "react";
import "./FormFieldWrapper.scss";

const FormFieldWrapper = (props) => (
  <div className="form-field">{props.children}</div>
);

export default FormFieldWrapper;
