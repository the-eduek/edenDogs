import { createStore } from "vuex";
import fetchDogs from '../assets/functions/fetchDogs';

const store = createStore({
  state() {
    return {
      currentDogImg: '',
      dogImages: [],
      dogBreedsList: [],
      errorMessage: false
    }
  },
  mutations: {
    setCurrentDogImg(state, imgSrcString) {
      state.currentDogImg = imgSrcString;
    },
    setDogImages(state, dogImagesList) {
      state.dogImages = dogImagesList;
    },
    setDogBreedsList(state, breedsList) {
      state.dogBreedsList = breedsList;
    },
    setErrorMessage(state) {
      state.errorMessage = true;
    }
  },
  actions: {
    async getDogImages ({ commit, state }) {
      try {
        const imageUrl = 'https://dog.ceo/api/breeds/image/random/50';
        const response = await Promise.all([
          fetchDogs(imageUrl),
          fetchDogs(imageUrl)
        ]);
        const dataList = response.flat();
        commit('setDogImages', dataList);        
      } catch (error) {
        commit('setErrorMessage');        
      }   
    }
  }
});

export default store;