import { useCallback, useRef } from 'react';
import { useFileStore } from '../stores/fileStore';
import { useConfigStore } from '../stores/configStore';
import { usePreviewStore } from '../stores/previewStore';
import { loadImage, getImageData, applyAdjustments } from '../utils/imageProcessor';
import { loadVideo, extractVideoFrame } from '../utils/videoProcessor';
import { renderAscii, RenderOptions } from '../utils/asciiRenderer';

export const useAsciiConverter = () => {
  const { previewUrl, fileType } = useFileStore((state) => ({
    previewUrl: state.previewUrl,
    fileType: state.fileType,
  }));
  
  const config = useConfigStore((state) => ({
    characterSet: state.characterSet,
    customCharacterSet: state.customCharacterSet,
    width: state.width,
    colorMode: state.colorMode,
    brightness: state.brightness,
    contrast: state.contrast,
    saturation: state.saturation,
    blur: state.blur,
    fps: state.fps,
    frameInterval: state.frameInterval,
  }));
  
  const { setAsciiFrames, setConversionProgress, setIsConverting } = usePreviewStore(
    (state) => ({
      setAsciiFrames: state.setAsciiFrames,
      setConversionProgress: state.setConversionProgress,
      setIsConverting: state.setIsConverting,
    })
  );
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const getCharacterSet = useCallback(() => {
    return config.characterSet === 'custom' && config.customCharacterSet
      ? config.customCharacterSet
      : config.characterSet;
  }, [config.characterSet, config.customCharacterSet]);

  const convertImageToAscii = useCallback(async (imageSrc: string): Promise<void> => {
    if (!canvasRef.current) {
      canvasRef.current = document.createElement('canvas');
    }

    setIsConverting(true);
    setConversionProgress(0);

    try {
      const img = await loadImage(imageSrc);
      const imageData = getImageData(img, canvasRef.current!);
      
      const adjustedData = applyAdjustments(
        imageData,
        config.brightness,
        config.contrast,
        config.saturation,
        config.blur
      );

      setConversionProgress(50);

      const options: RenderOptions = {
        width: config.width,
        characterSet: getCharacterSet(),
        colorMode: config.colorMode,
      };

      const result = renderAscii(adjustedData, options);
      
      setConversionProgress(100);
      
      setAsciiFrames([{ text: result.text, coloredChars: result.coloredChars }]);
    } catch (error) {
      console.error('转换失败:', error);
    }

    setIsConverting(false);
  }, [
    config,
    getCharacterSet,
    setAsciiFrames,
    setConversionProgress,
    setIsConverting,
  ]);

  const convertVideoToAscii = useCallback(async (videoSrc: string): Promise<void> => {
    if (!canvasRef.current) {
      canvasRef.current = document.createElement('canvas');
    }

    setIsConverting(true);
    setConversionProgress(0);

    try {
      const video = await loadVideo(videoSrc);
      const duration = video.duration;
      const fps = config.fps;
      const frameInterval = config.frameInterval;
      const frameDelay = 1000 / fps;
      
      const frames: any[] = [];
      const totalFrames = Math.floor(duration * fps / frameInterval);
      let currentFrame = 0;

      const extractFrameFn = async () => {
        if (currentFrame >= totalFrames) {
          setAsciiFrames(frames);
          setConversionProgress(100);
          setIsConverting(false);
          return;
        }

        const time = (currentFrame * frameInterval) / fps;
        
        try {
          const imageData = await extractVideoFrame(video, canvasRef.current!, time);
          
          const adjustedData = applyAdjustments(
            imageData,
            config.brightness,
            config.contrast,
            config.saturation,
            config.blur
          );

          const options: RenderOptions = {
            width: config.width,
            characterSet: getCharacterSet(),
            colorMode: config.colorMode,
          };

          const result = renderAscii(adjustedData, options);
          
          frames.push({
            text: result.text,
            coloredChars: result.coloredChars,
            timestamp: time,
          });

          currentFrame++;
          setConversionProgress(Math.round((currentFrame / totalFrames) * 100));

          if (currentFrame % 5 === 0) {
            setAsciiFrames([...frames]);
          }

          setTimeout(extractFrameFn, frameDelay > 50 ? 50 : frameDelay);
        } catch (err) {
          console.error('帧提取失败:', err);
          currentFrame++;
          setTimeout(extractFrameFn, frameDelay > 50 ? 50 : frameDelay);
        }
      };

      extractFrameFn();
    } catch (error) {
      console.error('视频转换失败:', error);
      setIsConverting(false);
    }
  }, [
    config,
    getCharacterSet,
    setAsciiFrames,
    setConversionProgress,
    setIsConverting,
  ]);

  const convert = useCallback(async () => {
    if (!previewUrl || !fileType) return;

    if (fileType === 'image' || fileType === 'gif') {
      await convertImageToAscii(previewUrl);
    } else if (fileType === 'video') {
      await convertVideoToAscii(previewUrl);
    }
  }, [previewUrl, fileType, convertImageToAscii, convertVideoToAscii]);

  return {
    convert,
    canvasRef,
  };
};