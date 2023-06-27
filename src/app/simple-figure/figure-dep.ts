import {colors} from "../env";

export function convertToColorArray(data: string) {
  if (data.length != 225) {
    return generateRandomData();
  }
  let result: string[][] = [];
  for (let i = 0; i < 15; i++) {
    result.push([]);
    for (let j = 0; j < 15; j++) {
      result[i].push(getColor(data[i * 15 + j]));
    }
  }
  return result;
}


export function getColor(letter: string) {
  const index = letter.charCodeAt(0) - 97;
  if (index >= 0 && index < colors.length) {
    return colors[index];
  } else {
    return "black";
  }
}

export function getLetter(color: string) {
  const index = colors.indexOf(color);
  if (index >= 0 && index < colors.length) {
    return String.fromCharCode(97 + index);
  } else {
    return "a";
  }
}


export function generateRandomData(): string[][] {
  let result: string[][] = [];
  for (let i = 0; i < 15; i++) {
    result.push([]);
    for (let j = 0; j < 15; j++) {
      let random = Math.floor(Math.random() * 26);
      result[i].push(getColor(String.fromCharCode(97 + random)));
    }
  }
  return result;
}
