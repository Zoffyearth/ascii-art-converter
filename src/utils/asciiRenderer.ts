import { ColorMode } from '../types';

export interface RenderOptions {
  width: number;
  characterSet: string;
  colorMode: ColorMode;
}

const CHAR_ASPECT_RATIO = 0.5;

export const calculateBrightness = (r: number, g: number, b: number): number => {
  return 0.299 * r + 0.587 * g + 0.114 * b;
};

export const mapBrightnessToChar = (brightness: number, charset: string): string => {
  const index = Math.floor((brightness / 255) * (charset.length - 1));
  return charset[Math.max(0, Math.min(index, charset.length - 1))];
};

export const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (n: number) => {
    const hex = Math.max(0, Math.min(255, Math.round(n))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const renderAscii = (
  imageData: ImageData,
  options: RenderOptions
): { text: string; coloredChars?: Array<{ char: string; color: string }> } => {
  const { width, characterSet, colorMode } = options;
  const { data, width: imgWidth, height: imgHeight } = imageData;
  
  const charWidth = Math.max(1, Math.floor(imgWidth / width));
  const charHeight = Math.max(1, Math.floor(charWidth / CHAR_ASPECT_RATIO));
  
  let result = '';
  const coloredChars: Array<{ char: string; color: string }> = [];
  
  for (let y = 0; y < imgHeight; y += charHeight) {
    let row = '';
    for (let x = 0; x < imgWidth; x += charWidth) {
      let totalBrightness = 0;
      let totalR = 0;
      let totalG = 0;
      let totalB = 0;
      let pixelCount = 0;
      
      for (let dy = 0; dy < charHeight && y + dy < imgHeight; dy++) {
        for (let dx = 0; dx < charWidth && x + dx < imgWidth; dx++) {
          const idx = ((y + dy) * imgWidth + (x + dx)) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          
          totalR += r;
          totalG += g;
          totalB += b;
          totalBrightness += calculateBrightness(r, g, b);
          pixelCount++;
        }
      }
      
      const avgBrightness = pixelCount > 0 ? totalBrightness / pixelCount : 0;
      const avgR = pixelCount > 0 ? totalR / pixelCount : 0;
      const avgG = pixelCount > 0 ? totalG / pixelCount : 0;
      const avgB = pixelCount > 0 ? totalB / pixelCount : 0;
      
      let char: string;
      
      if (colorMode === 'inverted') {
        const invertedBrightness = 255 - avgBrightness;
        char = mapBrightnessToChar(invertedBrightness, characterSet);
      } else {
        char = mapBrightnessToChar(avgBrightness, characterSet);
      }
      
      if (colorMode === 'color') {
        coloredChars.push({
          char,
          color: rgbToHex(avgR, avgG, avgB),
        });
      } else {
        coloredChars.push({
          char,
          color: colorMode === 'inverted' ? '#00ff9f' : '#e2e8f0',
        });
      }
      
      row += char;
    }
    result += row + '\n';
  }
  
  return { text: result, coloredChars };
};

export const renderAsciiColored = (
  coloredChars: Array<{ char: string; color: string }>,
  width: number
): string => {
  let result = '';
  for (let i = 0; i < coloredChars.length; i++) {
    result += coloredChars[i].char;
    if ((i + 1) % width === 0) {
      result += '\n';
    }
  }
  return result;
};

export const getHtmlForColoredAscii = (
  coloredChars: Array<{ char: string; color: string }>,
  width: number
): string => {
  let html = '<div style="font-family: monospace; font-size: 10px; line-height: 1; letter-spacing: 0; white-space: pre;">';
  
  for (let i = 0; i < coloredChars.length; i++) {
    const { char, color } = coloredChars[i];
    const displayChar = char === ' ' ? '&nbsp;' : char;
    html += `<span style="color: ${color};">${displayChar}</span>`;
    if ((i + 1) % width === 0) {
      html += '<br>';
    }
  }
  
  html += '</div>';
  return html;
};
