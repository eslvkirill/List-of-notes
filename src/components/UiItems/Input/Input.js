import React from "react";
import FormFieldWrapper from "../../../containers/FormFieldWrapper/FormFieldWrapper";
import "./Input.scss";

const Input = (props) => (
  <FormFieldWrapper>
    <input
      type={props.type}
      value={props.value}
      placeholder={props.placeholder}
      disabled={props.disabled}
      autoComplete={props.autoComplete}
      className={[props.className, "form-field__input, input"].join(" ")}
      onChange={props.onChange}
    >
      {props.children}
    </input>
  </FormFieldWrapper>
);

export default Input;
