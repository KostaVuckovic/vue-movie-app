<template>
  <div class="">
    <div v-for="(image,index) in imagesPerMovieProp" :key="index">
      <img :src="'https://image.tmdb.org/t/p/w154' + image.file_path + '?api_key=a06cfa7f0853984e8a69e2db2fd1b8fd'" alt="image">
    </div>
  </div>
</template>

<script>
export default {
name: 'ImagesPerMovie',
props: {
  imagesPerMovieProp: Array
},
data(){
  return{

  }
}
}
</script>

<style>

</style>