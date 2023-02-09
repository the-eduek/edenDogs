<script setup>
import { computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import BrandLogo from '../components/BrandLogo.vue';
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
  <section class="home" v-if="dogImages.length > 0">
    <div class="home__header">
      <BrandLogo />
      <SearchComponent />
    </div>

    <section class="home__main">
      <TransitionGroup name="slideDown">
        <DogItem 
          v-for="(dog, index) in filteredImages()"
          :key="index"
          :dog="dog"
        />
      </TransitionGroup>
    </section>

    <p :class="[ 'text', { 'text--invisible': filteredImages().length === 0 }]">No such dogs 🐶</p>
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
.fade-leave-active,
.slideDown-enter-active,
.slideDown-leave-active {
  transition: all 300ms ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slideDown-enter-from,
.slideDown-leave-to {
  opacity: 0;
  transform: translateY(2rem);
}

.home {
  &__header {
    padding: 1.25rem 5vw;
  }

  &__main {
    display: grid;
    gap: min(5vw, 5rem);
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    padding: 0 5vw;

  }

  .text {
    font-size: 1.25rem;
    font-weight: 500;
    left: 50%;
    opacity: 0;
    padding: 5vw 0 0;
    position: fixed;
    text-align: center;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: all 300ms ease-in;
    width: 100%;
    z-index: -1;

    &--invisible {
      opacity: 1;
    }
  }
}

@media (min-width: 640px) {
  .home {
    &__header {
      align-items: center;
      display: flex;
      justify-content: space-between;
      padding: 5vw 10vw 3.5vw;
    }

    &__main {
      padding: 0 10vw 5vw;
    }
  }
}
</style>