@echo off
chcp 65001 >nul
title 字符画转换器 - 启动脚本
cls

echo ========================================
echo    字符画转换器 - ASCII Art Converter
echo ========================================
echo.

echo [1/4] 正在检查 Node.js 环境...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo ❌ 未检测到 Node.js！
    echo.
    echo 请先安装 Node.js（推荐 16.0 或更高版本）
    echo 下载地址: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VER=%%i
echo ✅ Node.js 版本: %NODE_VER%
echo.

echo [2/4] 检查依赖是否已安装...
if not exist "node_modules" (
    echo ⚠️  检测到首次运行，正在安装依赖，请稍候...
    echo.
    npm install
    if %errorlevel% neq 0 (
        echo.
        echo ❌ 依赖安装失败，请检查网络连接后重试。
        pause
        exit /b 1
    )
    echo.
    echo ✅ 依赖安装完成！
) else (
    echo ✅ 依赖已安装
)
echo.

echo [3/4] 正在启动开发服务器...
echo.
echo 💡 提示: 启动完成后会自动打开浏览器
echo    如果没有自动打开，请手动访问: http://localhost:5173
echo    按 Ctrl+C 可以停止服务器
echo.
echo ========================================
echo.

start "" http://localhost:5173
npm run dev

pause
