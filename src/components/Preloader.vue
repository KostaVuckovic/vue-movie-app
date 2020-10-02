<template>
  <transition name="fade">
    <div v-if="isActiveLoad" class="flex justify-center items-center w-full h-full absolute top-0 left-0 z-40 bg-background-pozadina">
      <div class="flex">
				<div class="circle w-3 lg:w-6 h-3 lg:h-6 m-2 lg:m-3 bg-background-narandza rounded-full transform scale-0"></div>
				<div class="circle w-3 lg:w-6 h-3 lg:h-6 m-2 lg:m-3 bg-background-narandza rounded-full transform scale-0"></div>
				<div class="circle w-3 lg:w-6 h-3 lg:h-6 m-2 lg:m-3 bg-background-narandza rounded-full transform scale-0"></div>
				<div class="circle w-3 lg:w-6 h-3 lg:h-6 m-2 lg:m-3 bg-background-narandza rounded-full transform scale-0"></div>
				<div class="circle w-3 lg:w-6 h-3 lg:h-6 m-2 lg:m-3 bg-background-narandza rounded-full transform scale-0"></div>
			</div>
    </div>
  </transition>  
</template>

<script>
import { mapGetters } from 'vuex'

export default {
name: 'Prelaoder',
data(){
  return{
  }
},
computed:{
  ...mapGetters(['isActiveLoad'])
}
}
</script>