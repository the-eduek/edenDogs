<script setup>
import { resolveDirective } from "vue";
import { useStore } from "vuex";
import lazyLoad from '../assets/functions/lazyLoad';

// props
const props = defineProps({
  dog: {
    type: Object,
    required: true
  }
});

// store instance
const store = useStore();

// mutate `currentDogImg`, i.e. set the current img src to the clicked image
function setCurrentDogImg(src) {
  store.commit('setCurrentDogImg', src);
};
</script>

<template>
  <section class="dog" @click="setCurrentDogImg(dog.src)">
    <router-link :to="{ name: 'dogDetails', params: { dogBreed: dog.name }}">
      <div class="dog__wrap" v-lazyLoad>
        <img
          :data-src="dog.src" 
          :alt="`image of ${dog.name}`" 
          loading="lazy"
        >
      </div>
      
      <span class="dog__info">More info
        <span class="right">
          <span>→</span>
          <span>→</span>
        </span>
      </span>
    </router-link>
  </section>
</template>

<style lang="scss" scoped>
@import '../assets/styles/variables';

@keyframes slideLeft {
  from {
    transform: translateX(0%);
  } to {    
    transform: translateX(100%);
  }
};

.dog {
  background-color: rgba($color: $darkGrey, $alpha: 0.15);
  border: 1px solid rgba($color: $darkGrey, $alpha: 0.15);;
  border-radius: 0.5rem;
  height: 20rem;
  overflow: hidden;
  position: relative;

  &__wrap {
    height: 100%;
    position: relative;
    transition: 200ms ease-in;
    width: 100%;

    &::after {
      background-color: transparentize($color: $darkGrey, $amount: 0.25);
      content: "";
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      transform: scaleY(0);
      transform-origin: bottom;
      transition: transform 200ms ease-in;
      width: 100%;
    }

    img {
      height: 100%;
      object-fit: cover;
      object-position: 50% 50%;
      width: 100%;
    }
  }
  
  &__info {
    color: #fff;
    display: flex;
    font-size: 1.25rem;
    justify-content: center;
    left: 50%;
    opacity: 0;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;

    .right {
      display: flex;
      justify-content: flex-end;
      margin: 0 0 0 0.5rem;
      overflow: hidden;
      width: 1.25rem;

      span {
        animation: slideLeft 950ms cubic-bezier(0.18, 0.89, 0.32, 1.28) infinite;
        padding: 0 0.25rem;
      }
    }
  }

  &:hover {
    cursor: pointer;

    .dog__wrap {
      transform: scale(1.2);

      &::after {
        transform: scaleY(1);
        transform-origin: top;
      }
    }

    .dog__info {
      opacity: 1;
      transition: 200ms ease-in;
      transition-delay: 200ms;
      z-index: 10;
    }
  } 
}
</style>