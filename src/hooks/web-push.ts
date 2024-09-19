import { useRegisterSW } from 'virtual:pwa-register/vue'
import { ref } from 'vue'
import { base64UrlToUint8Array } from "@/utils/index";
import { apiGetPublicKey, apiSaveSubscription } from "@/api/push";

export function useWebPush() {

  const showSubscribe = ref(true)
  const subscribe = () => {

  }
  
  useRegisterSW({
    immediate: true,
    async onRegisteredSW(_, r) {
      const subscribed  = await r?.pushManager.getSubscription()
      if (subscribed) {
        console.info('User is already subscribed.');
        showSubscribe.value = false
        return;
      }

      const { data: publicKey } = await apiGetPublicKey()
      const subscription = await r?.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: base64UrlToUint8Array(publicKey)
      });
      showSubscribe.value = false
    }
  })

  return {
    subscribe
  }
}