<script setup>
import { computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import DogItem from '../components/DogItem.vue';
import InfoComponent from '../components/InfoComponent.vue';
import SearchComponent from '../components/SearchComponent.vue';

// store instance
const store = useStore();

// fetch images before page mount 
onBeforeMount(() => {
  store.dispatch('getDogImages');
});

// true or false for error message
const errorMessage = computed(() => store.state.errorMessage);

// `dogImages` store state as computed property
const dogImages = computed(() => store.state.dogImages);

/** search logic */
  // get `searchText` from the store
const searchText = computed(() => store.state.searchText);

  // the 100 images currently present on the page
const selectedDogImages = computed(() => store.getters.selectedDogImages);

  // filter out dogs based onthe value of `searchText`
function filteredImages() {
  return selectedDogImages.value.filter(breed =>
    breed.name.toLowerCase().includes(searchText.value.toLowerCase())
  );
};
</script>

<template>
  <section v-if="dogImages.length > 0">
    <SearchComponent />

    <section class="wrap">
      <DogItem 
        v-for="(dog, index) in filteredImages()"
        :key="index"
        :dog="dog"
      />
    </section>

    <p class="info-text" v-if="filteredImages().length === 0">No such dogs 🐶</p>
  </section>
  
  <Transition name="fade" mode="in-out">
    <InfoComponent
      v-if="dogImages.length < 1 && !errorMessage"
      :isError="errorMessage" 
    />
  </Transition>

  <Transition name="fade" mode="in-out">
    <InfoComponent    
      v-if="errorMessage"
      :isError="errorMessage" 
    />
  </Transition>
</template>

<style lang="scss" scoped>

.fade-enter-active,
.fade-leave-active {
  transition: 200ms ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.wrap {
  display: grid;
  gap: min(5vw, 5rem);
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  padding: 0 5vw;
}

.info-text {
  font-size: 1.25rem;
  font-weight: 500;
  padding: 5vw 0 0;
  text-align: center;
}

@media (min-width: 640px) {
  .wrap {
    padding: 0 10vw 5vw;
  }
}
</style>