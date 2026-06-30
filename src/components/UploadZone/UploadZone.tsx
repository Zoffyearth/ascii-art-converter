import { useCallback, useState, memo } from 'react';
import { Upload, Image as FileImage, X, AlertCircle, Film } from 'lucide-react';
import { useFileUploadState } from '../../stores/fileStore';
import { useFileUpload } from '../../hooks/useFileUpload';
import { formatFileSize, formatDuration } from '../../utils/fileValidator';
import { Button } from '../common/Button';

export const UploadZone = memo(() => {
  const { fileInfo, previewUrl, error, isProcessing } = useFileUploadState();
  const { handleFileSelect, clearFile } = useFileUpload();
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const getFileIcon = () => {
    if (!fileInfo) return <Upload className="w-16 h-16" />;
    switch (fileInfo.type) {
      case 'video':
        return <Film className="w-16 h-16" />;
      case 'gif':
      default:
        return <FileImage className="w-16 h-16" />;
    }
  };

  const renderPreview = () => {
    if (!previewUrl || !fileInfo) return null;
    
    if (fileInfo.type === 'video') {
      return (
        <video
          src={previewUrl}
          controls
          className="w-full h-48 object-contain rounded-lg"
        />
      );
    }
    
    return (
      <img
        src={previewUrl}
        alt="预览"
        className="w-full h-48 object-contain rounded-lg"
      />
    );
  };

  return (
    <div className="terminal-panel p-6 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-terminal-green" />
        <h2 className="text-lg font-semibold text-terminal-text">文件上传</h2>
      </div>

      {!previewUrl ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            drop-zone flex flex-col items-center justify-center min-h-[250px] cursor-pointer
            ${isDragOver ? 'drop-zone-active' : ''}
            ${error ? 'border-red-500/50' : ''}
          `}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <input
            id="file-input"
            type="file"
            accept="image/*,video/*"
            onChange={handleFileInput}
            className="hidden"
          />
          
          <div className={`
            mb-4 transition-transform duration-300
            ${isDragOver ? 'scale-110 text-terminal-green' : 'text-terminal-green/60'}
          `}>
            {getFileIcon()}
          </div>
          
          <p className="text-terminal-text/80 mb-2">
            拖放文件到此处，或<span className="text-terminal-green underline">点击选择</span>
          </p>
          
          <p className="text-xs text-terminal-dim">
            支持 JPG, PNG, GIF, WebP, MP4, WebM 等格式（最大100MB）
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden bg-terminal-bg/50 border border-terminal-green/20">
            {renderPreview()}
            <button
              onClick={clearFile}
              className="absolute top-2 right-2 p-2 rounded-full bg-terminal-bg/80 text-terminal-green 
                hover:bg-terminal-green hover:text-terminal-bg transition-all duration-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-terminal-bg/30 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <FileImage className="w-4 h-4 text-terminal-green" />
              <span className="text-terminal-text truncate flex-1">{fileInfo?.name}</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-terminal-dim">
              <span>{formatFileSize(fileInfo?.size || 0)}</span>
              {fileInfo?.width && fileInfo?.height && (
                <span>{fileInfo.width} × {fileInfo.height}</span>
              )}
              {fileInfo?.duration && (
                <span>时长: {formatDuration(fileInfo.duration)}</span>
              )}
              <span className="px-2 py-0.5 rounded bg-terminal-green/10 text-terminal-green">
                {fileInfo?.type?.toUpperCase()}
              </span>
            </div>
          </div>

          <Button
            variant="ghost"
            onClick={() => document.getElementById('file-input')?.click()}
            className="w-full"
          >
            <Upload className="w-4 h-4" />
            更换文件
          </Button>
          <input
            id="file-input"
            type="file"
            accept="image/*,video/*"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
      )}

      {error && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {isProcessing && (
        <div className="flex items-center gap-2 text-sm text-terminal-green">
          <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full" />
          处理中...
        </div>
      )}
    </div>
  );
});

UploadZone.displayName = 'UploadZone';
