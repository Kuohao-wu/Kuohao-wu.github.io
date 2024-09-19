/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/vue" />

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
interface ImportMetaEnv {
  /**
   * 项目API 请求地址
   */
  readonly VITE_API_BASE_URL: string;
  /**
   * API key
   */
  readonly VITE_API_KEY: string;
}
