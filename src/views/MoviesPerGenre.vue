<template>
  <div class="pt-4 mb-16 lg:mb-0 lg:ml-16 min-h-screen">

    <h1 class="text-copy-tekst text-2xl lg:text-3xl xl:text-4xl text-center mb-6 lg:hover:cursor-default">All {{genreName}} movies</h1>
    <div class="flex justify-center py-4 px-3 bg-background-svetla">
      <div class="flex justify-around flex-wrap py-6 w-full sm:max-w-extraMonster md:w-14/15   md:max-w-extraLargeMonster lg:max-w-full lg:min-w-full xl:w-full xl:min-w-godzila xl:max-w-mediumGodzila">
      <div v-for="movie in allMoviesPerGenre" :key="movie.id" class="flex flex-col justify-evenly px-3 py-3 mx-3 lg:mx-2 xl:mx-3 mb-4 w-2/5 lg:w-2/13 min-w-smaller max-w-smallMed lg:min-w-smaller lg:max-w-smallHalf rounded bg-background-pozadina text-copy-tekst transition-all duration-300 cursor-pointer transform hover:border-narandza hover:scale-105" @click="movieDetails(movie.id)">
        <p class="text-center font-medium truncate mb-4">{{movie.title}}</p>
        <img :src="'https://image.tmdb.org/t/p/w154' + movie.poster_path + '?api_key=a06cfa7f0853984e8a69e2db2fd1b8fd'" class="rounded mt-2 max-w-full" @error="defaultImage">
        <div class="mt-2">
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
name: 'MoviesPerGenre',
components: {
    Pagination,
},
data(){
  return{
    genreId: this.$route.params.genre,
    allMoviesPerGenre: null,
    totalPages: 0,
    totalResults: 0,
    currentPage: 1,
    genreName: ''
  }
},
mounted() {
  this.showMovies(this.genreId)
},
computed: {
  ...mapGetters(['getTheme'])
},
methods: {
  showMovies(id){
    axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=a06cfa7f0853984e8a69e2db2fd1b8fd&language=en-US')
    .then(response => {
      this.genreName = response.data.genres.find(genre => genre.id == this.genreId).name.toLowerCase()
    })
    //set timeout for fetching simulation
    setTimeout(() => {
      axios.get('https://api.themoviedb.org/3/discover/movie?api_key=a06cfa7f0853984e8a69e2db2fd1b8fd', {params:{with_genres: id}})
      .then(response => {
        this.allMoviesPerGenre = response.data.results
        this.totalPages = response.data.total_pages
        this.totalResults = response.data.total_results
      })
    }, 1200)
  },
  onPageChange(page) {
        let id = this.genreId
        this.currentPage = page;
        //set timeout for fetching simulation
        setTimeout(() => {
          axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=a06cfa7f0853984e8a69e2db2fd1b8fd&page=${page}`, {params:{with_genres: id}})
          .then(response => {
            this.allMoviesPerGenre = response.data.results
            this.totalPages = response.data.total_pages
            this.totalResults = response.data.total_results
          } )
        }, 800)
    },
    movieDetails(id){
      this.$router.push({path: `/movie/${id}`})
    },
    defaultImage(e){
      e.target.src = 'https://media.comicbook.com/files/img/default-movie.png'
    },
}
}
</script>