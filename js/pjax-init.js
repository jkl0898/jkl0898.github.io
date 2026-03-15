/**
 * Pjax 初始化脚本
 * 实现无刷新页面切换，保持音乐播放器不中断
 */

(function($){
  // 等待页面加载完成
  $(document).ready(function() {
    // 检查是否支持 pjax
    if (typeof $.pjax === 'undefined') {
      console.warn('Pjax 库未加载，跨页面音乐播放功能不可用');
      return;
    }

    console.log('✅ Pjax 库已加载，正在初始化...');

    // 对所有内部链接启用 pjax
    $(document).pjax('a[href^="/"]', '#container', {
      fragment: '#container',
      timeout: 8000,
      maxCacheLength: 500
    });

    // 排除特定链接
    $(document).on('click', 'a[href*="atom.xml"], a[target="_blank"], a[download]', function(e) {
      // 不使用 pjax，正常跳转
      return true;
    });

    // pjax 开始
    $(document).on('pjax:start', function() {
      $('body').addClass('pjax-loading');
      console.log('🔄 Pjax 开始加载...');
    });

    // pjax 结束
    $(document).on('pjax:end', function() {
      $('body').removeClass('pjax-loading');
      window.scrollTo(0, 0);
      console.log('✅ Pjax 加载完成');
    });

    // pjax 成功
    $(document).on('pjax:success', function() {
      console.log('🎵 音乐播放器继续播放');
    });

    // pjax 错误处理
    $(document).on('pjax:error', function(e, xhr, err) {
      console.error('Pjax 加载失败:', err);
    });

    console.log('✅ Pjax 已初始化 - 跨页面音乐播放已启用');
  });
})(jQuery);
