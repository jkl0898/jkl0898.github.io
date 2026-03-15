# 🎵 音乐播放器配置指南

## 📝 快速开始

### 1. 修改音乐列表

编辑 `/js/music-player.js` 文件，找到 `audio` 数组部分：

```javascript
audio: [
  {
    name: '歌曲名称',
    artist: '艺术家',
    url: '音乐文件 URL',
    cover: '专辑封面图片 URL',
    lrc: '歌词文件 URL（可选）'
  },
  // 添加更多歌曲...
]
```

### 2. 获取音乐资源的方式

#### 方式一：网易云音乐（推荐）

1. 打开网易云音乐网页版 (music.163.com)
2. 搜索你想要的歌曲
3. 点击分享按钮，选择"复制歌曲外链"
4. 或者使用以下格式：
   ```
   https://music.163.com/song/media/outer/url?id=歌曲 ID.mp3
   ```

**示例：**
```javascript
{
  name: '晴天',
  artist: '周杰伦',
  url: 'https://music.163.com/song/media/outer/url?id=186016.mp3',
  cover: 'https://p2.music.126.net/abc123/album_cover.jpg'
}
```

#### 方式二：QQ 音乐

1. 打开 QQ 音乐网页版 (y.qq.com)
2. 搜索歌曲并打开播放页面
3. 点击分享，获取外链地址
4. 或使用第三方解析工具获取直链

#### 方式三：阿里云 OSS（最稳定）

**步骤：**

1. **上传音频文件到阿里云 OSS**
   - 登录阿里云控制台
   - 进入 OSS 对象存储
   - 创建 Bucket（如果还没有）
   - 上传 MP3 文件

2. **设置文件权限**
   - 选择上传的文件
   - 设置为"公共读"权限
   - 或配置 CORS 允许跨域访问

3. **获取访问链接**
   - 右键文件，选择"详情"
   - 复制"文件 URL"
   - 格式类似：`https://your-bucket.oss-cn-hangzhou.aliyuncs.com/music/song.mp3`

4. **优点**
   - ✅ 稳定可靠
   - ✅ 访问速度快
   - ✅ 完全可控
   - ✅ 无版权风险（使用自己的音乐）

#### 方式四：其他 CDN 服务

- 七牛云
- 又拍云
- 腾讯云 COS
- 或者其他支持静态资源的 CDN

### 3. 获取专辑封面

#### 免费图库推荐：

1. **Unsplash** - https://unsplash.com
2. **Pexels** - https://www.pexels.com
3. **Pixabay** - https://pixabay.com
4. **Lorem Picsum** - https://picsum.photos (随机图片)

**示例：**
```javascript
cover: 'https://picsum.photos/300/300?random=1'
```

### 4. 完整配置示例

```javascript
const playerOptions = {
  container: document.getElementById('aplayer-fixed'),
  autoplay: false,
  loop: 'all',
  order: 'list',
  preload: 'auto',
  volume: 0.7,
  mutex: true,
  listFolded: true,
  lrcType: 3,
  listMaxHeight: '400px',
  audio: [
    {
      name: 'Stay Hungry Stay Foolish',
      artist: '你的博客主题曲',
      url: 'https://your-domain.com/music/stay-hungry.mp3',
      cover: 'https://your-domain.com/images/cover1.jpg',
      lrc: ''
    },
    {
      name: '轻音乐 - 思考',
      artist: '纯音乐',
      url: 'https://music.163.com/song/media/outer/url?id=1234567.mp3',
      cover: 'https://picsum.photos/300/300?random=2',
      lrc: ''
    },
    {
      name: '阅读时光',
      artist: '背景音乐',
      url: 'https://your-oss.oss-cn-hangzhou.aliyuncs.com/bgm/reading-time.mp3',
      cover: 'https://your-domain.com/images/cover2.jpg',
      lrc: ''
    }
  ]
};
```

## ⚙️ 高级配置选项

### 播放器参数说明

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| autoplay | Boolean | false | 是否自动播放 |
| loop | String | 'all' | 循环播放：'all'(全部), 'one'(单曲), 'none'(不循环) |
| order | String | 'list' | 播放顺序：'list'(列表), 'random'(随机) |
| preload | String | 'auto' | 预加载：'none', 'metadata', 'auto' |
| volume | Float | 0.7 | 默认音量 (0-1) |
| mutex | Boolean | true | 阻止多个播放器同时播放 |
| listFolded | Boolean | true | 初始折叠播放列表 |
| lrcType | Number | 3 | 歌词显示类型 (0-3) |

### 自定义样式

编辑 `/css/aplayer.css` 文件可以修改播放器外观：

```css
/* 修改背景透明度 */
#aplayer-fixed .aplayer-body {
  background: rgba(255, 255, 255, 0.95); /* 调整 0.95 改变透明度 */
}

/* 修改阴影效果 */
#aplayer-fixed .aplayer-body {
  box-shadow: 0 -1px 10px rgba(0, 0, 0, 0.1); /* 调整阴影 */
}

/* 修改播放列表高度 */
#aplayer-fixed .aplayer-list {
  max-height: 400px !important; /* 调整最大高度 */
}
```

## 🔧 常见问题

### Q1: 音乐无法播放？

**可能原因：**
- 音乐链接失效
- CORS 跨域问题
- 浏览器不支持的音频格式

**解决方案：**
1. 检查音乐链接是否可访问
2. 确保服务器设置了正确的 CORS 头
3. 使用 MP3 格式（兼容性最好）

### Q2: 如何在不同页面使用不同的播放列表？

为每个页面创建独立的配置文件，例如：

```javascript
// js/music-player-home.js - 首页播放列表
// js/music-player-article.js - 文章页播放列表
```

然后在不同页面的 HTML 中引入对应的 JS 文件。

### Q3: 播放器遮挡了页面内容？

调整 CSS 中的 `z-index` 或在 body 底部添加 padding：

```css
body {
  padding-bottom: 100px; /* 为播放器留出空间 */
}
```

### Q4: 如何添加歌词？

1. 准备 LRC 格式的歌词文件
2. 将歌词文件上传到你的服务器或 CDN
3. 在 audio 配置中添加 lrc 字段：

```javascript
{
  name: '歌曲名',
  artist: '艺术家',
  url: 'https://example.com/song.mp3',
  cover: 'https://example.com/cover.jpg',
  lrc: 'https://example.com/song.lrc'
}
```

## 📱 移动端优化

播放器已经做了移动端适配，但你还可以进一步优化：

```css
@media screen and (max-width: 768px) {
  #aplayer-fixed .aplayer-body {
    font-size: 11px; /* 减小字体 */
  }
  
  #aplayer-fixed .aplayer-pic {
    width: 50px; /* 减小封面尺寸 */
    height: 50px;
  }
}
```

## 🎯 推荐做法

1. **使用阿里云 OSS 存储音乐** - 稳定、快速、可控
2. **准备 3-5 首背景音乐** - 不要太多，避免加载慢
3. **选择轻音乐/纯音乐** - 适合阅读场景
4. **压缩音频文件** - 减小文件大小，加快加载
5. **测试不同设备** - 确保在手机和电脑上都能正常播放

## 📄 文件说明

- `/css/aplayer.css` - 播放器自定义样式
- `/js/music-player.js` - 播放器配置和初始化脚本
- `/music-player-template.html` - 模板说明文件
- 本文件 - 配置指南

---

**祝你使用愉快！🎵**

如有问题，请查看 APlayer 官方文档：https://aplayer.js.org/
