<template>
      <nav :class="[{hidden:this.isMobile}, {'hideNav': !showNav},getTheme === 'theme-dark' ? 'nav-dark' : 'nav-light']" class="navigation w-screen lg:w-16 h-16 lg:h-screen lg:overflow-y-scroll lg:overflow-x-hidden lg:hover:w-64 fixed bottom-0 lg:left-0 z-50 transition-all duration-200 ease-in-out">

        <ul class="content-wrapper flex lg:flex-col justify-evenly lg:items-center lg:justify-start py-0 px-0 bg-background-pozadina h-full group" :class="getTheme">

          <li class="w-full hidden lg:block">
            <router-link to="/" class="flex items-center h-full lg:h-20 text-background-narandza transition-all ease-in-out duration-200" :class="getTheme">
            <div class="hidden transition-all ease-in-out duration-200 w-48 lg:group-hover:flex ml-4">
              <img src="../../src/assets/cinema.svg" alt="movieglasses" class="w-8 mr-1">
              <span class="logo text-2xl text-narandza m-0" >MovieBase</span>
            </div>
              <i key="fas fa" class="fas fa-backward text-3xl text-copy-svetlija my-0 mx-3 transform rotate-0 transition-all duration-300 group-hover:rotate-180 lg:group-hover:text-narandza"></i>
            </router-link>
          </li>

          <li class="w-full" @click="hideGenresIfOpen()">
            <router-link to="/" class="flex justify-center lg:justify-start items-center h-full lg:h-20 text-copy-svetlija transition-all ease-in-out duration-200 lg:hover:bg-background-svetlija lg:hover:text-copy-nav_link_hover" :class="getTheme">
              <i class="fas fa-home text-3xl my-0 lg:mx-3"></i>
              <span class="hidden ml-4 text-xl lg:group-hover:block font-medium">Home</span>
            </router-link>
          </li>

          <li class=" w-full lg:active:text-narandza" @click="showGenres" :class="{active: isActive}">
            <p class="flex items-center justify-center lg:justify-start h-full lg:h-20 text-copy-svetlija transition-all ease-in-out duration-200 cursor-pointer lg:hover:bg-background-svetlija lg:hover:text-copy-nav_link_hover">
              <i class="fas fa-align-justify text-3xl my-0 lg:mx-4"></i>
              <span class="hidden ml-4 text-xl lg:group-hover:block font-medium">Genres</span>
            </p>
            <div class="genres w-full md:max-w-largeMonster md:mx-auto max-h-extraLarge lg:max-h-full hidden overflow-y-hidden lg:overflow-y-hidden overflow-x-hidden absolute lg:static bottom-6xl lg:bottom-auto left-0 lg:left-auto right-0 lg:right-auto bg-background-pozadina cursor-pointer group" :class="getTheme">
              <h1 class="text-2xl text-center py-3 text-narandza lg:hidden font-medium">Popular genres</h1>
              <div class="flex flex-wrap">
                 <div class="text-center text-tiny lg:text-base text-copy-tekst hover:bg-tekst hover:text-narandza w-1/2 lg:w-full py-2 lg:py-4" v-for="genre in genres" :key="genre.id" @click="goToGenre(genre.id)">
                <p class="block w-full">
                  {{genre.name}}
                </p>
              </div>
              </div>
             
            </div>
          </li>

          <li class="content-wrapper w-full bg-background-pozadina" :class="getTheme">
            <router-link to="/" class="flex justify-center lg:justify-start items-center h-full lg:h-20 text-copy-svetlija transition-all ease-in-out duration-200 lg:hover:bg-background-svetlija lg:hover:text-copy-nav_link_hover">
              <i class="far fa-calendar-check text-3xl my-0 mx-4"></i>
              <span class="hidden ml-4 text-xl lg:group-hover:block font-medium">Year</span>
            </router-link>
          </li>

          <li class="content-wrapper w-full lg:mt-auto bg-background-pozadina cursor-pointer" :class="getTheme" @click="setTheme()">
            <p class="flex items-center justify-center lg:justify-start h-full lg:h-20 text-copy-svetlija transition-all ease-in-out duration-200 cursor-pointer lg:hover:bg-background-svetlija lg:hover:text-copy-nav_link_hover">
              <span key="fa-sun" v-if="getTheme==='theme-dark'"><i class="fas fa-sun text-3xl my-0 mx-4"></i></span>
              <span key="fa-moon" v-else ><i class="fas fa-moon text-3xl my-0 mx-4"></i></span>
              <span v-if="getTheme==='theme-dark'" class="hidden ml-4 text-xl lg:group-hover:block font-medium">Light</span>
              <span v-else class="hidden ml-4 text-xl lg:group-hover:block font-medium">Dark</span>
            </p>
          </li>

        </ul>

      </nav>
</template>

<script>
import axios from 'axios'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'NavBar',
  data(){
    return{
      genres: null,
      isActive: false,
      showNav: true,
      lastScrollPosition: 0
    }
  },
  mounted(){
    this.getGenres(),
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },
  computed: {
    ...mapGetters(['isMobile', 'getTheme'])
  },
  methods: {
    onScroll () {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
      if (currentScrollPosition < 0) {
        return
      }
      // Stop executing this function if the difference between
      // current scroll position and last scroll position is less than some offset
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
        return
      }
      this.showNav = currentScrollPosition < this.lastScrollPosition
      this.lastScrollPosition = currentScrollPosition
    },
    getGenres(){
      axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=a06cfa7f0853984e8a69e2db2fd1b8fd&language=en-US')
      .then(response => {
        this.genres = response.data.genres
      })
    },
    showGenres(){
      this.isActive = !this.isActive
      document.querySelector('.genres').classList.toggle('displaying')
    },
    hideGenresIfOpen(){
      if(this.isActive == true){
        this.isActive == false
        document.querySelector('.genres').classList.remove('displaying')
      }
    },
    goToGenre(id){
      this.$router.push({ name: 'MoviesPerGenre', params: {genre: id}})
    },
    ...mapActions(['setTheme'])
  }
}
</script>
