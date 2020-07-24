import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/popular-movies',
    name: 'PopularMovies',
    component: () => import(/* webpackChunkName: "PopularMovies" */ "../views/PopularMovies")
  },
  {
    path: '/movie/:id',
    name: 'MovieDetails',
    props: true,
    component: () => import(/* webpackChunkName: "MovieDetails" */ "../views/MovieDetails")
  },
  {
    path: '/upcoming-movies',
    name: 'UpcomingMovies',
    component: () => import(/* webpackChunkName: "UpcomingMovies" */ "../views/UpcomingMovies")
  },
  {
    path: '/top-rated',
    name: 'TopRatedMovies',
    component: () => import(/* webpackChunkName: "TopRatedMovies" */ "../views/TopRatedMovies")
  },
  {
    path: '/genre/:genre',
    name: 'MoviesPerGenre',
    props: true,
    component: () => import(/* webpackChunkName: "MoviesPerGenre" */ "../views/MoviesPerGenre")
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: "NotFound" */ "../views/NotFound"), 
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
