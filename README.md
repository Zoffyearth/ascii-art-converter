# 字符画转换器 - ASCII Art Converter

<div align="center">

![ASCII Art](https://img.shields.io/badge/ASCII%20Art-Converter-00ff9f?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5-646cff?style=for-the-badge&logo=vite)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

一个功能完整的在线字符画转换工具，支持将图片、GIF动态图和视频文件转换为高质量的 ASCII 字符画。



## ✨ 功能特点

- 🎨 **多格式支持**: 支持 JPG、PNG、GIF、WebP、BMP 等图片格式和 MP4、WebM 等视频格式
- 🎬 **动态图转换**: 支持 GIF 和视频文件的动态字符画转换
- ⚙️ **丰富参数**: 提供多种字符集、尺寸调节、颜色模式、对比度/亮度调节
- 👁️ **实时预览**: 所见即所得的预览窗口，支持缩放和动画播放
- 📥 **多样导出**: 支持导出为文本、HTML、PNG 图片和 GIF 动图
- 🎨 **复古美学**: 融合终端风格的现代界面设计
- 📱 **响应式布局**: 完美适配桌面和移动设备
- 🔒 **本地处理**: 所有文件处理均在浏览器本地完成，保护隐私

## 🚀 一键启动（推荐）

### Windows 用户

直接双击运行 `启动.bat` 文件即可自动安装依赖并启动项目！

```
双击运行：启动.bat
```

脚本会自动：
1. 检查 Node.js 环境
2. 安装项目依赖（首次运行时）
3. 启动开发服务器
4. 自动打开浏览器

### macOS / Linux 用户

运行启动脚本：

```bash
chmod +x start.sh
./start.sh
```

## 📦 手动安装

如果你想手动操作，可以按以下步骤进行：

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173 即可使用。

### 构建生产版本

```bash
npm run build
```

预览生产构建：

```bash
npm run preview
```

## 📖 使用指南

1. **上传文件**: 将图片、GIF 或视频拖放到上传区域，或点击选择文件
2. **调整参数**: 
   - 选择字符集（标准ASCII、增强字符集、简约字符集等）
   - 设置输出宽度（40-200字符）
   - 选择颜色模式（灰度/彩色/反转）
   - 调整对比度、亮度、饱和度
3. **开始转换**: 点击"开始转换"按钮
4. **预览效果**: 在预览窗口查看转换结果，支持缩放和动画控制
5. **下载结果**: 选择导出格式（文本/HTML/PNG/GIF）并下载

## 🎯 字符集说明

| 字符集 | 字符 | 说明 |
|--------|------|------|
| 标准ASCII | ` .:-=+*#%@` | 经典字符集，适合一般图片 |
| 增强字符集 | ` .'":;Il!i><~+_-?][}{1)(\|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$` | 更多细节，适合高分辨率 |
| 简约字符集 | ` .oO@` | 简洁风格，艺术效果好 |
| 方块字符 | ` ░▒▓█` | 块状效果，现代感强 |
| 自定义 | 任意输入 | 使用自定义字符序列 |

## 📤 导出格式

| 格式 | 说明 | 适用场景 |
|------|------|----------|
| TXT | 纯文本格式 | 复制到聊天、文档 |
| PNG | 静态图片 | 分享到社交媒体 |
| GIF | 动态图片 | 动图分享、表情包 |
| HTML | 可交互网页 | 完整控制、播放动画 |

## 🛠️ 技术栈

- **框架**: React 18 + TypeScript
- **构建工具**: Vite 5
- **样式**: TailwindCSS 3
- **状态管理**: Zustand 4
- **图标**: Lucide React
- **GIF编码**: omggif

## 📁 项目结构

```
picture/
├── src/
│   ├── components/          # React 组件
│   │   ├── Header/          # 页头导航
│   │   ├── UploadZone/      # 文件上传区域
│   │   ├── PreviewWindow/   # 预览窗口
│   │   ├── ParameterPanel/  # 参数面板
│   │   ├── DownloadSection/ # 下载区域
│   │   ├── HelpSection/     # 帮助指南
│   │   └── common/          # 通用组件
│   ├── hooks/               # 自定义 Hooks
│   ├── stores/              # Zustand 状态管理
│   ├── utils/               # 工具函数
│   ├── types/               # TypeScript 类型定义
│   ├── App.tsx              # 主应用组件
│   ├── main.tsx             # 入口文件
│   └── index.css            # 全局样式
├── 启动.bat                  # Windows 一键启动脚本
├── start.sh                 # macOS/Linux 启动脚本
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🔒 隐私说明

所有文件处理均在浏览器本地完成，不会上传到任何服务器。关闭页面后，所有数据将被清除。

