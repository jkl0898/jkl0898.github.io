#!/bin/bash

# 🎵 音乐播放器快速启动脚本
# 用于快速部署和测试音乐播放器功能

echo "🎵 正在初始化博客音乐播放器..."
echo ""

# 检查是否在正确的目录
if [ ! -f "index.html" ]; then
    echo "❌ 错误：请在博客根目录运行此脚本"
    exit 1
fi

# 备份原始配置文件
if [ -f "js/music-player.js" ]; then
    echo "📦 备份原始配置..."
    cp js/music-player.js js/music-player.js.bak.$(date +%Y%m%d%H%M%S)
fi

# 复制示例配置
if [ -f "js/music-player-example.js" ]; then
    echo "⚙️  应用示例配置..."
    cp js/music-player-example.js js/music-player.js
    echo "✅ 示例配置已应用！"
else
    echo "❌ 错误：找不到 js/music-player-example.js"
    exit 1
fi

# 检查必要文件
echo ""
echo "🔍 检查必要文件..."

files=(
    "css/aplayer.css"
    "js/music-player.js"
    "index.html"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ❌ $file (缺失)"
    fi
done

echo ""
echo "======================================"
echo "🎉 音乐播放器初始化完成！"
echo "======================================"
echo ""
echo "📝 下一步："
echo "   1. 在浏览器中打开 index.html 查看效果"
echo "   2. 编辑 js/music-player.js 自定义音乐列表"
echo "   3. 阅读 README_MUSIC_PLAYER.md 了解详细用法"
echo ""
echo "🎵 祝你使用愉快！"
echo ""
