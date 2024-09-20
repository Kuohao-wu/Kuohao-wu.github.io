import { useRegisterSW } from 'virtual:pwa-register/vue'
import { ref } from 'vue'
import { base64UrlToUint8Array } from "@/utils/index";
import { apiGetPublicKey, apiSaveSubscription } from "@/api/subscribe";

export function useWebPush() {

  const showSubscribe = ref(false)
  const subscribeLoading = ref(false)

  const subscribe = async () => {
    const result = await Notification.requestPermission();
    if (result === 'denied') {
      console.error('The user explicitly denied the permission request.');
      return;
    }
    if (result === 'granted') {
      console.info('The user accepted the permission request.');
    }
    const registration = await navigator.serviceWorker.getRegistration();
    const subscribed = await registration?.pushManager.getSubscription();
    if (subscribed) {
      console.info('User is already subscribed.');
      showSubscribe.value = false;
    }
    try {
      subscribeLoading.value = true
      const { data: publicKey } = await apiGetPublicKey()

      const subscription = await registration?.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: base64UrlToUint8Array(publicKey)
      });

      if (subscription) {
        apiSaveSubscription({ subscription })
        alert('订阅成功')
      } else {
        alert('订阅失败')
      }
    } catch (err) {
      console.error('subscribe error', err) 
    } finally {
      subscribeLoading.value = false       
    }
  }
  
  return {
    showSubscribe,
    subscribeLoading,
    subscribe
  }
}