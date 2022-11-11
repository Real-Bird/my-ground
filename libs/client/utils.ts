export function cls(...classnames: string[]) {
  return classnames.join(" ");
}

export function randomColor() {
  const colorList = [
    "Slate",
    "Gray",
    "Zinc",
    "Neutral",
    "Stone",
    "Red",
    "Orange",
    "Amber",
    "Yellow",
    "Lime",
    "Green",
    "Emerald",
    "Teal",
    "Cyan",
    "Sky",
    "Blue",
    "Indigo",
    "Violet",
    "Purple",
    "Fuchsia",
    "Pink",
    "Rose",
  ];
  return colorList[Math.floor(Math.random() * colorList.length)].toLowerCase();
}

export function randomChroma() {
  const chromaList = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  return chromaList[Math.floor(Math.random() * chromaList.length)].toString();
}
