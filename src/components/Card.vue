<template>
  <div class="card">
    <img class="card-img" :src="poster" alt="poster" @error="handleImageError" />
    <div class="card-footer">
      <router-link :to="'/details/' + idMovie">
        <h3>{{ title }}</h3>
      </router-link>
      <small>{{ year + " | " + $t('common.' + type) }}</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import ErrorImg from '@/assets/error.svg'

defineOptions({ name: 'Card' })

// 定义 Props 接口
interface IProps {
  title: string;
  year: string;
  type: string;
  idMovie?: string; // 可选属性
  poster: string;
}

withDefaults(
  defineProps<IProps>(),
   {
    title: 'Iron Man 3',
    year: '2013',
    type: 'Movie',
    idMovie: '',
    poster: 'src/assets/poster.jpeg'
  }
);

const handleImageError = (evt: any ) => {
  if (evt && evt.target) {
   // 防止无限循环触发错误
   evt.target.onerror = null;
   evt.target.src = ErrorImg
  }
}

</script>

<style lang="scss">
@import './src/scss/_card';
.card-img {
  color: #fff;
}
</style>