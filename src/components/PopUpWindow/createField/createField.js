export function createField(config, validation) {
  return {
    ...config,
    validation,
    valid: !validation,
    autoComplete: "off",
  };
}
