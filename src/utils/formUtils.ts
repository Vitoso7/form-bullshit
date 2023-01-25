export const unmask = (value: any) => {
  return value.replace(/[^\d]/g, "");
};
