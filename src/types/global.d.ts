// 定义 BeforeInstallPromptEvent 类型
declare interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
  platforms: string[];
}

declare interface WindowEventMap {
  'beforeinstallprompt': BeforeInstallPromptEvent;
}
