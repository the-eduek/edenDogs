<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

// props
const props = defineProps({
  dogBreed: {
    type: String,
    required: true
  }
});


// store instance
const store = useStore();

// get the img src for the passed down image
const currentDogImg = computed(() => store.state.currentDogImg)

// if breed name contains "-", it means that dog has a sub breed
// this function splits the string and returns it as `a/an subbreed breed`
// also determines the appropriate preceeding article
function getSubBreed(dogBreed) {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const breedName = dogBreed.includes("-") ? dogBreed.split("-").reverse().join(" ") : dogBreed;

  return vowels.includes(breedName.charAt(0).toLowerCase()) ? `an ${breedName}` : `a ${breedName}`
};
</script>

<template>
  <section class="details">
    <div class="details__wrap">
      <div class="details__img">
        <img :src="currentDogImg" :alt="`image of ${dogBreed}`">
      </div>

      <div class="details__text">
        <p> This is {{ getSubBreed(dogBreed) }} dog!</p>
      </div> 
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '../assets/styles/variables';

.details {
  height: 100vh;
  padding: max(5rem, 15vw) max(3.5rem, 10vw);

  &__wrap {
    border-radius: 1rem;
    box-shadow: 0px 2px 5px rgba($color: $textGrey, $alpha: 0.5) ;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }

  &__img {
    flex-grow: 1;
    height: 100%;
    width: 100%;

    img {
      height: 100%;
      object-fit: cover;
      width: 100%;
    }
  }

  &__text {
    border: solid $textGrey;
    border-width: 1px 0 0;

    p {
      font-size: 5vw;
      padding: 1.5rem 0;
      text-align: center;
    }
  }
}

@media (min-width: 1024px) {
  .details {
    padding: 7.5vw 10vw;

    &__wrap {
      flex-direction: row;
    }

    &__text {
      p {
        font-size: 2.5vw;
      }
    }
  }  
}
</style>