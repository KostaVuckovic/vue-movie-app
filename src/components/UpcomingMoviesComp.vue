<template>
  <div class="bg-background-svetla py-3 px-2 mt-4 content-wrapper" :class="getTheme">
    <div class="flex justify-between py-1 px-2 text-xl">
      <p class="text-narandza text-xl md:text-2xl">Upcoming Movies</p>
      <router-link to="/upcoming-movies" class="group text-copy-tekst hover:text-narandza text-xl md:text-2xl transition duration-200 cursor-pointer">View All <i class="fas fa-arrow-circle-right text-copy-tekst group-hover:text-narandza transition duration-200"></i></router-link>
    </div>
    
    <div class="w-full flex justify-center">
      <div class="flex justify-around flex-wrap py-6 w-full sm:max-w-extraMonster md:w-14/15   md:max-w-extraLargeMonster lg:max-w-full lg:min-w-full xl:w-full xl:min-w-godzila xl:max-w-largeGodzila">
      <div v-for="(movie, index) in upcomingMoviesProp" :key="index" class="flex flex-col justify-evenly px-3 py-3 mx-3 lg:mx-1 mb-4 w-2/5 lg:w-2/13 min-w-smaller max-w-smallMed lg:max-w-smaller rounded bg-background-pozadina text-copy-tekst transition-all duration-300 cursor-pointer transform hover:border-narandza hover:scale-105" :class="getTheme" @click="sendToParent(movie.id)">
        <p class="text-center font-medium tracking-wide text-base mb-4 truncate">{{movie.title}}</p>
        
        <img :src="'https://image.tmdb.org/t/p/w200' + movie.poster_path + '?api_key=a06cfa7f0853984e8a69e2db2fd1b8fd'" class="rounded mt-2">
        <div class="mt-2 text-tiny">
          <p><i class="fas fa-star text-zuta"></i> {{movie.vote_average}}/10</p>
          <p><i class="far fa-calendar-alt text-narandza"></i> {{movie.release_date}}</p>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UpcomingMoviesComp',
  props: {
    upcomingMoviesProp: Array
  },
  computed: {
    ...mapGetters(['getTheme'])
  },
  methods: {
    sendToParent(id){
      this.$emit('sendToParent', id)
    }
  }

}
</script>

<style>

</style>