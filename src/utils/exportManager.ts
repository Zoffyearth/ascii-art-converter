import { ExportFormat, AsciiFrame } from '../types';
import { GifWriter } from 'omggif';

export const exportAsText = (frames: AsciiFrame[], filename: string = 'ascii-art'): void => {
  const content = frames.map((f, i) => 
    frames.length > 1 ? `=== Frame ${i + 1} ===\n${f.text}` : f.text
  ).join('\n\n');
  
  downloadFile(content, `${filename}.txt`, 'text/plain');
};

export const exportAsHtml = (
  frames: AsciiFrame[],
  _width: number,
  _colorMode: string,
  filename: string = 'ascii-art'
): void => {
  const htmlContent = generateHtmlTemplate(frames);
  downloadFile(htmlContent, `${filename}.html`, 'text/html');
};

const generateHtmlTemplate = (frames: AsciiFrame[]): string => {
  const framesJson = JSON.stringify(frames);
  const totalFrames = frames.length;
  
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ASCII Art - ${new Date().toLocaleDateString()}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #0a0e14;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px;
      font-family: 'Courier New', monospace;
    }
    .container {
      text-align: center;
      width: 100%;
      max-width: 900px;
    }
    pre {
      font-family: 'Courier New', monospace;
      font-size: 6px;
      line-height: 1;
      letter-spacing: 0;
      white-space: pre;
      color: #e2e8f0;
      background: #0a0e14;
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #00ff9f;
      display: inline-block;
      box-shadow: 0 0 20px rgba(0, 255, 159, 0.1);
      margin-bottom: 20px;
    }
    .controls {
      margin-top: 20px;
      color: #00ff9f;
      background: rgba(0, 255, 159, 0.05);
      padding: 15px;
      border-radius: 8px;
      border: 1px solid rgba(0, 255, 159, 0.2);
    }
    .control-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-bottom: 10px;
    }
    .control-row:last-child {
      margin-bottom: 0;
    }
    button {
      background: #00ff9f;
      color: #0a0e14;
      border: none;
      padding: 8px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-family: inherit;
      font-size: 14px;
      transition: all 0.2s;
    }
    button:hover {
      opacity: 0.8;
      transform: scale(1.05);
    }
    button:active {
      transform: scale(0.95);
    }
    button.skip {
      background: transparent;
      color: #00ff9f;
      border: 1px solid #00ff9f;
      padding: 8px 16px;
      font-size: 16px;
    }
    button.play-pause {
      background: #00ff9f;
      color: #0a0e14;
      font-size: 20px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .speed-control {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .speed-btn {
      background: transparent;
      color: #00ff9f;
      border: 1px solid #00ff9f;
      padding: 4px 10px;
      font-size: 12px;
      min-width: 40px;
    }
    .speed-btn.active {
      background: #00ff9f;
      color: #0a0e14;
    }
    input[type="range"] {
      -webkit-appearance: none;
      width: 200px;
      height: 4px;
      background: rgba(0, 255, 159, 0.3);
      border-radius: 2px;
      outline: none;
    }
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 14px;
      height: 14px;
      background: #00ff9f;
      border-radius: 50%;
      cursor: pointer;
    }
    .info {
      color: #666;
      font-size: 12px;
      margin-top: 15px;
    }
    .title {
      color: #00ff9f;
      font-size: 24px;
      margin-bottom: 20px;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="title">✨ ASCII Art Animation</div>
    <pre id="ascii-display"></pre>
    <div class="controls">
      <div class="control-row">
        <button class="skip" onclick="prevFrame()" title="上一帧">◀</button>
        <button class="play-pause" id="playBtn" onclick="togglePlay()">▶</button>
        <button class="skip" onclick="nextFrame()" title="下一帧">▶</button>
        <button class="skip" onclick="goToStart()" title="回到开始">⏮</button>
        <button class="skip" onclick="goToEnd()" title="跳到结尾">⏭</button>
      </div>
      <div class="control-row">
        <span id="frame-counter">帧: 1/${totalFrames}</span>
        <input type="range" id="frame-slider" min="0" max="${totalFrames - 1}" value="0" onchange="seekToFrame(this.value)">
      </div>
      <div class="control-row speed-control">
        <span>播放速度:</span>
        <button class="speed-btn" onclick="setSpeed(0.5)">0.5x</button>
        <button class="speed-btn active" onclick="setSpeed(1)">1x</button>
        <button class="speed-btn" onclick="setSpeed(1.5)">1.5x</button>
        <button class="speed-btn" onclick="setSpeed(2)">2x</button>
      </div>
    </div>
    <div class="info">
     共 ${totalFrames} 帧 | 使用 ↑↓ 或点击按钮控制 | 空格键暂停/播放
    </div>
  </div>
  
  <script>
    const frames = ${framesJson};
    let currentFrame = 0;
    let isPlaying = false;
    let interval;
    let baseDelay = 100;
    let speed = 1;
    
    const display = document.getElementById('ascii-display');
    const counter = document.getElementById('frame-counter');
    const playBtn = document.getElementById('playBtn');
    const slider = document.getElementById('frame-slider');
    
    function updateDisplay() {
      display.textContent = frames[currentFrame].text;
      counter.textContent = '帧: ' + (currentFrame + 1) + '/' + frames.length;
      slider.value = currentFrame;
    }
    
    function nextFrame() {
      currentFrame = (currentFrame + 1) % frames.length;
      updateDisplay();
    }
    
    function prevFrame() {
      currentFrame = (currentFrame - 1 + frames.length) % frames.length;
      updateDisplay();
    }
    
    function goToStart() {
      currentFrame = 0;
      updateDisplay();
    }
    
    function goToEnd() {
      currentFrame = frames.length - 1;
      updateDisplay();
    }
    
    function seekToFrame(frameIndex) {
      currentFrame = parseInt(frameIndex);
      updateDisplay();
    }
    
    function togglePlay() {
      isPlaying = !isPlaying;
      playBtn.textContent = isPlaying ? '⏸' : '▶';
      
      if (isPlaying) {
        interval = setInterval(nextFrame, baseDelay / speed);
      } else {
        clearInterval(interval);
        interval = null;
      }
    }
    
    function setSpeed(newSpeed) {
      speed = newSpeed;
      document.querySelectorAll('.speed-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      event.target.classList.add('active');
      
      if (isPlaying) {
        clearInterval(interval);
        interval = setInterval(nextFrame, baseDelay / speed);
      }
    }
    
    document.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'ArrowRight':
          nextFrame();
          break;
        case 'ArrowLeft':
          prevFrame();
          break;
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        case 'Home':
          goToStart();
          break;
        case 'End':
          goToEnd();
          break;
      }
    });
    
    updateDisplay();
  </script>
