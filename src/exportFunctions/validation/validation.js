export function validateFields(formFields) {
  let isFormValid = true;

  Object.keys(formFields).some(
    (name) =>
      (isFormValid =
        formFields[name].type !== "color" &&
        formFields[name].value.trim() !== "")
  );

  return isFormValid;
}
