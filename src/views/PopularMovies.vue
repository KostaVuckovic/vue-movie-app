<template>
  <div class="pt-4 lg:ml-16 min-h-screen" :class="getTheme">

    <Preloader/>

    <h1 class="text-copy-tekst text-2xl lg:text-3xl xl:text-4xl text-center mb-6">Most popular movies</h1>
    
    <div class="flex justify-center py-4 px-3 bg-background-svetla content-wrapper">

      <div class="flex justify-around flex-wrap py-6 w-full sm:max-w-extraMonster md:w-14/15   md:max-w-extraLargeMonster lg:max-w-full lg:min-w-full xl:w-full xl:min-w-godzila xl:max-w-mediumGodzila">

        <div v-for="(movie, index) in allPopularMovies" :key="index" class="flex flex-col justify-evenly px-3 py-3 mx-3 lg:mx-2 xl:mx-3 mb-4 w-2/5 lg:w-2/13 min-w-smaller max-w-smallMed lg:min-w-smaller lg:max-w-smallHalf rounded bg-background-pozadina text-copy-tekst transition-all duration-300 cursor-pointer transform hover:border-narandza hover:opacity-30 group overflow-hidden relative" @click="movieDetails(movie.id)">

          <p class="text-center font-medium truncate mb-4 transform group-hover:-translate-x-48 transition duration-500">{{movie.title}}</p>
          <img :src="'https://image.tmdb.org/t/p/w185' + movie.poster_path + '?api_key=a06cfa7f0853984e8a69e2db2fd1b8fd'" @error="defaultImage" class="rounded mt-2 max-w-full transform group-hover:scale-150 transition duration-700">

          <div class="mt-2 text-tiny transform group-hover:translate-x-48 transition duration-500">

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
import { mapGetters, mapActions } from 'vuex'
import Preloader from '../components/Preloader.vue'

export default {
  name: 'PopularMovies',
  components: {
    Pagination,
    Preloader
  },
  data(){
    return{
      allPopularMovies: null,
      totalPages: 0,
      totalResults: 0,
      currentPage: parseInt(localStorage.getItem('current-page')) || 1,
    }
  },
  mounted(){
    this.getPopularMovies(this.currentPage),
    this.toggleLoad()
  },
  destroyed(){
    localStorage.removeItem('current-page')
  },
  computed: {
    ...mapGetters(['getTheme'])
  },
  methods: {
    //get all popular movies
    getPopularMovies(page){
      //set timeout for fetching simulation
      setTimeout(() => {
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=a06cfa7f0853984e8a69e2db2fd1b8fd&page=${page}`)
        .then(response => {
          this.allPopularMovies = response.data.results
          this.totalPages = response.data.total_pages
          this.totalResults = response.data.total_results
        this.endOfLoading()
        })
      }, 1200)
    },
    movieDetails(id){
      this.$router.push({path: `movie/${id}`})
    },
    onPageChange(page) {
      this.currentPage = page;
      localStorage.setItem('current-page', this.currentPage)
      //set timeout for fetching simulation
      setTimeout(() => {
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=a06cfa7f0853984e8a69e2db2fd1b8fd&page=${page}`)
        .then(response => {
          this.allPopularMovies = response.data.results
          this.totalPages = response.data.total_pages
          this.totalResults = response.data.total_results
        } )
      }, 500)
    },
    defaultImage(e){
      e.target.src = 'https://media.comicbook.com/files/img/default-movie.png'
    },
    ...mapActions(['endOfLoading', 'toggleLoad'])
  }
}
</script>


