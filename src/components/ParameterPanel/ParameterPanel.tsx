import { memo } from 'react';
import { Settings2, Palette, Maximize2, Sliders, Film } from 'lucide-react';
import {
  useCharacterSetConfig,
  useSizeConfig,
  useColorConfig,
  useVideoConfig,
} from '../../stores/configStore';
import { useFileUploadState } from '../../stores/fileStore';
import { Select } from '../common/Select';
import { Slider } from '../common/Slider';
import { Switch } from '../common/Switch';
import { Button } from '../common/Button';
import { CHARACTER_SETS, ColorMode } from '../../types';

interface ParameterPanelProps {
  onConvert: () => void;
  isConverting: boolean;
}

export const ParameterPanel = memo<ParameterPanelProps>(({ onConvert, isConverting }) => {
  const { fileType, fileInfo } = useFileUploadState();
  
  const {
    characterSet,
    customCharacterSet,
    setCharacterSet,
    setCustomCharacterSet,
  } = useCharacterSetConfig();
  
  const { width, maintainAspectRatio, setWidth, setMaintainAspectRatio } =
    useSizeConfig();
  
  const {
    colorMode,
    brightness,
    contrast,
    saturation,
    setColorMode,
    setBrightness,
    setContrast,
    setSaturation,
  } = useColorConfig();
  
  const { fps, frameInterval, setFps, setFrameInterval } = useVideoConfig();

  const isAnimated = fileType === 'gif' || fileType === 'video';

  const colorModeOptions = [
    { value: 'grayscale' as ColorMode, label: '灰度模式' },
    { value: 'color' as ColorMode, label: '彩色模式' },
    { value: 'inverted' as ColorMode, label: '反转模式' },
  ];

  const charsetOptions = CHARACTER_SETS.map((cs) => ({
    value: cs.value,
    label: cs.name,
  }));

  return (
    <div className="terminal-panel p-6 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-terminal-green" />
        <h2 className="text-lg font-semibold text-terminal-text">参数设置</h2>
      </div>

      <div className="space-y-6">
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-terminal-green/80">
            <Palette className="w-4 h-4" />
            <h3 className="text-sm font-medium">字符集</h3>
          </div>
          
          <Select
            label="字符集"
            value={characterSet}
            onChange={setCharacterSet}
            options={charsetOptions}
            description="选择用于显示字符画的字符集"
          />

          {characterSet === 'custom' && (
            <div className="space-y-2">
              <label className="text-sm text-terminal-text/80">自定义字符集</label>
              <input
                type="text"
                value={customCharacterSet}
                onChange={(e) => setCustomCharacterSet(e.target.value)}
                placeholder="输入字符（暗到亮排列）"
                className="terminal-input"
              />
            </div>
          )}
        </section>

        <div className="h-px bg-terminal-green/20" />

        <section className="space-y-4">
          <div className="flex items-center gap-2 text-terminal-green/80">
            <Maximize2 className="w-4 h-4" />
            <h3 className="text-sm font-medium">尺寸</h3>
          </div>

          <Slider
            label="宽度（字符数）"
            value={width}
            onChange={setWidth}
            min={40}
            max={200}
          />

          <Switch
            label="保持宽高比"
            checked={maintainAspectRatio}
            onChange={setMaintainAspectRatio}
            description="自动调整以保持原始比例"
          />
        </section>

        <div className="h-px bg-terminal-green/20" />

        <section className="space-y-4">
          <div className="flex items-center gap-2 text-terminal-green/80">
            <Settings2 className="w-4 h-4" />
            <h3 className="text-sm font-medium">颜色模式</h3>
          </div>

          <Select
            label="颜色模式"
            value={colorMode}
            onChange={setColorMode}
            options={colorModeOptions}
            description="控制字符画的颜色显示方式"
          />
        </section>

        <div className="h-px bg-terminal-green/20" />

        <section className="space-y-4">
          <div className="flex items-center gap-2 text-terminal-green/80">
            <Sliders className="w-4 h-4" />
            <h3 className="text-sm font-medium">图像调节</h3>
          </div>

          <div className="space-y-4">
            <Slider
              label="亮度"
              value={brightness}
              onChange={setBrightness}
              min={-100}
              max={100}
            />
            <Slider
              label="对比度"
              value={contrast}
              onChange={setContrast}
              min={-100}
              max={100}
            />
            <Slider
              label="饱和度"
              value={saturation}
              onChange={setSaturation}
              min={-100}
              max={100}
            />
          </div>
        </section>

        {isAnimated && (
          <>
            <div className="h-px bg-terminal-green/20" />
            
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-terminal-green/80">
                <Film className="w-4 h-4" />
                <h3 className="text-sm font-medium">动画设置</h3>
              </div>

              <Slider
                label="帧率 (FPS)"
                value={fps}
                onChange={setFps}
                min={1}
                max={30}
              />
              <Slider
                label="采样间隔"
                value={frameInterval}
                onChange={setFrameInterval}
                min={1}
                max={10}
                description="每隔N帧取一帧"
              />
            </section>
          </>
        )}

        <div className="pt-4">
          <Button
            variant="primary"
            size="lg"
            onClick={onConvert}
            disabled={!fileInfo || isConverting}
            className="w-full"
          >
            {isConverting ? '转换中...' : '开始转换'}
          </Button>
        </div>
      </div>
    </div>
  );
});

ParameterPanel.displayName = 'ParameterPanel';