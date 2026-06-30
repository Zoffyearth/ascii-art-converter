import { useEffect, useRef, memo, useMemo } from 'react';
import { ZoomIn, ZoomOut, Play, Pause, RotateCcw } from 'lucide-react';
import { usePreviewControls, useConversionState } from '../../stores/previewStore';
import { useFilePreviewState } from '../../stores/fileStore';
import { Button } from '../common/Button';

interface PreviewContentProps {
  text: string;
  zoomLevel: number;
}

const PreviewContent = memo<PreviewContentProps>(({ text, zoomLevel }) => {
  const style = useMemo(() => ({
    transform: `scale(${zoomLevel})`,
    transformOrigin: 'center center',
  }), [zoomLevel]);

  return (
    <div className="p-4 min-h-full flex items-center justify-center" style={style}>
      <pre className="ascii-preview text-terminal-text whitespace-pre leading-tight select-text">
        {text}
      </pre>
    </div>
  );
});

PreviewContent.displayName = 'PreviewContent';

interface ConversionProgressProps {
  progress: number;
}

const ConversionProgress = memo<ConversionProgressProps>(({ progress }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <div className="w-64 space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-3 h-3 rounded-full bg-terminal-green" />
          <div className="w-3 h-3 rounded-full bg-terminal-green" />
          <div className="w-3 h-3 rounded-full bg-terminal-green" />
        </div>
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-center text-sm text-terminal-green">
          正在转换... {progress}%
        </p>
      </div>
    </div>
  );
});

ConversionProgress.displayName = 'ConversionProgress';

export const PreviewWindow = memo(() => {
  const {
    asciiFrames,
    currentFrameIndex,
    isPlaying,
    zoomLevel,
    setIsPlaying,
    setCurrentFrameIndex,
    setZoomLevel,
    nextFrame,
  } = usePreviewControls();
  
  const { conversionProgress, isConverting } = useConversionState();
  const { fileInfo } = useFilePreviewState();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentFrame = asciiFrames[currentFrameIndex];

  useEffect(() => {
    if (isPlaying && asciiFrames.length > 1) {
      intervalRef.current = setInterval(() => {
        nextFrame();
      }, 150);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, asciiFrames.length, nextFrame]);

  const handleZoomIn = () => {
    setZoomLevel(Math.min(zoomLevel + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(Math.max(zoomLevel - 0.25, 0.5));
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const resetView = () => {
    setZoomLevel(1);
    setCurrentFrameIndex(0);
    setIsPlaying(false);
  };

  const frameStats = useMemo(() => {
    if (!currentFrame) return null;
    return {
      count: asciiFrames.length,
      width: currentFrame.text.split('\n')[0]?.length || 0,
      height: currentFrame.text.split('\n').length || 0
    };
  }, [asciiFrames.length, currentFrame]);

  return (
    <div className="terminal-panel p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-terminal-green" />
          <h2 className="text-lg font-semibold text-terminal-text">预览窗口</h2>
        </div>

        {asciiFrames.length > 0 && (
          <div className="flex items-center gap-2">
            {asciiFrames.length > 1 && (
              <>
                <Button variant="ghost" size="sm" onClick={togglePlay}>
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <span className="text-xs text-terminal-dim">
                  {currentFrameIndex + 1} / {asciiFrames.length}
                </span>
              </>
            )}
            
            <div className="flex items-center gap-1 ml-2">
              <Button variant="ghost" size="sm" onClick={handleZoomOut}>
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-xs text-terminal-dim w-12 text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <Button variant="ghost" size="sm" onClick={handleZoomIn}>
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={resetView}>
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      <div ref={containerRef} className="flex-1 bg-terminal-bg/30 rounded-lg border border-terminal-green/20 overflow-auto relative">
        {!fileInfo && !isConverting ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-terminal-dim">
            <div className="text-6xl mb-4 opacity-20">[]</div>
            <p className="text-sm">上传文件开始转换</p>
          </div>
        ) : isConverting ? (
          <ConversionProgress progress={conversionProgress} />
        ) : asciiFrames.length > 0 && currentFrame ? (
          <PreviewContent text={currentFrame.text} zoomLevel={zoomLevel} />
        ) : null}
      </div>

      {frameStats && (
        <div className="mt-4 p-3 bg-terminal-bg/30 rounded-lg border border-terminal-green/10">
          <div className="flex items-center justify-between text-xs text-terminal-dim">
            <span>帧数: {frameStats.count}</span>
            <span>宽度: {frameStats.width} 字符</span>
            <span>高度: {frameStats.height} 行</span>
          </div>
        </div>
      )}
    </div>
  );
});

PreviewWindow.displayName = 'PreviewWindow';