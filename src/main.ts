import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { i18n } from "@/i18n/index";
import directive from "@/directive/index";
import '@/assets/index.css'

createApp(App)
.use(router)
.use(i18n)
.use(directive)
.mount('#app')
