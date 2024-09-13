<template>
  <transition name="fade">
    <button class="install-btn" v-show="installButtonShow" @click="install" ref="installButtonRef">
      {{ text ? text : $t('components.install.defaultText') }}
    </button>
  </transition>
</template>

<script setup lang="ts">
  import { useInstall } from '@/hooks/install'
  defineOptions({
    name: 'Install'
  })

  defineProps<{
    /**
     * 安装按钮文案
     */
    text?: string
  }>()


  const { installButtonRef, installButtonShow, install } = useInstall()
</script>

<style lang="scss" scoped>

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  transform: translate(-50%, 10px)!important;
  opacity: 0;
}

.install-btn {
  height: 50px;
  line-height: 50px;
  border-radius: 8px;
  background-color: #CFBC30;
  color: #fff;
  text-align: center;
  border: none;
  font-size: 1.2rem;
  box-shadow: 0 0 5px 5px rgba($color: #000000, $alpha: 0.2);
}
</style>