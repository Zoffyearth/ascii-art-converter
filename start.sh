#!/bin/bash

echo "========================================"
echo "   字符画转换器 - ASCII Art Converter"
echo "========================================"
echo ""

echo "[1/4] 正在检查 Node.js 环境..."
if ! command -v node &> /dev/null; then
    echo ""
    echo "❌ 未检测到 Node.js！"
    echo ""
    echo "请先安装 Node.js（推荐 16.0 或更高版本）"
    echo "下载地址: https://nodejs.org/"
    echo ""
    read -p "按回车键退出..."
    exit 1
fi

NODE_VER=$(node -v)
echo "✅ Node.js 版本: $NODE_VER"
echo ""

echo "[2/4] 检查依赖是否已安装..."
if [ ! -d "node_modules" ]; then
    echo "⚠️  检测到首次运行，正在安装依赖，请稍候..."
    echo ""
    npm install
    if [ $? -ne 0 ]; then
        echo ""
        echo "❌ 依赖安装失败，请检查网络连接后重试。"
        read -p "按回车键退出..."
        exit 1
    fi
    echo ""
    echo "✅ 依赖安装完成！"
else
    echo "✅ 依赖已安装"
fi
echo ""

echo "[3/4] 正在启动开发服务器..."
echo ""
echo "💡 提示: 启动完成后请在浏览器访问: http://localhost:5173"
echo "    按 Ctrl+C 可以停止服务器"
echo ""
echo "========================================"
echo ""

npm run dev
