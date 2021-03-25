export function validate(value, validation = null) {
  if (!validation) {
    return true;
  }

  let isValid = true;

  if (validation.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (validation.minLength) {
    isValid = value.length >= validation.minLength && isValid;
  }

  if (validation.maxLength) {
    isValid = value.length <= validation.maxLength && isValid;
  }

  return isValid;
}

export function validateFields(formFields) {
  let isFormValid = true;

  Object.keys(formFields).some(
    (name) =>
      (isFormValid =
        formFields[name].type !== "color" &&
        formFields[name].value !== "" &&
        formFields[name].value.trim() !== "")
  );

  return isFormValid;
}

export function isInvalid({ valid }) {
  return !valid;
}
