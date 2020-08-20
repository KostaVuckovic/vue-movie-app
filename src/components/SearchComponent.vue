<template>
<div class="w-4/5 max-w-large mt-8">
  <SearchFocus @keyup="focusSearch" />
  <div class="relative">
  <input
        type="text"
        placeholder="Search (Press  &quot;/&quot; to focus)"
        class="search-input bg-tekst border border-svetla rounded-full px-4 pl-10 py-2 outline-none focus:border-narandza w-full"
        ref="search"
        v-model="searchQuery"
        id="element"
        @blur="searchResultsVisible = false, showNavBar()"
        @focus="searchResultsVisible = true, hideNavBar()"
        @keydown.esc="searchResultsVisible = false"
        @input="softReset"
        @keyup="getMoviesForSearch(searchQuery)"
        @keydown.up.prevent="highlightPrev"
        @keydown.down.prevent="highlightNext"
        @keydown.enter="movieDetails"
        v-scroll-to="'#element'"
      >

      <!-- search icon -->
      <div class="absolute top-0 ml-3" style="top:10px">
        <svg fill="currentColor" class="text-svetla h-5 w-5" viewBox="0 0 24 24" width="24" height="24"><path class="heroicon-ui" d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path></svg>
      </div>

      <!-- 'x' for reset query -->
      <div v-if="searchQuery.length > 0" class="absolute top-0 right-0 font-extrabold text-2xl mr-3 cursor-pointer text-svetla hover:text-pozadina" style="top:2px;" @click="reset">
        &times;
      </div>

    </div>
      <!-- body for results -->
      <transition name="fade">
      <div v-if="searchQuery.length > 0 && searchResultsVisible" class="absolute bg-tekst border left-0 right-0 w-11/12 max-w-monster m-auto text-left mb-4 mt-2 rounded-lg overflow-hidden z-10 overflow-y-auto" style="max-height: 32rem" :class="theme === 'theme-dark' ? 'results-dark' : 'results-light'">
        <div class="flex flex-col w-full" ref="results">
          <div v-for="(post, index) in searchResults" :key="index" @click="goToMovie(post.item.id)" class="flex justify-between border-b border-svetla cursor-pointer p-3 hover:bg-narandzaSvetla" @mousedown.prevent="searchResultsVisible = true" :class="{'bg-narandzaSvetla': index === highlightedIndex}">
              <img :src="'https://image.tmdb.org/t/p/w200' + post.item.poster_path + '?api_key=a06cfa7f0853984e8a69e2db2fd1b8fd'" @error="defaultImage" class="rounded w-1/6 max-w-smaller h-auto">
              <div class="flex flex-col ml-2 w-96">
              <p class="border-b-2 font-bold border-pozadina text-base sm:text-lg truncate">{{post.item.title}}({{post.item.release_date}})</p>
              <p class="text-tiny sm:text-base overflow-y-hidden leading-4 sm:leading-5 mt-2 h-12 sm:h-20">{{post.item.overview}}</p>
              </div>
          </div>
          <div v-if="searchResults.length === 0" class="w-full cursor-pointer p-4">
            <p class="my-0">No results for '<strong>{{ searchQuery }}</strong>'</p>
          </div>

        </div>
      </div>
      </transition>
  </div> 
</template>

<script>
import SearchFocus from '@/components/SearchFocus.vue'
import axios from 'axios'
import {mapGetters} from 'vuex'

export default {
name: 'SearchComponent',
components: {
  SearchFocus
},
data() {
  return{
    searchQuery: '',
    searchResultsVisible: false,
    highlightedIndex: 0,
    allMoviesForSearch: null,
    searchResults: [],
    options: {
      shouldSort: true,
      includeMatches: true,
      threshold: 0.5,
      location: 0,
      distance: 500,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['title']
    },
      theme: 'theme-dark'
  }
},
computed: {
  ...mapGetters(['getTheme'])
},
mounted() {
  this.theme = localStorage.getItem('theme') || 'theme-dark'
},
methods: {
  focusSearch(e){
      if(e.key === '/'){
        this.$refs.search.focus()
      }
    },
    reset(){
      this.searchQuery = ''
      this.highlightedIndex = 0
    },
    softReset(){
      this.searchResultsVisible = true
      this.highlightedIndex = 0
    },
    getMoviesForSearch(search){
      if(search !== ''){
        axios.get('https://api.themoviedb.org/3/search/movie?api_key=a06cfa7f0853984e8a69e2db2fd1b8fd&language=en-US', {params:{query: search}})
      .then(response => {
        this.allMoviesForSearch = response.data.results
      })
      .then(() => {
        this.$search(this.searchQuery, this.allMoviesForSearch, this.options)
        .then(results => {
        this.searchResults = results
        })
      })
      .catch(error => {
        console.log(error)
      })
      }
    },
    highlightNext(){
      if(this.highlightedIndex < this.searchResults.length-1){
        this.highlightedIndex += 1
        this.$refs.results.children[this.highlightedIndex].scrollIntoView({block: 'nearest'})
      }
    },
    highlightPrev(){
      if(this.highlightedIndex > 0){
        this.highlightedIndex -= 1
        this.$refs.results.children[this.highlightedIndex].scrollIntoView({block: 'nearest'})
      }
    },
    movieDetails(){
      if(this.searchResults[this.highlightedIndex]){
        let id = this.searchResults[this.highlightedIndex].item.id
        this.$router.push({path: `movie/${id}`})
      }
    },
    defaultImage(e){
      e.target.src = 'https://media.comicbook.com/files/img/default-movie.png'
    },
    goToMovie(id){
      this.$router.push({path: `/movie/${id}`})
    },
    hideNavBar(){
      this.$store.dispatch('hideNavBar', screen.width)
    },
    showNavBar(){
      this.$store.dispatch('showNavBar', screen.width)
    },
}
}
</script>
