/**
 * Pjax 初始化脚本
 * 实现无刷新页面切换，保持音乐播放器不中断
 */

(function($){
  // 检查是否支持 pjax
  if (typeof $.pjax === 'undefined') {
    console.warn('Pjax 库未加载，跨页面音乐播放功能不可用');
    return;
  }

  // 需要排除的链接（不使用 pjax）
  const excludeSelectors = [
    'a[href^="javascript"]',
    'a[href^="#"]',
    'a[href*="atom.xml"]',
    'a[href*="mailto:"]',
    'a[target="_blank"]',
    'a[download]',
    '.fancybox',
    '.article-share-link'
  ];

  // pjax 配置
  $(document).pjax('a:not(' + excludeSelectors.join(',') + ')', {
    container: '#container',
    fragment: '#container',
    timeout: 8000,
    cache: false,
    storage: true,
    filter: function(href) {
      // 排除外部链接
      if (href.hostname !== window.location.hostname) {
        return false;
      }
      return true;
    }
  });

  // pjax 开始 - 显示加载动画
  $(document).on('pjax:start', function() {
    $('body').addClass('pjax-loading');
  });

  // pjax 结束 - 隐藏加载动画
  $(document).on('pjax:end', function() {
    $('body').removeClass('pjax-loading');
    
    // 重新初始化页面相关脚本
    if (typeof initFancybox === 'function') {
      initFancybox();
    }
    
    // 滚动到顶部
    window.scrollTo(0, 0);
    
    // 触发自定义事件，供其他脚本监听
    $(document).trigger('pjax:complete');
  });

  // pjax 错误处理
  $(document).on('pjax:error', function(e, xhr, err) {
    console.error('Pjax 加载失败:', err);
    // 如果加载失败，回退到正常页面跳转
    window.location.href = e.relatedTarget.href;
  });

  // pjax 超时处理
  $(document).on('pjax:timeout', function(e) {
    console.warn('Pjax 加载超时，回退到正常跳转');
    window.location.href = e.relatedTarget.href;
  });

  console.log('✅ Pjax 已初始化 - 跨页面音乐播放已启用');
})(jQuery);
