import { useState, memo } from 'react';
import { Header } from './components/Header/Header';
import { UploadZone } from './components/UploadZone/UploadZone';
import { ParameterPanel } from './components/ParameterPanel/ParameterPanel';
import { PreviewWindow } from './components/PreviewWindow/PreviewWindow';
import { DownloadSection } from './components/DownloadSection/DownloadSection';
import { HelpSection } from './components/HelpSection/HelpSection';
import { useAsciiConverter } from './hooks/useAsciiConverter';
import { useConversionState } from './stores/previewStore';

type TabType = 'converter' | 'guide';

const App = memo(() => {
  const [activeTab, setActiveTab] = useState<TabType>('converter');
  const { convert, canvasRef } = useAsciiConverter();
  const { isConverting } = useConversionState();

  return (
    <div className="min-h-screen bg-terminal-bg">
      <div className="scanline-overlay" />

      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'converter' ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
              <div className="lg:col-span-3">
                <UploadZone />
              </div>
              
              <div className="lg:col-span-5">
                <PreviewWindow />
              </div>
              
              <div className="lg:col-span-4">
                <ParameterPanel onConvert={convert} isConverting={isConverting} />
              </div>
            </div>

            <DownloadSection />

            <canvas ref={canvasRef} className="hidden" />
          </>
        ) : (
          <HelpSection />
        )}
      </main>

      <footer className="border-t border-terminal-green/20 mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-terminal-dim">
              <div className="w-2 h-2 rounded-full bg-terminal-green" />
              <span>字符画转换器 v1.0</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-terminal-dim">
              <span>🛡️ 所有处理均在本地完成</span>
              <span>⚡ 基于浏览器实时转换</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
});

App.displayName = 'App';

export default App;
