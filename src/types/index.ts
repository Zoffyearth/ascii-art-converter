export type FileType = 'image' | 'gif' | 'video';

export type ColorMode = 'grayscale' | 'color' | 'inverted';

export type ExportFormat = 'txt' | 'png' | 'html' | 'gif' | 'webm';

export interface FileInfo {
  name: string;
  size: number;
  type: FileType;
  duration?: number;
  frameCount?: number;
  width?: number;
  height?: number;
}

export interface FileState {
  file: File | null;
  fileType: FileType | null;
  fileInfo: FileInfo | null;
  previewUrl: string | null;
  isProcessing: boolean;
  error: string | null;
}

export interface ConfigState {
  characterSet: string;
  customCharacterSet: string;
  width: number;
  maintainAspectRatio: boolean;
  colorMode: ColorMode;
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  fps: number;
  frameInterval: number;
}

export interface PreviewState {
  asciiFrames: AsciiFrame[];
  currentFrameIndex: number;
  isPlaying: boolean;
  conversionProgress: number;
  isConverting: boolean;
  zoomLevel: number;
  isFullscreen: boolean;
}

export interface ColoredChar {
  char: string;
  color: string;
}

export interface AsciiFrame {
  text: string;
  timestamp?: number;
  coloredChars?: ColoredChar[];
}

export interface CharacterSetOption {
  name: string;
  value: string;
  description: string;
}

export const CHARACTER_SETS: CharacterSetOption[] = [
  {
    name: '标准ASCII',
    value: ' .:-=+*#%@',
    description: '经典字符集，适合一般图片',
  },
  {
    name: '增强字符集',
    value: " .'\":;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",
    description: '更多细节，适合高分辨率',
  },
  {
    name: '简约字符集',
    value: ' .oO@',
    description: '简洁风格，适合艺术效果',
  },
  {
    name: '方块字符',
    value: ' ░▒▓█',
    description: '块状效果，现代感强',
  },
  {
    name: '自定义',
    value: 'custom',
    description: '使用自定义字符',
  },
];

export const FILE_CONSTRAINTS = {
  maxSize: 100 * 1024 * 1024,
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp'],
  allowedVideoTypes: ['video/mp4', 'video/webm', 'video/avi', 'video/quicktime'],
};
