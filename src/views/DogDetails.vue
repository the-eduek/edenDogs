<script setup>
import { computed, onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import fetchDogs from "../assets/functions/fetchDogs";

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
const currentDogImg = computed(() => store.state.currentDogImg);

// if breed name contains "-", it means that dog has a sub breed
// this function splits the string and returns it as `a/an subbreed breed`
// also determines the appropriate preceeding article
function getSubBreed(dogBreed) {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const breedName = dogBreed.includes("-") ? dogBreed.split("-").reverse().join(" ") : dogBreed;

  return vowels.includes(breedName.charAt(0).toLowerCase()) ? `an ${breedName}` : `a ${breedName}`
};

// back page logic
const router = useRouter();

function previousPage() {
  router.go(-1);
};


// Sshow image 
const route = useRoute();

const src = ref('');

onBeforeMount(async () => {
  if (!currentDogImg?.value) {
    const dogBreed = route.params.dogBreed;
    src.value = await fetchDogs(`https://dog.ceo/api/breed/${dogBreed}/images/random`);
  }
});
</script>

<template>
  <section class="details">
    <button class="details__btn" @click="previousPage()">
      <span class="right">
        <span>←</span>
        <span>←</span>
      </span> Back
    </button>

    <div class="details__wrap">
      <div class="details__img">
        <img :src="currentDogImg" :alt="`image of ${dogBreed}`" v-if="currentDogImg">
        <img :src="src" :alt="`image of ${dogBreed}`" v-else>
      </div>

      <div class="details__text">
        <h3> This dog is {{ getSubBreed(dogBreed) }}!</h3>

        <p>Did you know that dogs sweat through their paws? The majority of a dog’s sweat glands are located in their paws. A dog who is overheating may leave behind a trail of wet paw prints on the floor or pavement.</p>
        
        <p>Even though a dog may sweat through their paws when they are hot, the principle method that dogs use to cool down is panting. Panting allows moisture to evaporate from the tongue and the surface of the lungs.</p>
      </div> 
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '../assets/styles/variables';

.details {
  padding: max(2rem, 5vw) max(2rem, 5vw);

  &__wrap {
    border-radius: 0.5rem;
    box-shadow: 0px 2px 5px rgba($color: $textGrey, $alpha: 0.5);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  &__btn {
    appearance: none;
    border: none;
    border-radius: 0.5rem;
    background-color: $green;
    color: #fff;
    cursor: pointer;
    display: flex;
    font-family: inherit;
    font-size: 1.125rem;
    font-weight: 500;
    margin: 0 0 10vw;
    padding: 0.825rem;

    .right {
      display: flex;
      overflow: hidden;
      width: 1.125rem;

      span {
        transform: translateX(0%);
        transition: 500ms cubic-bezier(0.18, 0.89, 0.32, 1.28);
        padding: 0 0.25rem 0 0;
      }
    }

    &:hover {
      .right {
        span {
          transform: translateX(-100%);
        }
      }
    }
  }

  &__img {
    height: 50vh;

    img {
      height: 100%;
      object-fit: cover;
      width: 100%;
    }
  }

  &__text {
    border: solid $textGrey;
    border-width: 1px 0 0;
    padding: 1.5rem;

    h3 {
      font-weight: 500;
      padding: 0 0 0.5rem;
    }

    p {
      padding: 0.5rem 0 0;
    }
  }
}

@media (min-width: 768px) {
  .details {
    padding: 7.5vw;

    &__btn {
      margin: 0 0 5vw;
    }

    &__wrap {
      flex-direction: row;
      flex-wrap: nowrap;
    }

    &__img {
      min-height: 50vh;
      width: 65%;
    }

    &__text {
      border-width: 0 0 0 1px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 35%;
    }
  }  
}
</style>