import { useState, useMemo, memo } from 'react';
import { Download, FileText, FileImage, FileCode, CheckCircle, Film } from 'lucide-react';
import { useExport } from '../../hooks/useExport';
import { Button } from '../common/Button';
import { ExportFormat } from '../../types';

const DownloadFormatButton = memo<{
  selected: boolean;
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
}>(({ selected, icon, label, description, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        p-3 rounded-lg border transition-all duration-300 text-left
        ${selected
          ? 'bg-terminal-green/10 border-terminal-green/50 text-terminal-green'
          : 'bg-terminal-bg/30 border-terminal-green/20 text-terminal-text/70 hover:border-terminal-green/40'
        }
      `}
    >
      <div className="flex flex-col items-center gap-2">
        {icon}
        <span className="font-medium text-sm">{label}</span>
        <span className="text-xs opacity-70 hidden sm:block">{description}</span>
      </div>
    </button>
  );
});

DownloadFormatButton.displayName = 'DownloadFormatButton';

export const DownloadSection = memo(() => {
  const { handleExport, hasFrames, frameCount } = useExport();
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('txt');
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null);

  const formats = useMemo(
    () => [
      {
        value: 'txt' as ExportFormat,
        label: '文本',
        icon: <FileText className="w-5 h-5" />,
        description: '纯文本格式',
      },
      {
        value: 'png' as ExportFormat,
        label: '图片',
        icon: <FileImage className="w-5 h-5" />,
        description: 'PNG图片格式',
      },
      {
        value: 'gif' as ExportFormat,
        label: 'GIF',
        icon: <Film className="w-5 h-5" />,
        description: '动图格式',
      },
      {
        value: 'html' as ExportFormat,
        label: 'HTML',
        icon: <FileCode className="w-5 h-5" />,
        description: '可交互网页，支持完整控制',
      },
    ],
    []
  );

  const onDownload = async () => {
    setDownloadStatus(null);
    try {
      await handleExport(selectedFormat);
      setDownloadStatus('success');
      setTimeout(() => setDownloadStatus(null), 3000);
    } catch (error) {
      setDownloadStatus('error');
      setTimeout(() => setDownloadStatus(null), 3000);
    }
  };

  return (
    <div className="terminal-panel p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-terminal-green" />
        <h2 className="text-lg font-semibold text-terminal-text">下载结果</h2>
      </div>

      {!hasFrames ? (
        <div className="text-center py-8 text-terminal-dim">
          <Download className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">转换完成后可下载结果</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {formats.map((format) => (
              <DownloadFormatButton
                key={format.value}
                selected={selectedFormat === format.value}
                icon={format.icon}
                label={format.label}
                description={format.description}
                onClick={() => setSelectedFormat(format.value)}
              />
            ))}
          </div>

          <div className="flex items-center justify-between p-3 bg-terminal-bg/30 rounded-lg border border-terminal-green/10">
            <div className="text-sm">
              <span className="text-terminal-dim">可用帧数: </span>
              <span className="text-terminal-green font-medium">{frameCount}</span>
            </div>
            
            {selectedFormat === 'html' && frameCount > 1 && (
              <span className="text-xs text-terminal-green">推荐用于完整控制</span>
            )}
            
            {selectedFormat === 'gif' && frameCount > 1 && (
              <span className="text-xs text-terminal-green">动态GIF格式</span>
            )}
            
            {downloadStatus === 'success' && (
              <div className="flex items-center gap-1 text-terminal-green text-sm">
                <CheckCircle className="w-4 h-4" />
                下载成功
              </div>
            )}
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={onDownload}
            disabled={!hasFrames}
            className="w-full"
          >
            <Download className="w-5 h-5" />
            下载 {formats.find((f) => f.value === selectedFormat)?.label}
          </Button>
        </div>
      )}
    </div>
  );
});

DownloadSection.displayName = 'DownloadSection';
