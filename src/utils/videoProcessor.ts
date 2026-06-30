export const loadVideo = (src: string): Promise<HTMLVideoElement> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    
    video.onloadedmetadata = () => {
      resolve(video);
    };
    video.onerror = reject;
    video.src = src;
  });
};

export const getVideoDuration = (video: HTMLVideoElement): number => {
  return video.duration;
};

export const seekVideo = (video: HTMLVideoElement, time: number): Promise<void> => {
  return new Promise((resolve) => {
    const onSeeked = () => {
      video.removeEventListener('seeked', onSeeked);
      resolve();
    };
    
    video.addEventListener('seeked', onSeeked);
    video.currentTime = time;
    
    setTimeout(resolve, 100);
  });
};

export const extractVideoFrame = (
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement,
  time: number
): Promise<ImageData> => {
  return new Promise(async (resolve, reject) => {
    try {
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('无法获取Canvas上下文'));
        return;
      }
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      video.currentTime = time;
      
      video.onseeked = () => {
        ctx.drawImage(video, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        resolve(imageData);
      };
      
      video.onerror = () => {
        reject(new Error('视频帧提取失败'));
      };
    } catch (error) {
      reject(error);
    }
  });
};

export const extractGifFrames = async (
  file: File,
  canvas: HTMLCanvasElement
): Promise<{ frames: ImageData[]; delay: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('无法获取Canvas上下文'));
        return;
      }
      
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      resolve({ frames: [imageData], delay: 100 });
      URL.revokeObjectURL(url);
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('GIF文件加载失败'));
    };
    
    img.src = url;
  });
};
