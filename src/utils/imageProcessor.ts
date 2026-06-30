export const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

export const getImageData = (img: HTMLImageElement, canvas: HTMLCanvasElement): ImageData => {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('无法获取Canvas上下文');
  }
  
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
  
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
};

export const applyAdjustments = (
  imageData: ImageData,
  brightness: number,
  contrast: number,
  saturation: number,
  _blur: number
): ImageData => {
  const data = imageData.data;
  
  const brightnessFactor = brightness / 100;
  const contrastFactor = (contrast + 100) / 100;
  const saturationFactor = (saturation + 100) / 100;
  
  for (let i = 0; i < data.length; i += 4) {
    let r = data[i];
    let g = data[i + 1];
    let b = data[i + 2];
    
    r = r + brightnessFactor * 255;
    r = ((r - 128) * contrastFactor) + 128;
    
    g = g + brightnessFactor * 255;
    g = ((g - 128) * contrastFactor) + 128;
    
    b = b + brightnessFactor * 255;
    b = ((b - 128) * contrastFactor) + 128;
    
    if (saturationFactor !== 1) {
      const gray = 0.2989 * r + 0.5870 * g + 0.1140 * b;
      r = gray + saturationFactor * (r - gray);
      g = gray + saturationFactor * (g - gray);
      b = gray + saturationFactor * (b - gray);
    }
    
    data[i] = Math.max(0, Math.min(255, r));
    data[i + 1] = Math.max(0, Math.min(255, g));
    data[i + 2] = Math.max(0, Math.min(255, b));
  }
  
  return imageData;
};
