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
      audio: [
        {
          name: 'Relaxing Piano',
          artist: 'Lesfm',
          url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=relaxing-145038.mp3',
          cover: 'https://picsum.photos/300/300?random=1',
          lrc: ''
        },
        {
          name: 'Acoustic Breeze',
          artist: 'Benjamin Tissot',
          url: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=acoustic-breeze-1505.mp3',
          cover: 'https://picsum.photos/300/300?random=2',
          lrc: ''
        },
        {
          name: 'A Quiet Thought',
          artist: 'Wayne Pitt',
          url: 'https://cdn.pixabay.com/download/audio/2022/10/25/audio_946bc3eb81.mp3?filename=a-quiet-thought-by-kevin-macleod.mp3',
          cover: 'https://picsum.photos/300/300?random=3',
          lrc: ''
        },
        {
          name: 'Ambient Piano',
          artist: 'Pumpupthemind',
          url: 'https://cdn.pixabay.com/download/audio/2022/10/18/audio_69f2d2c332.mp3?filename=ambient-piano-sketches-1506.mp3',
          cover: 'https://picsum.photos/300/300?random=4',
          lrc: ''
        },
        {
          name: 'Good Night',
          artist: 'FASSounds',
          url: 'https://cdn.pixabay.com/download/audio/2022/10/25/audio_946bc3eb81.mp3?filename=good-night-160166.mp3',
          cover: 'https://picsum.photos/300/300?random=5',
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
