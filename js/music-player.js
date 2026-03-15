/**
 * 音乐播放器配置
 * 支持 pjax 无刷新切换，保持播放状态
 */

(function($){
  // 检查播放器是否已初始化（支持 pjax）
  function initAPlayer() {
    // 如果播放器已存在，不重复初始化
    if (window.aplayer) {
      console.log('🎵 播放器已存在，跳过初始化');
      return;
    }

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
      
      // ⭐⭐⭐ 在这里配置你的音乐列表 ⭐⭐⭐
      // 推荐使用免费无版权音乐：https://pixabay.com/music/
      // 更多中国风音乐：https://pixabay.com/music/search/chinese/
      audio: [
        // === 轻音乐（保留1首）===
        {
          name: 'Relaxing Piano',
          artist: 'Lesfm',
          url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=relaxing-145038.mp3',
          cover: 'https://picsum.photos/300/300?random=1',
          lrc: ''
        },
        // === 中国风/粤语风格 ===
        {
          name: 'China',
          artist: 'Pumpupthemind',
          url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_1c3f2c55c8.mp3?filename=china-1507.mp3',
          cover: 'https://picsum.photos/300/300?random=2',
          lrc: ''
        },
        {
          name: 'Chinese Traditional',
          artist: 'PeriTune',
          url: 'https://cdn.pixabay.com/download/audio/2022/05/18/audio_6ba0411eaa.mp3?filename=chinese-traditional-14292.mp3',
          cover: 'https://picsum.photos/300/300?random=3',
          lrc: ''
        },
        // === 粤语歌（请替换为你自己的音乐）===
        // 💡 如何添加粤语歌：
        // 1. 在 iTunes/网易云购买正版 MP3
        // 2. 上传到阿里云 OSS
        // 3. 替换下方的 url
        {
          name: '粤语歌曲 1 - 请替换',
          artist: '请替换艺术家',
          url: 'https://cdn.pixabay.com/download/audio/2022/10/17/audio_69f2d2c332.mp3?filename=placeholder.mp3',
          cover: 'https://picsum.photos/300/300?random=4',
          lrc: ''
        },
        {
          name: '粤语歌曲 2 - 请替换',
          artist: '请替换艺术家',
          url: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=placeholder.mp3',
          cover: 'https://picsum.photos/300/300?random=5',
          lrc: ''
        },
        // === 摇滚/活力风格 ===
        {
          name: 'Energy',
          artist: 'Bensound',
          url: 'https://cdn.pixabay.com/download/audio/2022/10/30/audio_617a5e5a1e.mp3?filename=energy-10205.mp3',
          cover: 'https://picsum.photos/300/300?random=6',
          lrc: ''
        },
        {
          name: 'Happy Rock',
          artist: 'Benjamin Tissot',
          url: 'https://cdn.pixabay.com/download/audio/2022/10/30/audio_8e4de9e1c7.mp3?filename=happy-rock-10206.mp3',
          cover: 'https://picsum.photos/300/300?random=7',
          lrc: ''
        },
        {
          name: 'Punky',
          artist: 'Benjamin Tissot',
          url: 'https://cdn.pixabay.com/download/audio/2022/10/27/audio_6f8b0c1e16.mp3?filename=punky-10200.mp3',
          cover: 'https://picsum.photos/300/300?random=8',
          lrc: ''
        },
        // === 日式风格 ===
        {
          name: 'Matsuri',
          artist: 'Dyalla',
          url: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=matsuri-1505.mp3',
          cover: 'https://picsum.photos/300/300?random=9',
          lrc: ''
        },
        {
          name: 'Japan',
          artist: 'Unicorn Heads',
          url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_1c3f2c55c8.mp3?filename=japan-1507.mp3',
          cover: 'https://picsum.photos/300/300?random=10',
          lrc: ''
        }
      ]
    };

    try {
      window.aplayer = new APlayer(playerOptions);
      
      if (localStorage.getItem('aplayer-volume') !== null) {
        aplayer.volume(localStorage.getItem('aplayer-volume'), true);
      }

      aplayer.on('volumechange', function() {
        localStorage.setItem('aplayer-volume', aplayer.volume);
      });

      console.log('✅ 音乐播放器已就绪 - 共 ' + aplayer.list.audios.length + ' 首歌曲');
    } catch (error) {
      console.error('❌ 播放器初始化失败:', error);
    }
  }

  // 页面加载时初始化
  $(document).ready(function(){
    initAPlayer();
  });

  // pjax 完成后不重新初始化播放器（保持播放状态）
  $(document).on('pjax:complete', function() {
    // 播放器继续播放，不做任何操作
    console.log('🎵 Pjax 切换完成，播放器继续播放');
  });

  window.MusicPlayer = {
    play: function() {
      if (window.aplayer) aplayer.play();
    },
    pause: function() {
      if (window.aplayer) aplayer.pause();
    },
    setVolume: function(volume) {
      if (window.aplayer) aplayer.volume(volume, true);
    },
    addAudio: function(audio) {
      if (window.aplayer) aplayer.addAudio(audio);
    }
  };

})(jQuery);
