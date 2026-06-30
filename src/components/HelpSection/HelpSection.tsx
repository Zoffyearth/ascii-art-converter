import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Lightbulb, HelpCircle, Sparkles } from 'lucide-react';

export const HelpSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: '支持哪些文件格式？',
      answer: '支持主流的图片格式（JPG、PNG、GIF、WebP、BMP）和视频格式（MP4、WebM、AVI、MOV）。GIF文件会被识别为动态图处理。',
    },
    {
      question: '文件大小有限制吗？',
      answer: '为了保证浏览器性能，单个文件大小限制为100MB。视频文件建议不超过50MB以获得更好的转换体验。',
    },
    {
      question: '转换需要多长时间？',
      answer: '转换时间取决于文件大小和参数设置。一般来说：普通图片1-3秒，GIF动画5-30秒，短视频（<30秒）30秒-2分钟。',
    },
    {
      question: '可以自定义字符集吗？',
      answer: '可以！在参数设置面板中选择"自定义"选项，输入任意字符序列。字符将从暗到亮排列。',
    },
    {
      question: '如何获得最佳预览效果？',
      answer: '建议从默认参数开始，根据预览效果逐步调整。高对比度图片效果更好，避免使用过于复杂的图片，调整对比度和亮度可以改善细节表现。',
    },
    {
      question: '我的文件会泄露吗？',
      answer: '不会！所有转换过程都在您的浏览器本地完成，文件不会上传到任何服务器。关闭页面后，所有数据将被清除。',
    },
  ];

  const tips = [
    {
      title: '选择合适的字符集',
      description: '简单图片使用简约字符集，复杂图片使用增强字符集可以获得更好的效果。',
    },
    {
      title: '调整尺寸和对比度',
      description: '根据原始图片的复杂度调整字符画宽度，适当提高对比度可以让细节更清晰。',
    },
    {
      title: '利用彩色模式',
      description: '彩色模式可以保留原始图片的颜色信息，适合色彩丰富的图片。',
    },
    {
      title: '视频转换技巧',
      description: '对于长视频，建议先截取关键片段或降低帧率以加快转换速度。',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <section className="terminal-panel p-8">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-6 h-6 text-terminal-green" />
          <h2 className="text-2xl font-bold text-terminal-text">快速开始</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-terminal-green/20 text-terminal-green flex items-center justify-center font-bold shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold text-terminal-text mb-1">上传文件</h3>
                <p className="text-sm text-terminal-dim">
                  将图片、GIF或视频拖放到上传区域，或点击选择文件。支持多种常见格式。
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-terminal-green/20 text-terminal-green flex items-center justify-center font-bold shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold text-terminal-text mb-1">调整参数</h3>
                <p className="text-sm text-terminal-dim">
                  选择字符集、设置输出尺寸、选择颜色模式，根据需要调节对比度和亮度。
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-terminal-green/20 text-terminal-green flex items-center justify-center font-bold shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold text-terminal-text mb-1">预览效果</h3>
                <p className="text-sm text-terminal-dim">
                  查看实时预览，调整参数直到满意。支持缩放和动画播放控制。
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-terminal-green/20 text-terminal-green flex items-center justify-center font-bold shrink-0">
                4
              </div>
              <div>
                <h3 className="font-semibold text-terminal-text mb-1">下载结果</h3>
                <p className="text-sm text-terminal-dim">
                  选择下载格式（文本、HTML或图片），点击下载按钮保存到本地。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="terminal-panel p-8">
        <div className="flex items-center gap-3 mb-6">
          <Lightbulb className="w-6 h-6 text-terminal-green" />
          <h2 className="text-2xl font-bold text-terminal-text">使用技巧</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="p-4 bg-terminal-bg/30 rounded-lg border border-terminal-green/10 hover:border-terminal-green/30 transition-colors"
            >
              <h3 className="font-medium text-terminal-green mb-2">{tip.title}</h3>
              <p className="text-sm text-terminal-dim">{tip.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="terminal-panel p-8">
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="w-6 h-6 text-terminal-green" />
          <h2 className="text-2xl font-bold text-terminal-text">常见问题</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-terminal-green/20 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-terminal-green/5 transition-colors"
              >
                <span className="font-medium text-terminal-text">{faq.question}</span>
                {openFaq === index ? (
                  <ChevronUp className="w-5 h-5 text-terminal-green shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-terminal-dim shrink-0" />
                )}
              </button>
              
              {openFaq === index && (
                <div className="px-4 pb-4 pt-0">
                  <p className="text-sm text-terminal-dim leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="terminal-panel p-8 text-center">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-terminal-text mb-2">
            需要更多帮助？
          </h3>
          <p className="text-sm text-terminal-dim mb-4">
            如果您有其他问题或建议，欢迎反馈。我们一直在努力改进！
          </p>
          <div className="inline-flex items-center gap-2 text-terminal-green text-sm">
            <div className="w-2 h-2 rounded-full bg-terminal-green animate-pulse" />
            所有处理均在本地完成，保护您的隐私
          </div>
        </div>
      </section>
    </div>
  );
};
