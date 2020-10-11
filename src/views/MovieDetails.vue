<template>
  <div class="bg-background-svetla min-h-screen">

    <Preloader/>

    <div class="content-wrapper bg-background-svetla lg:ml-16" :class="[{getTheme}, getTheme === 'theme-dark' ? 'wrapper' : 'light-wrapper']">
    <div class="w-full max-w-mediumGodzila xl:mx-auto relative overflow-hidden object-cover py-4">
    <img v-if="backDrop" :src="'https://image.tmdb.org/t/p/w1280' + backDrop + '?api_key=a06cfa7f0853984e8a69e2db2fd1b8fd'" alt="movie_image" class="hidden lg:block rounded absolute top-0 left-0 object-cover" :class="getTheme === 'theme-dark' ? 'opacity-10' : 'opacity-20'">
    <div v-if="movieImage" class="flex flex-col lg:flex-row items-center lg:items-start px-6 py-6 z-30">
        <img :src="'https://image.tmdb.org/t/p/w300' + movieImage + '?api_key=a06cfa7f0853984e8a69e2db2fd1b8fd'" @error="defaultImage" alt="movie_image" class="rounded w-full max-w-medium sm:max-w-large mb-4 lg:mr-6 z-30">
      
        <div class="flex flex-col z-30">
          <div class="py-2 mb-2 flex flex-wrap text-tiny sm:text-base">
            <span v-for="genre in genresForMovie" :key="genre.id" class="mr-2 mb-2 px-2 py-1 font-medium bg-background-tekst text-background-pozadina rounded lg:cursor-pointer" @click="goToGenre(genre.id)">{{genre.name}}</span>
          </div>
          <h1 v-if="movieDetails" class="text-3xl font-bold text-copy-tekst">{{movieDetails.title}}</h1>
          <div v-if="movieDetails" class="flex mt-2 text-base font-medium">
            <p class="text-copy-tekst"><i class="far fa-calendar-alt text-narandza"></i> {{movieDetails.release_date}}</p>
            <p class="text-copy-tekst ml-4"><i class="far fa-clock"></i> {{movieDetails.runtime}} min</p>
          </div>
          <div v-if="movieDetails" class="flex text-base font-medium">
            <p class="text-copy-tekst"><i class="fas fa-star text-zuta"></i> {{movieDetails.vote_average}}/10 ({{movieDetails.vote_count}})</p>  
          </div>
          <div v-if="movieDetails" class="py-2 mt-4 text-base">
            <p class="text-copy-tekst tracking-wide">{{movieDetails.overview}}</p>
          </div>
        </div>
    </div>
    </div>
    <RecommendedMoviesComp :recommendedMoviesProp="recommendedMovies" @sendToParent="movieDetailsRecommend"/>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
import RecommendedMoviesComp from '../components/RecommendedMoviesComp.vue';
import { mapGetters, mapActions } from 'vuex'
import Preloader from '../components/Preloader.vue'

export default {
  name: 'MovieDetails',
  components: {
    RecommendedMoviesComp,
    Preloader
  },
  data(){
    return{
      movieId: this.$route.params.id,
      movieDetails: null,
      movieImage: '',
      backDrop: '',
      genresForMovie: null,
      recommendedMovies: null,
    }
  },
  mounted(){
    this.getMovieDetails(this.movieId),
    this.getRecommendedMovies(this.movieId),
    this.toggleLoad()
  },
  computed: {
    ...mapGetters(['getTheme'])
  },
  methods: {
    getMovieDetails(id){
      //set timeout for fetching simulation
      setTimeout(() => {
      axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=a06cfa7f0853984e8a69e2db2fd1b8fd&language=en-US`)
      .then(response => {
        this.movieDetails = response.data
        this.genresForMovie = response.data.genres
        this.movieImage = response.data.poster_path
        this.backDrop = response.data.backdrop_path
        // setTimeout(() => {
          this.endOfLoading()
        // }, 1200)
      })
      }, 1200)
    },
    getRecommendedMovies(id){
      axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=a06cfa7f0853984e8a69e2db2fd1b8fd&language=en-US&page=1`)
      .then(response => {
        this.recommendedMovies = response.data.results.slice(0,6)
      })
    },
    movieDetailsRecommend(id){
      this.$router.push({name: 'MovieDetails', params: {id: id}})
    },
    defaultImage(e){
      e.target.src = 'https://media.comicbook.com/files/img/default-movie.png'
    },
    goToGenre(id){
      this.$router.push({ name: 'MoviesPerGenre', params: {genre: id}})
    },
    ...mapActions(['endOfLoading', 'toggleLoad'])
  }
}
</script>

