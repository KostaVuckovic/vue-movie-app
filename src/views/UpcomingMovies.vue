<template>
  <div class="ml-16 pt-4">
    <h1 class="text-copy-tekst text-2xl text-center mb-6">Upcoming movies</h1>
    <div class="flex justify-center py-4 px-3 bg-background-svetla">
      <div class="flex justify-around flex-wrap py-6 w-full sm:max-w-extraMonster md:w-14/15   md:max-w-extraLargeMonster lg:max-w-full lg:min-w-full xl:w-full xl:min-w-godzila xl:max-w-mediumGodzila">
      <div v-for="(movie, index) in allUpcomingMovies" :key="index" class="flex flex-col justify-evenly px-3 py-3 mx-3 lg:mx-2 xl:mx-3 mb-4 w-2/5 lg:w-2/13 min-w-smaller max-w-smallMed lg:min-w-smaller lg:max-w-smallHalf rounded bg-background-pozadina text-copy-tekst transition-all duration-300 cursor-pointer transform hover:border-narandza hover:scale-105" @click="movieDetails(movie.id)">
        <p class="text-center mb-4 truncate tracking-wide">{{movie.title}}</p>
        <img :src="'https://image.tmdb.org/t/p/w200' + movie.poster_path + '?api_key=a06cfa7f0853984e8a69e2db2fd1b8fd'" class="rounded mt-1 max-w-full">
      </div>
      </div>
    </div>
    <Pagination :totalPages="totalPages" :total="totalResults" :currentPage="currentPage" @pagechanged="onPageChange"/>
  </div>
</template>

<script>
import axios from 'axios'
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'PopularMovies',
  components: {
    Pagination
  },
  data(){
    return{
      allUpcomingMovies: null,
      totalPages: 0,
      totalResults: 0,
      currentPage: 1
    }
  },
  mounted(){
    this.getUpcomingMovies()
  },
  methods: {
    getUpcomingMovies(){
      axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=a06cfa7f0853984e8a69e2db2fd1b8fd&language=en-US&page=1')
      .then(response => {
        this.allUpcomingMovies = response.data.results
        this.totalPages = response.data.total_pages
        this.totalResults = response.data.total_results
      })
    },
    movieDetails(id){
      this.$router.push({name: 'MovieDetails', params: {id: id}})
    },
    onPageChange(page) {
      console.log(page)
      this.currentPage = page;
      axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=a06cfa7f0853984e8a69e2db2fd1b8fd&page=${page}`)
      .then(response => {
        this.allUpcomingMovies = response.data.results
        this.totalPages = response.data.total_pages
        this.totalResults = response.data.total_results

      } )
    }
  }
}
</script>

<style>

</style>