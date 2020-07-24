<template>
    <ul class="pagination flex justify-center pt-8 pb-10">
    <li class="pagination-item">
      <button
        type="button"
        @click="onClickFirstPage"
        :disabled="isInFirstPage"
        :style="{display: isInFirstPage ? 'none' : 'block'}"
        class="px-3 py-1 text-pozadina bg-tekst rounded mr-2 focus:outline-none"
      >
      <i class="fas fa-angle-double-left"></i>
      </button>
    </li>

    <li class="pagination-item">
      <button
        type="button"
        @click="onClickPreviousPage"
        :disabled="isInFirstPage"
        :style="{display: isInFirstPage ? 'none' : 'block'}"
        class="px-3 py-1 text-pozadina bg-tekst rounded mr-2 focus:outline-none"
      >
        <i class="fas fa-angle-left"></i>
      </button>
    </li>

    <li
      v-for="page in pages"
      :key="page.name"
      class="pagination-item mx-1"
    >
      <button
        type="button"
        @click="onClickPage(page.name)"
        :disabled="page.isDisabled"
        class="px-3 py-1 text-pozadina bg-tekst rounded font-bold focus:outline-none"
        :class="{ activePagination: isPageActive(page.name) }"
      >
        {{ page.name }}
      </button>
    </li>

    <li class="pagination-item">
      <button
        type="button"
        @click="onClickNextPage"
        :disabled="isInLastPage"
        :style="{visibility: isInLastPage ? 'hidden' : 'visible'}"
        class="px-3 py-1 text-pozadina bg-tekst rounded ml-2 focus:outline-none"
      >
        <i class="fas fa-angle-right"></i>
      </button>
    </li>

    <li class="pagination-item">
      <button
        type="button"
        @click="onClickLastPage"
        :disabled="isInLastPage"
        :style="{visibility: isInLastPage ? 'hidden' : 'visible'}"
        class="px-3 py-1 text-pozadina bg-tekst rounded ml-2 focus:outline-none"
      >
      <i class="fas fa-angle-double-right"></i>
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 5
    },
    totalPages: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    startPage(){
      //When on the first page
      if(this.currentPage === 1){
        return 1;
      }
      //When on the last page
      if(this.currentPage === this.totalPages){
        return this.totalPages - this.maxVisibleButtons
      }
      //When in between
      return this.currentPage - 1
    },
    pages(){
      const range = []
      for(let i = this.currentPage; i <= Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages) ; i+=1){
        range.push({
          name: i,
          isDisabled: i === this.currentPage
        })
      } 
      return range
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    onClickFirstPage() {
      this.$emit('pagechanged', 1);
      window.scrollTo(0,0);
    },
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1);
      window.scrollTo(0,0);
    },
    onClickPage(page) {
      this.$emit('pagechanged', page);
      window.scrollTo(0,0);
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1);
      window.scrollTo(0,0);
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages);
      window.scrollTo(0,0);
    },
    isPageActive(page) {
      return this.currentPage === page;
    }
  }

}
</script>
