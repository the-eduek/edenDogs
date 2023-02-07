<script setup>
import { computed, onBeforeMount, ref, watch } from 'vue';
import fetchDogs from '../assets/functions/fetchDogs';
import DogItem from '../components/DogItem.vue';
import LoadingIndicator from '../components/LoadingIndicator.vue';
import SearchComponent from '../components/SearchComponent.vue';

const imageUrl = 'https://dog.ceo/api/breeds/image/random/50';
const dogImages = ref([]);

const isLoaded = computed(() => {
  return dogImages.value.length <= 0
});


onBeforeMount(async () => {
  console.log(isLoaded.value)
  const response = await Promise.all([
    fetchDogs(imageUrl),
    fetchDogs(imageUrl)
  ]);

  dogImages.value = response.flat();
});

function getDogName(imgSrc) {
  return imgSrc.split("/")[4]
};
</script>

<template>
  <section v-if="!isLoaded">
    <SearchComponent />

    <section class="wrap">
      <DogItem 
        v-for="dogImage in dogImages"
        :key="getDogName(dogImage)"
        :imgAlt="getDogName(dogImage)"
        :imgSrc="dogImage"
      />
    </section>
  </section>
  
  <LoadingIndicator v-else />
</template>

<style scoped>
.wrap {
  display: grid;
  gap: min(5vw, 3.5rem);
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  padding: 0 1.25rem;
}
</style>