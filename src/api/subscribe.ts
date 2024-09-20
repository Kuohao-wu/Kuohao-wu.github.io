import axios, { AxiosResponse } from 'axios'

const http = axios.create({
  baseURL: 'http://tgc.natapp1.cc',
  timeout: 5000
})

/**
 * 获取公钥
 * @returns {Promise<AxiosResponse>}
 */
export function apiGetPublicKey(): Promise<AxiosResponse<string>> {
  return http.get('/get-public-key')
}

/**
 * 保存订阅消息
 * @returns {Promise<AxiosResponse>}
 */
export function apiSaveSubscription({ subscription }: { subscription: PushSubscriptionJSON }): Promise<AxiosResponse> {
  return http.post('/save-subscription', { subscription })
}