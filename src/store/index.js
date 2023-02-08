import { createStore } from "vuex";
import fetchDogs from '../assets/functions/fetchDogs';

const store = createStore({
  state() {
    return {
      currentDogImg: '',
      dogImages: [],
      dogBreedsList: [],
      hasLoaded: false
    }
  },
  mutations: {
    setCurrentDogImg(state, imgSrcString) {
      state.currentDogImg = imgSrcString;
    },
    setdogImages(state, dogImagesList) {
      state.dogImages = dogImagesList;
    },
  },
  actions: {
    async getDogImages ({ commit, state }) { 
      const imageUrl = 'https://dog.ceo/api/breeds/image/random/50';
      const response = await Promise.all([
        fetchDogs(imageUrl),
        fetchDogs(imageUrl)
      ]);

      const dataList = response.flat();
      commit('setdogImages', dataList);
    }
  }
});

export default store;