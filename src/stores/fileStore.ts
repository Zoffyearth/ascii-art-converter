import { create } from 'zustand';
import { FileType, FileInfo } from '../types';

interface FileState {
  file: File | null;
  fileType: FileType | null;
  fileInfo: FileInfo | null;
  previewUrl: string | null;
  isProcessing: boolean;
  error: string | null;
}

interface FileActions {
  setFile: (file: File | null) => void;
  setFileType: (type: FileType | null) => void;
  setFileInfo: (info: FileInfo | null) => void;
  setPreviewUrl: (url: string | null) => void;
  setIsProcessing: (processing: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState: FileState = {
  file: null,
  fileType: null,
  fileInfo: null,
  previewUrl: null,
  isProcessing: false,
  error: null,
};

export const useFileStore = create<FileState & FileActions>((set) => ({
  ...initialState,
  
  setFile: (file) => set({ file }),
  setFileType: (fileType) => set({ fileType }),
  setFileInfo: (fileInfo) => set({ fileInfo }),
  setPreviewUrl: (previewUrl) => set({ previewUrl }),
  setIsProcessing: (isProcessing) => set({ isProcessing }),
  setError: (error) => set({ error }),
  reset: () => set(initialState),
}));

// 选择器函数
export const useFileUploadState = () => {
  return useFileStore((state) => ({
    file: state.file,
    fileType: state.fileType,
    fileInfo: state.fileInfo,
    previewUrl: state.previewUrl,
    isProcessing: state.isProcessing,
    error: state.error,
  }));
};

export const useFilePreviewState = () => {
  return useFileStore((state) => ({
    fileInfo: state.fileInfo,
  }));
};