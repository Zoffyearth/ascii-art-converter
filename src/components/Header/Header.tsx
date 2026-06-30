import { Terminal, BookOpen } from 'lucide-react';

interface HeaderProps {
  activeTab: 'converter' | 'guide';
  onTabChange: (tab: 'converter' | 'guide') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <header className="sticky top-0 z-50 bg-terminal-bg/95 border-b border-terminal-green/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Terminal className="w-8 h-8 text-terminal-green glow-text" />
            <div>
              <h1 className="text-xl font-bold text-terminal-green glow-text">
                ASCII ART
              </h1>
              <p className="text-xs text-terminal-dim">字符画转换器</p>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            <button
              onClick={() => onTabChange('converter')}
              className={`
                px-5 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2
                ${activeTab === 'converter'
                  ? 'bg-terminal-green/20 text-terminal-green border border-terminal-green/50'
                  : 'text-terminal-text/70 hover:text-terminal-green hover:bg-terminal-green/10'
                }
              `}
            >
              <Terminal className="w-4 h-4" />
              转换器
            </button>
            
            <button
              onClick={() => onTabChange('guide')}
              className={`
                px-5 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2
                ${activeTab === 'guide'
                  ? 'bg-terminal-green/20 text-terminal-green border border-terminal-green/50'
                  : 'text-terminal-text/70 hover:text-terminal-green hover:bg-terminal-green/10'
                }
              `}
            >
              <BookOpen className="w-4 h-4" />
              使用指南
            </button>
          </nav>
        </div>
      </div>
      
      <div className="h-px bg-gradient-to-r from-transparent via-terminal-green/50 to-transparent" />
    </header>
  );
};
