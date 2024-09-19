import type { Router } from "vue-router";

export function useNotification({ router } : { router: Router }) {

  // 消息通知提示音
  const notificationAudio = new Audio('https://img-fe.tengzhihh.com/audio/c58fb135c2546f.mp3');

  const options = {
    badge: '重要',
    body: '', // 展示内容
    silent: false, // 是否静音
    lang: 'ZH',
    sticky: true, // 是否粘性展示，不轻易被清理
    // renotify: true, // 弹窗内容更新，是否重新通知，需与tag搭配使用
    requireInteraction: true, // 是否保持，不自动关闭
};
  const notify = async (message: string = '') => {
    options.body = message;
    const notification = new Notification('您有新的未读消息', options);
    // 设置点击事件
    notification.onclick = function (evt) {
      console.log(evt);
      window.focus();
      router.push({
        path: '/bookmark',
      })
    };
    // 播放通知音频
    notificationAudio?.play();
  }
  const showNotification = async (message:string) => {
    // 检查权限是否已获取 已获取为granted
    if (Notification.permission !== 'granted') {
      // 未允许权限，则申请权限
      const status  = await Notification.requestPermission()
        if (status == 'granted') {
          // 创建提醒
          notify(message)
        }
      } else {
        // 已有权限，重复操作即可
        notify(message)
    }
  }

  return {
    showNotification
  }
}