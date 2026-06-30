import { FILE_CONSTRAINTS, FileType } from '../types';

export const validateFile = (file: File): { valid: boolean; error?: string } => {
  if (file.size > FILE_CONSTRAINTS.maxSize) {
    return {
      valid: false,
      error: `文件大小超过限制（最大${FILE_CONSTRAINTS.maxSize / 1024 / 1024}MB）`,
    };
  }

  const isImage = FILE_CONSTRAINTS.allowedImageTypes.includes(file.type);
  const isVideo = FILE_CONSTRAINTS.allowedVideoTypes.includes(file.type);

  if (!isImage && !isVideo) {
    return {
      valid: false,
      error: '不支持的文件格式，请上传图片或视频文件',
    };
  }

  return { valid: true };
};

export const getFileType = (file: File): FileType | null => {
  if (FILE_CONSTRAINTS.allowedImageTypes.includes(file.type)) {
    if (file.type === 'image/gif') {
      return 'gif';
    }
    return 'image';
  }
  
  if (FILE_CONSTRAINTS.allowedVideoTypes.includes(file.type)) {
    return 'video';
  }
  
  return null;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};
