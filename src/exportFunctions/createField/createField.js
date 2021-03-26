const colorInputDefaultValue = "#e9e4eb";

export function createField(config, validation) {
  return {
    ...config,
    validation,
    valid: !validation,
    autoComplete: "off",
  };
}

export function createNewFormFields(placeholder, type = "text", value = "") {
  return createField({ placeholder, type, value }, { required: true });
}

export function formFields() {
  return {
    title: createNewFormFields("Введите заголовок"),
    color: createNewFormFields("Цвет заметки", "color", colorInputDefaultValue),
    description: createNewFormFields("Текст заметки"),
  };
}
