import { useCallback } from 'react';
import { useFileStore } from '../stores/fileStore';
import { validateFile, getFileType } from '../utils/fileValidator';
import { loadImage } from '../utils/imageProcessor';
import { loadVideo } from '../utils/videoProcessor';

export const useFileUpload = () => {
  const {
    setFile,
    setFileType,
    setFileInfo,
    setPreviewUrl,
    setIsProcessing,
    setError,
    reset,
  } = useFileStore((state) => ({
    setFile: state.setFile,
    setFileType: state.setFileType,
    setFileInfo: state.setFileInfo,
    setPreviewUrl: state.setPreviewUrl,
    setIsProcessing: state.setIsProcessing,
    setError: state.setError,
    reset: state.reset,
  }));

  const handleFileSelect = useCallback(async (file: File) => {
    setIsProcessing(true);
    setError(null);

    const validation = validateFile(file);
    if (!validation.valid) {
      setError(validation.error || '文件验证失败');
      setIsProcessing(false);
      return;
    }

    setFile(file);

    const fileType = getFileType(file);
    if (!fileType) {
      setError('无法识别文件类型');
      setIsProcessing(false);
      return;
    }

    setFileType(fileType);

    const previewUrl = URL.createObjectURL(file);
    setPreviewUrl(previewUrl);

    try {
      const fileInfo: any = {
        name: file.name,
        size: file.size,
        type: fileType,
      };

      if (fileType === 'video') {
        const video = await loadVideo(previewUrl);
        fileInfo.duration = video.duration;
        fileInfo.width = video.videoWidth;
        fileInfo.height = video.videoHeight;
      } else if (fileType === 'image' || fileType === 'gif') {
        const img = await loadImage(previewUrl);
        fileInfo.width = img.width;
        fileInfo.height = img.height;
      }

      setFileInfo(fileInfo);
    } catch (err) {
      setError('文件处理失败');
      console.error(err);
    }

    setIsProcessing(false);
  }, [
    setFile,
    setFileType,
    setFileInfo,
    setPreviewUrl,
    setIsProcessing,
    setError,
  ]);

  const clearFile = useCallback(() => {
    reset();
  }, [reset]);

  return {
    handleFileSelect,
    clearFile,
  };
};