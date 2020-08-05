<template>
  <div class="pt-4 mb-16 lg:mb-0 lg:ml-16 min-h-screen">


    <h1 class="text-copy-tekst text-2xl lg:text-3xl xl:text-4xl text-center mb-6">Top rated movies</h1>

    <div class="flex justify-center py-4 px-3 bg-background-svetla content-wrapper">
      <div class="flex justify-around flex-wrap py-6 w-full sm:max-w-extraMonster md:w-14/15   md:max-w-extraLargeMonster lg:max-w-full lg:min-w-full xl:w-full xl:min-w-godzila xl:max-w-mediumGodzila">
      <div v-for="(movie, index) in allTopRatedMovies" :key="index" class="flex flex-col justify-evenly px-3 py-3 mx-3 lg:mx-2 xl:mx-3 mb-4 w-2/5 lg:w-2/13 min-w-smaller max-w-smallMed lg:min-w-smaller lg:max-w-smallHalf rounded bg-background-pozadina text-copy-tekst transition-all duration-300 cursor-pointer transform hover:border-narandza hover:scale-105" @click="movieDetails(movie.id)">
        <p class="text-center font-medium truncate mb-4">{{movie.title}}</p>
        <img :src="'https://image.tmdb.org/t/p/w154' + movie.poster_path + '?api_key=a06cfa7f0853984e8a69e2db2fd1b8fd'" class="rounded mt-2 max-w-full">
        <div class="mt-2 text-tiny">
          <p><i class="fas fa-star text-zuta"></i> {{movie.vote_average}}/10</p>
          <p><i class="far fa-calendar-alt text-narandza"></i> {{movie.release_date}}</p>
        </div>
      </div>
    </div>
    </div>

    <Pagination :totalPages="totalPages" :total="totalResults" :currentPage="currentPage" @pagechanged="onPageChange"/>

  </div>
</template>

<script>
import axios from 'axios'
import Pagination from '@/components/Pagination.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'TopRatedMovies',
  components: {
    Pagination,
  },
  data(){
    return{
      allTopRatedMovies: null,
      totalPages: 0,
      totalResults: 0,
      currentPage: 1,
    }
  },
  created(){
    this.getTopRatedMovies()
  },
  computed: {
    ...mapGetters(['getTheme'])
  },
  methods: {
    //get all top rated movies
    getTopRatedMovies(){
      //set timeout for fetching simulation
      setTimeout(() => {
        axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=a06cfa7f0853984e8a69e2db2fd1b8fd&language=en-US&page=1')
        .then(response => {
          this.allTopRatedMovies = response.data.results
          this.totalPages = response.data.total_pages
          this.totalResults = response.data.total_results
        })
      }, 1200)
    },
    movieDetails(id){
      this.$router.push({path: `movie/${id}`})
    },
    onPageChange(page) {
      this.currentPage = page;
      //set timeout for fetching simulation
      setTimeout(() => {
        axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=a06cfa7f0853984e8a69e2db2fd1b8fd&page=${page}`)
        .then(response => {
          this.allTopRatedMovies = response.data.results
          this.totalPages = response.data.total_pages
          this.totalResults = response.data.total_results
        } )
      }, 500)
    }
  }
}
</script>