const colorInputDefaultValue = "#e9e4eb";

export function createNewFormFields(placeholder, type = "text", value = "") {
  return { autoComplete: "off", placeholder, type, value };
}

export function formFields() {
  return {
    title: createNewFormFields("Введите заголовок"),
    color: createNewFormFields("Цвет заметки", "color", colorInputDefaultValue),
    description: createNewFormFields("Текст заметки"),
  };
}
