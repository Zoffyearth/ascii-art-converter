import { useCallback, useMemo } from 'react';
import { useConfigStore } from '../stores/configStore';
import { useExportFrames } from '../stores/previewStore';
import { exportFrame } from '../utils/exportManager';
import { ExportFormat } from '../types';

export const useExport = () => {
  const { colorMode, width } = useConfigStore((state) => ({
    colorMode: state.colorMode,
    width: state.width,
  }));
  
  const { asciiFrames } = useExportFrames();

  const hasFrames = useMemo(() => asciiFrames.length > 0, [asciiFrames.length]);
  const frameCount = useMemo(() => asciiFrames.length, [asciiFrames.length]);

  const handleExport = useCallback(
    async (format: ExportFormat) => {
      if (asciiFrames.length === 0) {
        console.warn('没有可导出的帧');
        return;
      }

      await exportFrame(format, asciiFrames, width, colorMode);
    },
    [asciiFrames, width, colorMode]
  );

  return {
    handleExport,
    hasFrames,
    frameCount,
  };
};