<script setup>
/** Props */

const props = defineProps({
  imgAlt: {
    type: String,
    required: true
  },
  imgSrc: {
    type: String,
    required: true
  }
});
</script>

<template>
  <section class="dog">
    <div class="dog__wrap">
      <img :src="imgSrc" :alt="imgAlt">
    </div>
    
    <span class="dog__info">More info
      <span class="scroll">
        <span>→</span>
        <span>→</span>
      </span>
    </span>
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
  border-radius: 0.5rem;
  height: 20rem;
  overflow: hidden;
  position: relative;

  &__wrap {
    height: 100%;
    position: relative;
    transition: 300ms ease-in;
    width: 100%;

    &::after {
      background-color: transparentize($color: $darkGrey, $amount: 0.25);
      content: "";
      height: 100%;
      left: 0;
      position: absolute;
      transform: scaleY(0);
      transform-origin: bottom;
      transition: transform 300ms ease-in;
      top: 0;
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
    transform: translate(-50%, -50%);
    top: 50%;

    .scroll {
      display: flex;
      justify-content: flex-end;
      margin: 0 0 0 0.5rem;
      overflow: hidden;
      position: relative;
      width: 1.25rem;

      span {
        animation: slideLeft 1500ms cubic-bezier(0.18, 0.89, 0.32, 1.28) infinite;
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
      transition: 300ms ease-in;
      transition-delay: 300ms;
    }
  } 
}
</style>