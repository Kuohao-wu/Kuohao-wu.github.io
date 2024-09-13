import { useTemplateRef, onMounted, onBeforeMount, ref } from "vue";

export function useInstall() {

  const installButtonRef = useTemplateRef<HTMLButtonElement>('installButtonRef')

  const installButtonShow = ref(false)

  let appInstalledHandler: () => void

  let deferredPrompt: BeforeInstallPromptEvent | null
  const DOMContentLoadedHandler = (evt: Event) => {
    if ('BeforeInstallPromptEvent' in window) {
      console.log('✅ Support BeforeInstallPromptEvent')
    } else {
      console.warn('❌UnSupport BeforeInstallPromptEvent');
    }
  }
  const beforeInstallPromptHandler = (evt: BeforeInstallPromptEvent) => {
    evt.preventDefault();
    // 保存该事件，因为稍后需要触发它。
    deferredPrompt = evt;

    if (installButtonRef.value) {
      installButtonShow.value = true
    }
  }

  const removeEventListener = () => {
    window.removeEventListener('DOMContentLoaded', DOMContentLoadedHandler)
    window.removeEventListener('beforeinstallprompt', beforeInstallPromptHandler)

    if (typeof appInstalledHandler === 'function') {
      window.removeEventListener('appinstalled', appInstalledHandler)
    }
  }

  appInstalledHandler = () => {
    // 隐藏按钮
    if (installButtonRef.value) {
      installButtonShow.value = false
    }
    // 重置 deferredPrompt 以便下一次使用。
    deferredPrompt = null;
    console.log('🆗 App Installed');

    // 安装后，可以移除 事件监听器
    removeEventListener()
  }

  const addEventListener = () => {

    window.addEventListener('DOMContentLoaded', DOMContentLoadedHandler)
    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler)
    window.addEventListener('appinstalled', appInstalledHandler)
  }



  onMounted(() => {
    addEventListener()
  })

  onBeforeMount(() => {
    removeEventListener()
  })

  const install = () => {
    if (deferredPrompt) {
      // 显示按钮
      deferredPrompt.prompt();
      // 等待用户选择是否安装
      deferredPrompt.userChoice
        .then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          } else {
            console.log('User dismissed the install prompt');
         }
        })
    }
  }

  return {
    installButtonRef,
    installButtonShow,
    install
  }

}