</body>
</html>`;
};

export const exportAsPng = async (
  frames: AsciiFrame[],
  _width: number,
  _colorMode: string,
  filename: string = 'ascii-art'
): Promise<void> => {
  const frame = frames[0];
  if (!frame) return;
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  const fontSize = 10;
  const lineHeight = fontSize;
  const charWidth = fontSize * 0.6;
  
  const lines = frame.text.split('\n');
  const canvasWidth = Math.max(...lines.map(l => l.length)) * charWidth + 40;
  const canvasHeight = lines.length * lineHeight + 40;
  
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  
  ctx.fillStyle = '#0a0e14';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  
  ctx.font = `${fontSize}px "Courier New", monospace`;
  ctx.textBaseline = 'top';
  
  lines.forEach((line, y) => {
    for (let x = 0; x < line.length; x++) {
      const char = line[x];
      if (char !== ' ') {
        ctx.fillStyle = _colorMode === 'color' ? '#ffffff' : '#e2e8f0';
        ctx.fillText(char, 20 + x * charWidth, 20 + y * lineHeight);
      }
    }
  });
  
  canvas.toBlob((blob) => {
    if (blob) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }, 'image/png');
};

export const exportAsGif = async (
  frames: AsciiFrame[],
  _width: number,
  _colorMode: string,
  filename: string = 'ascii-art'
): Promise<void> => {
  if (frames.length === 0) return;
  
  const frame = frames[0];
  const lines = frame.text.split('\n');
  const maxWidth = Math.max(...lines.map(l => l.length));
  const maxHeight = lines.length;
  
  const fontSize = 10;
  const lineHeight = fontSize;
  const charWidth = fontSize * 0.6;
  
  const canvasWidth = Math.floor(maxWidth * charWidth + 40);
  const canvasHeight = Math.floor(maxHeight * lineHeight + 40);
  
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = canvasWidth;
  tempCanvas.height = canvasHeight;
  const ctx = tempCanvas.getContext('2d');
  
  if (!ctx) {
    console.error('无法创建Canvas上下文');
    alert('GIF生成失败：无法创建Canvas上下文');
    return;
  }
  
  const palette: number[] = [];
  const graySteps = 64;
  for (let i = 0; i < graySteps; i++) {
    const v = Math.floor((i / (graySteps - 1)) * 255);
    palette.push((v << 16) | (v << 8) | v);
  }
  
  const findClosestColor = (r: number, g: number, b: number): number => {
    const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
    const idx = Math.round((gray / 255) * (graySteps - 1));
    return Math.max(0, Math.min(graySteps - 1, idx));
  };
  
  const allIndexedPixels: number[][] = [];
  
  for (let fi = 0; fi < frames.length; fi++) {
    const asciiFrame = frames[fi];
    
    ctx.fillStyle = '#0a0e14';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    ctx.font = `${fontSize}px "Courier New", monospace`;
    ctx.textBaseline = 'top';
    
    const frameLines = asciiFrame.text.split('\n');
    frameLines.forEach((line, y) => {
      for (let x = 0; x < line.length; x++) {
        const char = line[x];
        if (char !== ' ') {
          ctx.fillStyle = _colorMode === 'color' ? '#ffffff' : '#e2e8f0';
          ctx.fillText(char, 20 + x * charWidth, 20 + y * lineHeight);
        }
      }
    });
    
    const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    const indexedPixels: number[] = new Array(canvasWidth * canvasHeight);
    const data = imageData.data;
    
    for (let i = 0, pi = 0; i < data.length; i += 4, pi++) {
      indexedPixels[pi] = findClosestColor(data[i], data[i + 1], data[i + 2]);
    }
    
    allIndexedPixels.push(indexedPixels);
  }
  
  const bufferSize = canvasWidth * canvasHeight * frames.length * 2 + 65536;
  const buffer = new Uint8Array(bufferSize);
  
  const options = {
    palette: palette,
    loop: 0,
  };
  
  const gifWriter = new GifWriter(buffer, canvasWidth, canvasHeight, options);
  
  const frameDelay = Math.max(4, Math.min(20, Math.round(100 / Math.max(frames.length, 5))));
  
  for (let i = 0; i < allIndexedPixels.length; i++) {
    gifWriter.addFrame(0, 0, canvasWidth, canvasHeight, allIndexedPixels[i], {
      delay: frameDelay,
      disposal: 2,
    });
  }
  
  const length = gifWriter.end();
  const gifData = buffer.subarray(0, length);
  downloadFile(gifData, `${filename}.gif`, 'image/gif');
};

const downloadFile = (content: string | Uint8Array, filename: string, mimeType: string): void => {
  const blob = new Blob([content as BlobPart], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const exportFrame = async (
  format: ExportFormat,
  frames: AsciiFrame[],
  width: number,
  colorMode: string,
  filename: string = 'ascii-art'
): Promise<void> => {
  switch (format) {
    case 'txt':
      exportAsText(frames, filename);
      break;
    case 'html':
      exportAsHtml(frames, width, colorMode, filename);
      break;
    case 'png':
      await exportAsPng(frames, width, colorMode, filename);
      break;
    case 'gif':
      await exportAsGif(frames, width, colorMode, filename);
      break;
    default:
      console.warn('不支持的导出格式:', format);
  }
};
