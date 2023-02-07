<script setup>
import { ref } from 'vue';

defineProps({
  msg: String,
});

const count = ref(0)
</script>

<template>
  <section class="search">
    <div class="search__text">
      <input type="search" placeholder="Search for a dog breed" name="" id="">

      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="search__icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '../assets/styles/variables';

.search {
  padding: 1.25rem;

  &__text {
    border-radius: 0.5rem;
    overflow: hidden;
    position: relative;

    input {
      appearance: none;
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
    width: 1.25rem;
    top: calc(50% - 0.625rem);
  }
}
</style>