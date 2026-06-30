import { create } from 'zustand';
import { ConfigState, ColorMode } from '../types';

interface ConfigActions {
  setCharacterSet: (charset: string) => void;
  setCustomCharacterSet: (charset: string) => void;
  setWidth: (width: number) => void;
  setMaintainAspectRatio: (maintain: boolean) => void;
  setColorMode: (mode: ColorMode) => void;
  setBrightness: (value: number) => void;
  setContrast: (value: number) => void;
  setSaturation: (value: number) => void;
  setBlur: (value: number) => void;
  setFps: (fps: number) => void;
  setFrameInterval: (interval: number) => void;
  reset: () => void;
}

const initialState: ConfigState = {
  characterSet: ' .:-=+*#%@',
  customCharacterSet: '',
  width: 100,
  maintainAspectRatio: true,
  colorMode: 'grayscale',
  brightness: 0,
  contrast: 0,
  saturation: 0,
  blur: 0,
  fps: 10,
  frameInterval: 1,
};

export const useConfigStore = create<ConfigState & ConfigActions>((set) => ({
  ...initialState,
  
  setCharacterSet: (characterSet) => set({ characterSet }),
  setCustomCharacterSet: (customCharacterSet) => set({ customCharacterSet }),
  setWidth: (width) => set({ width }),
  setMaintainAspectRatio: (maintainAspectRatio) => set({ maintainAspectRatio }),
  setColorMode: (colorMode) => set({ colorMode }),
  setBrightness: (brightness) => set({ brightness }),
  setContrast: (contrast) => set({ contrast }),
  setSaturation: (saturation) => set({ saturation }),
  setBlur: (blur) => set({ blur }),
  setFps: (fps) => set({ fps }),
  setFrameInterval: (frameInterval) => set({ frameInterval }),
  reset: () => set(initialState),
}));

// 选择器函数
export const useCharacterSetConfig = () => {
  return useConfigStore((state) => ({
    characterSet: state.characterSet,
    customCharacterSet: state.customCharacterSet,
    setCharacterSet: state.setCharacterSet,
    setCustomCharacterSet: state.setCustomCharacterSet,
  }));
};

export const useSizeConfig = () => {
  return useConfigStore((state) => ({
    width: state.width,
    maintainAspectRatio: state.maintainAspectRatio,
    setWidth: state.setWidth,
    setMaintainAspectRatio: state.setMaintainAspectRatio,
  }));
};

export const useColorConfig = () => {
  return useConfigStore((state) => ({
    colorMode: state.colorMode,
    brightness: state.brightness,
    contrast: state.contrast,
    saturation: state.saturation,
    blur: state.blur,
    setColorMode: state.setColorMode,
    setBrightness: state.setBrightness,
    setContrast: state.setContrast,
    setSaturation: state.setSaturation,
    setBlur: state.setBlur,
  }));
};

export const useVideoConfig = () => {
  return useConfigStore((state) => ({
    fps: state.fps,
    frameInterval: state.frameInterval,
    setFps: state.setFps,
    setFrameInterval: state.setFrameInterval,
  }));
};