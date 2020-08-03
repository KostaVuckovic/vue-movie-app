<template>
  <div class="flex flex-col items-center py-12 transition-all duration-200" :class="getTheme === 'theme-dark' ? 'land' : 'light-theme-background'">
    <div class="flex flex-col items-center group">
      <div class="relative w-full flex flex-col justify-center items-center">
        <img src="../../src/assets/cinema.svg" alt="movieglasses" class="w-40 sm:w-48 xl:w-56 transition-all duration-300 transform lg:group-hover:scale-75">
        <div class="lg:bg-background-pozadina transform lg:group-hover:translate-y-4 px-4 py-1 transition duration-200 absolute bottom-0 opacity-0 lg:group-hover:opacity-100 lg:rounded-full" :class="getTheme">
          <p class="text-center font-mono text-copy-tekst font-bold lg:hover:cursor-default" :class="getTheme">Designed with <i class="fas fa-heart text-crvena"></i> by Kosta Vuckovic</p>
        </div>
        
      </div>
      
      <span class="logo text-5xl sm:text-6xl xl:text-7xl font-bold text-narandza transition-all duration-300 hover:cursor-default">MovieBase</span>
    </div>
   
    <SearchComponent/>

  </div>
</template>

<script>
import SearchComponent from '@/components/SearchComponent.vue'
import {mapGetters} from 'vuex'

export default {
name: 'LandingComp',
components: {
  SearchComponent
},
computed: {
  ...mapGetters(['getTheme'])
}
}
</script>