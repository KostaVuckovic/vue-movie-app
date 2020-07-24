<template>
  <div class="pt-4 ml-16">
    <h1 class="text-tekst text-5xl text-center mb-8">All</h1>
    <div class="flex justify-around flex-wrap py-4 px-3 bg-svetla">
      <div v-for="movie in movieResults" :key="movie.id" class="movie-card flex flex-col justify-between px-3 py-3 mb-4 max-w-small rounded text-tekst bg-pozadina text-lg transition-all duration-300 cursor-pointer transform hover:border-narandza hover:scale-105" @click="movieDetails(movie.id)">
        <p class="text-center my-auto text-xl">{{movie.title}}</p>
        <img :src="'https://image.tmdb.org/t/p/w200' + movie.poster_path + '?api_key=a06cfa7f0853984e8a69e2db2fd1b8fd'" class="rounded mt-2 max-w-full">
        <div class="mt-2">
          <p><i class="fas fa-star text-zuta"></i> {{movie.vote_average}}/10</p>
          <p><i class="far fa-calendar-alt text-narandza"></i> {{movie.release_date}}</p>
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
name: 'SearchMovie',
components: {
    Pagination
},
data(){
  return{
    querySearch: this.$route.query.movie,
    movieResults: null,
    totalPages: 0,
    totalResults: 0,
    currentPage: 1
  }
},
mounted(){
  this.getResults(this.querySearch)
},
methods: {
  getResults(search){
    axios.get('https://api.themoviedb.org/3/search/movie?api_key=a06cfa7f0853984e8a69e2db2fd1b8fd&language=en-US', {params:{query: search}})
    .then(response => {
      console.log(response)
      this.movieResults = response.data.results
    })

  },
  onPageChange(page) {
      let search = this.querySearch
      this.currentPage = page;
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=a06cfa7f0853984e8a69e2db2fd1b8fd&page=${page}`, {params:{query: search}})
      .then(response => {
        this.movieResults = response.data.results
        this.totalPages = response.data.total_pages
        this.totalResults = response.data.total_results
      } )
    },
    movieDetails(id){
      this.$router.push({path: `/movie/${id}`})
    },
}
}
</script>

<style>

</style>