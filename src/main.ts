import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { i18n } from "@/i18n/index";
import directive from "@/directive/index";
import '@/assets/index.css'
import PWABadge from './components/PWABadge.vue'


createApp(App)
.use(router)
.use(i18n)
.use(directive)
.component('PWABadge', PWABadge)
.mount('#app')
