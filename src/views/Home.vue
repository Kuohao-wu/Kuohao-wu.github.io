<template>
   <section id="header-home">
      <div class="brand">
         <strong>OMDB</strong>
        <div class="brand-right">
         <set-lang></set-lang>
         <router-link to="/bookmark" class="bookmark">
            <img :src="BookMarkImg"/>
            <span>{{ bookmarkCount }}</span>
         </router-link>
        </div>
      </div>
      <div class="intro">
         <h3>
            {{ $t('home.intro1') }}
            <br>
            {{ $t('home.intro2') }}
         </h3>
      </div>
      <!-- Search bar -->
      <div class="search-wrapper">
         <div class="search-bar">
            <input 
            v-model="keyWord"
            v-on:keyup.enter="getData"
            type="text" :placeholder="$t('home.search.placeholder')" />
            <button @click="getData" type="button">
               <i class="fa fa-search" ></i>
            </button>
         </div>
      </div>
      <!-- Categorys -->
      <div class="category-wrapper">
         <strong>{{ $t('home.categories') }}</strong>
         <div class="badge-wrapper">
            <template v-for="item in categorys" :key="item.id">
               <div 
               @click="badgeClick(item.name)" 
               :class="badgeActive === item.name ? 'active' : ''"
               class="badge"> 
                  <img :src="TakeBoardImg" alt="" />
                  <p>{{ $t(`common.${item.name.toLowerCase()}`) }}</p>
               </div>
            </template>
         </div>
      </div>
      
      <EmptyState :isLoad="isLoad" :show-empty-state="showEmptyState" :is-empty-state="isEmptyState" ></EmptyState>
      
      <!-- Card components -->
      <div v-if="response && !isLoad" class="card-wrapper">
         <strong v-if="keyWordText">{{ $t('home.searchResult') }} '{{ keyWordText }}'</strong>
         <template v-for="item in response" :key="item.imdbID">
            <Card :title="item.Title" :poster="item.Poster" :id-movie="item.imdbID" :year="item.Year" :type="item.Type" ></Card>
         </template>
      </div>

      <Install class="install-btn"></Install>
   </section>
</template>

<script lang="ts" setup>
   import { apiSearchList } from '@/api';
   import Card from '@/components/Card.vue'
   import EmptyState from '@/components/EmptyState.vue'
   import SetLang from '@/components/SetLang.vue'
   import { IBookMarkCache, IMovie } from '@/types/bookmark';
   import { onMounted, ref, watch } from "vue";
   import Install from "@/components/Install.vue";
   import TakeBoardImg from '@/assets/take-board-64.png'
   import BookMarkImg from '@/assets/bookmark-64.png'
   import { useNotification } from "@/hooks/notification";
   import { useRouter } from "vue-router";

   const router = useRouter()
   

   defineOptions({
      name: 'Home'
   })

   const categorys = ref([
      {name: 'Movie', id: 1},
      {name: 'Episode', id: 2},
      {name: 'Series', id: 3}
   ])

   const bookmarkCount = ref(0)
   const badgeActive = ref('Movie')
   const keyWord = ref('')
   const keyWordText = ref('')
   const response = ref<Array<IMovie>>([])
   const responseStatus = ref('True')
   const isEmptyState = ref(true)
   const showEmptyState = ref(true)
   const isLoad = ref(false)

   watch(responseStatus, (val) => {
      if ( val === 'False' ) {
         isEmptyState.value = false
         showEmptyState.value = true
      }  else {
         showEmptyState.value = false
      }
   })

   onMounted(() => {
      const localMovieListStr = localStorage.getItem('listMovie_omdb') as string
      const localBookMarkStr = localStorage.getItem('listBookmark_omdb')  as string
      
      if (localMovieListStr) {
           response.value = JSON.parse(localMovieListStr)
           responseStatus.value = 'True'
           keyWordText.value = localStorage.getItem('lastKeyWord_omdb') as string
        }
        
        if (localBookMarkStr) {
           let bookmarkCache:IBookMarkCache = JSON.parse(localBookMarkStr)
           bookmarkCount.value = bookmarkCache.bookmark.length
        }
   })

   const showLoader = (show: boolean) => {
      if (show) {   
         showEmptyState.value = true
         isLoad.value = true
      } else {
         showEmptyState.value = false
         isLoad.value = false
      }   
   }

   const getData = async () => {
      const validKeyWord = keyWord.value.split(' ').join('+')
      if (validKeyWord.split('').length <= 0) return
         
      showLoader(true)
      try {
         const { data } = await apiSearchList({ s: validKeyWord })
         response.value = data.Search
         responseStatus.value = data.Response
         keyWordText.value = keyWord.value
         
         if (responseStatus.value === 'True') {
            localStorage.setItem('listMovie_omdb', JSON.stringify(data.Search))
            localStorage.setItem('lastKeyWord_omdb', keyWord.value)
         }
      } catch (err) {
         console.error('search error', err) 
      } finally {
         showLoader(false)
      }
   }
            
   const badgeClick = (name:string) => {
      badgeActive.value = name
      getData()
   }

   const { showNotification } = useNotification({ router })

   showNotification('查看你的收藏列表~')

</script>

<style lang="scss">
   
   @import './src/scss/view-styles/_home';
   
</style>