<template>
  <div id="app" class="font-body bg-background-pozadina content-wrapper" :class="getTheme"> 
    <NavBar />
    <transition name="page" mode="out-in">
    <router-view :key="$route.path" />
    </transition>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import {mapGetters} from 'vuex'

export default {
  components: {
    NavBar
  },
  computed: {
    ...mapGetters(['getTheme'])
  }
}
</script>

<style>
  @import "/assets/css/output.css";
</style>