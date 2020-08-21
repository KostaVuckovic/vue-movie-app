<template>
  <div class="flex flex-col bg-background-svetla" :class="getTheme" v-if="recommendedMoviesProp">
      <h1 class="text-xl md:text-2xl text-copy-tekst ml-4 mt-6 z-30 lg:hover:cursor-default" v-if="recommendedMoviesProp.length > 0">Recommended Movies</h1>
      <div class="flex justify-center mt-4 z-30" v-if="recommendedMoviesProp.length > 5">
        <div class="flex justify-around flex-wrap py-6 w-full sm:max-w-extraMonster md:w-14/15 md:max-w-extraLargeMonster lg:max-w-full lg:min-w-full xl:w-full xl:min-w-godzila xl:max-w-largeGodzila">
        <div v-for="movie in recommendedMoviesProp" :key="movie.id" class="flex flex-col justify-evenly px-3 py-3 mx-3 lg:mx-1 mb-4 w-2/5 lg:w-2/13 min-w-smaller max-w-smallMed lg:max-w-smaller rounded bg-background-pozadina text-copy-tekst transition-all duration-300 cursor-pointer transform hover:border-narandza hover:opacity-30 relative overflow-hidden group" @click="sendToParent(movie.id)">
        <p class="text-center mb-4 truncate tracking-wide text-tiny sm:text-base transform group-hover:-translate-x-48 transition duration-500">{{movie.title}}</p>
        <img :src="'https://image.tmdb.org/t/p/w154' + movie.poster_path + '?api_key=a06cfa7f0853984e8a69e2db2fd1b8fd'" @error="defaultImage" class="rounded mt-2 transform group-hover:scale-150 transition duration-700">
        <div class="mt-2 text-tiny sm:text-base transform group-hover:translate-x-48 transition duration-500">
          <p><i class="fas fa-star text-zuta"></i> {{movie.vote_average}}/10</p>
          <p><i class="far fa-calendar-alt text-narandza"></i> {{movie.release_date}}</p>
        </div>
      </div>
      </div>
    </div>
      <div class="flex mt-4" v-else-if="recommendedMoviesProp.length > 0">
        <div class="flex justify-start flex-wrap py-6 w-full sm:max-w-extraMonster md:w-14/15 md:max-w-extraLargeMonster lg:max-w-full lg:min-w-full xl:w-full xl:min-w-godzila xl:max-w-largeGodzila">
        <div v-for="movie in recommendedMoviesProp" :key="movie.id" class="flex flex-col justify-evenly px-3 py-3 mx-3 lg:mx-4 mb-4 w-2/5 lg:w-2/13 min-w-smaller max-w-smallMed lg:max-w-smaller rounded bg-background-pozadina text-copy-tekst transition-all duration-300 cursor-pointer transform hover:border-narandza hover:opacity-30 relative overflow-hidden group" @click="sendToParent(movie.id)">
        <p class="text-center mb-4 truncate tracking-wide text-tiny sm:text-base transform group-hover:-translate-x-48 transition duration-500">{{movie.title}}</p>
        <img :src="'https://image.tmdb.org/t/p/w154' + movie.poster_path + '?api_key=a06cfa7f0853984e8a69e2db2fd1b8fd'" @error="defaultImage" class="rounded mt-2 transform group-hover:scale-150 transition duration-700">
        <div class="mt-2 text-tiny sm:text-base transform group-hover:translate-x-48 transition duration-500">
          <p><i class="fas fa-star text-zuta"></i> {{movie.vote_average}}/10</p>
          <p><i class="far fa-calendar-alt text-narandza"></i> {{movie.release_date}}</p>
        </div>
      </div>
      </div>
    </div>
    <div v-else class="hidden">
    </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex' 

export default {
name: 'RecommendedMoviesComp',
props:{
  recommendedMoviesProp: Array
},
computed: {
  ...mapGetters(['getTheme'])
},
methods: {
  sendToParent(id){
    this.$emit('sendToParent', id)
  },
  defaultImage(e){
    e.target.src = 'https://media.comicbook.com/files/img/default-movie.png'
  }
}
}
</script>
