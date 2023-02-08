<script setup>
import { computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import DogItem from '../components/DogItem.vue';
import ErrorComponent from '../components/ErrorComponent.vue';
import LoadingIndicator from '../components/LoadingIndicator.vue';
import SearchComponent from '../components/SearchComponent.vue';

// store instance
const store = useStore();

// fetch images before page mount 
onBeforeMount(() => {
  store.dispatch('getDogImages');
});

// `dogImages` store state as computed property
const dogImages = computed(() => store.state.dogImages);

// error message
const errorMessage = computed(() => store.state.errorMessage)

function getDogName(imgSrc) {
  return imgSrc.split("/")[4];
};
</script>

<template>
  <section v-if="dogImages.length > 0">
    <SearchComponent />

    <section class="wrap">
      <DogItem 
        v-for="(dogImage, index) in dogImages"
        :key="index"
        :imgAlt="getDogName(dogImage)"
        :imgSrc="dogImage"
      />
    </section>
  </section>
  
  <Transition name="fade" mode="in-out">
    <LoadingIndicator  v-if="dogImages.length < 1" />
  </Transition>

  
  <section v-if="errorMessage">
    <ErrorComponent />
  </section>
</template>

<style lang="scss" scoped>

.fade-enter-active,
.fade-leave-active {
  transition: 300ms ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.wrap {
  display: grid;
  gap: min(5vw, 3.5rem);
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  padding: 0 1.25rem;
}
</style>