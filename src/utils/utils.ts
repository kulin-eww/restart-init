// utils/getTailwindColor.js
export function getTailwindColor(variableName) {
  return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
}
