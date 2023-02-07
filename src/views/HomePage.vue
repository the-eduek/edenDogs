<script setup>
import { onBeforeMount, ref } from 'vue';
import fetchDogs from '../assets/functions/fetchDogs';
import SearchComponent from '../components/SearchComponent.vue';
import DogItem from '../components/DogItem.vue';

const imageUrl = 'https://dog.ceo/api/breeds/image/random/50';
const dogImages = ref([]);

onBeforeMount(async () => {
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
  <SearchComponent />

  <section class="wrap">
    <DogItem 
      v-for="dogImage in dogImages"
      :key="getDogName(dogImage)"
      :imgAlt="getDogName(dogImage)"
      :imgSrc="dogImage"
    />
  </section>
  
</template>

<style scoped>
.wrap {
  display: grid;
  gap: min(5vw, 3.5rem);
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  padding: 0 1.25rem;
}
</style>