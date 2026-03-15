/**
 * 音乐播放器配置示例文件
 * 
 * 使用方法：
 * 1. 复制此文件内容替换 /js/music-player.js 中的配置
 * 2. 根据实际情况修改音乐链接和封面
 * 3. 保存后刷新博客页面即可看到效果
 */

(function($){
  $(document).ready(function(){
    initAPlayer();
  });

  function initAPlayer() {
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
      audio: [
        {
          name: 'Stay Hungry Stay Foolish',
          artist: '博客主题曲',
          url: 'https://music.163.com/song/media/outer/url?id=186016.mp3',
          cover: 'https://picsum.photos/300/300?random=1',
          lrc: ''
        },
        {
          name: '清晨的阳光',
          artist: '轻音乐',
          url: 'https://music.163.com/song/media/outer/url?id=33956318.mp3',
          cover: 'https://picsum.photos/300/300?random=2',
          lrc: ''
        },
        {
          name: '夜的钢琴曲五',
          artist: '石进',
          url: 'https://music.163.com/song/media/outer/url?id=186016.mp3',
          cover: 'https://picsum.photos/300/300?random=3',
          lrc: ''
        },
        {
          name: 'Rainy Day',
          artist: 'Daydream',
          url: 'https://music.163.com/song/media/outer/url?id=524582962.mp3',
          cover: 'https://picsum.photos/300/300?random=4',
          lrc: ''
        },
        {
          name: '春の訪問',
          artist: '立花慎之介',
          url: 'https://music.163.com/song/media/outer/url?id=28446467.mp3',
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
