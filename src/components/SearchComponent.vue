<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

// store instance
const store = useStore();

//two way computed property for the search text
const searchText = computed({
  get() {
    return store.state.searchText;
  },
  set(newValue) {
    store.commit('updateSearchText', newValue);
  }
});
</script>

<template>
  <section class="search">
    <div class="search__text">
      <input
        placeholder="Search for a dog breed..."
        type="search"
        v-model="searchText"
      >

      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="search__icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '../assets/styles/variables';

.search {
  &__text {
    border-radius: 0.5rem;
    overflow: hidden;
    position: relative;

    input {
      appearance: none;
      background-color: $bgGreen;
      border: solid $darkGrey;
      border-width: 0 0 1px;
      color: $textGrey;
      font-family: inherit;
      font-size: 1rem;
      height: 100%;
      line-height: 1.5;
      outline: none;
      padding: 0.5rem 0.5rem 0.5rem 1.75rem;
      position: relative;
      width: 100%;     
    }
  }

  &__icon {
    color: $darkGrey;
    height: 1.25rem;
    left: 0.25rem;
    position: absolute;
    top: calc(50% - 0.625rem);
    width: 1.25rem;
  }
}

@media (min-width: 640px) {
  .search {
    width: 55%;
  }
}
</style>