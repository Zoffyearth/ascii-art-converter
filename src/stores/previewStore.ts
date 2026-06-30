import { create } from 'zustand';
import { AsciiFrame } from '../types';

interface PreviewState {
  asciiFrames: AsciiFrame[];
  currentFrameIndex: number;
  isPlaying: boolean;
  conversionProgress: number;
  isConverting: boolean;
  zoomLevel: number;
  isFullscreen: boolean;
}

interface PreviewActions {
  setAsciiFrames: (frames: AsciiFrame[]) => void;
  addAsciiFrame: (frame: AsciiFrame) => void;
  setCurrentFrameIndex: (index: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setConversionProgress: (progress: number) => void;
  setIsConverting: (converting: boolean) => void;
  setZoomLevel: (level: number) => void;
  setIsFullscreen: (fullscreen: boolean) => void;
  nextFrame: () => void;
  reset: () => void;
}

const initialState: PreviewState = {
  asciiFrames: [],
  currentFrameIndex: 0,
  isPlaying: false,
  conversionProgress: 0,
  isConverting: false,
  zoomLevel: 1,
  isFullscreen: false,
};

export const usePreviewStore = create<PreviewState & PreviewActions>((set, get) => ({
  ...initialState,
  
  setAsciiFrames: (asciiFrames) => set({ asciiFrames, currentFrameIndex: 0 }),
  addAsciiFrame: (frame) => set((state) => ({
    asciiFrames: [...state.asciiFrames, frame]
  })),
  setCurrentFrameIndex: (currentFrameIndex) => set({ currentFrameIndex }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setConversionProgress: (conversionProgress) => set({ conversionProgress }),
  setIsConverting: (isConverting) => set({ isConverting }),
  setZoomLevel: (zoomLevel) => set({ zoomLevel }),
  setIsFullscreen: (isFullscreen) => set({ isFullscreen }),
  nextFrame: () => {
    const { asciiFrames, currentFrameIndex } = get();
    const nextIndex = (currentFrameIndex + 1) % asciiFrames.length;
    set({ currentFrameIndex: nextIndex });
  },
  reset: () => set(initialState),
}));

// 选择器函数
export const usePreviewControls = () => {
  return usePreviewStore((state) => ({
    asciiFrames: state.asciiFrames,
    currentFrameIndex: state.currentFrameIndex,
    isPlaying: state.isPlaying,
    zoomLevel: state.zoomLevel,
    setIsPlaying: state.setIsPlaying,
    setCurrentFrameIndex: state.setCurrentFrameIndex,
    setZoomLevel: state.setZoomLevel,
    nextFrame: state.nextFrame,
  }));
};

export const useConversionState = () => {
  return usePreviewStore((state) => ({
    conversionProgress: state.conversionProgress,
    isConverting: state.isConverting,
  }));
};

export const useExportFrames = () => {
  return usePreviewStore((state) => ({
    asciiFrames: state.asciiFrames,
  }));
};