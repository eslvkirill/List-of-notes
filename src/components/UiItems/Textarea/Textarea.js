import React from "react";
import FormFieldWrapper from "../../../containers/FormFieldWrapper/FormFieldWrapper";
import "./Textarea.scss";

const Textarea = (props) => (
  <FormFieldWrapper>
    <textarea
      placeholder={props.placeholder}
      value={props.value}
      autoComplete={props.autoComplete}
      disabled={props.disabled}
      className={[props.className, "textarea"].join(" ")}
      onChange={props.onChange}
    >
      {props.children}
    </textarea>
  </FormFieldWrapper>
);

export default Textarea;
