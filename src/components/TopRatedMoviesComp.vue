<template>
  <div class="bg-background-svetla py-3 px-2 mt-4 content-wrapper" :class="getTheme">
    <div class="flex justify-between py-1 px-2 text-tekst text-xl">
      <p class="text-narandza text-xl md:text-2xl lg:hover:cursor-default">Top Rated Movies</p>
      <router-link to="/top-rated" :class="getTheme" class="group hover:text-narandza text-copy-tekst text-xl md:text-2xl transition duration-200 cursor-pointer">View All <i class="fas fa-arrow-circle-right text-copy-tekst group-hover:text-narandza transition duration-200"></i></router-link>
    </div>
    
    <div class="w-full flex justify-center">
      <div class="flex justify-around flex-wrap py-6 w-full sm:max-w-extraMonster md:w-14/15   md:max-w-extraLargeMonster lg:max-w-full lg:min-w-full xl:w-full xl:min-w-godzila xl:max-w-extraLargeGodzila">
      <div v-for="(movie, index) in topRatedMoviesProp" :key="index" class="bg-background-pozadina flex flex-col justify-evenly px-3 py-3 mx-3 lg:mx-1 mb-4 w-2/5 lg:w-2/13 min-w-smaller max-w-smallMed lg:max-w-smaller rounded text-copy-tekst transition-all duration-300 cursor-pointer transform hover:border-narandza hover:opacity-30 group relative overflow-hidden" :class="getTheme" @click="sendToParent(movie.id)">
        <p class="text-center font-medium truncate mb-4 transform group-hover:-translate-x-48 transition duration-500">{{movie.title}}</p>
        <img :src="'https://image.tmdb.org/t/p/w200' + movie.poster_path + '?api_key=a06cfa7f0853984e8a69e2db2fd1b8fd'" class="rounded mt-2 max-w-full transform group-hover:scale-150 transition duration-700">
        <div class="mt-2 text-tiny transform group-hover:translate-x-48 transition duration-500">
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
name: 'TopRatedMoviesComp',
props: {
  topRatedMoviesProp: Array
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