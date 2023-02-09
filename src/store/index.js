import { createStore } from "vuex";
import fetchDogs from "../assets/functions/fetchDogs";

const store = createStore({
  state() {
    return {
      currentDogImg: "",
      dogBreedsList: [],
      dogImages: [],
      errorMessage: false,
      searchText: ''
    }
  },
  getters: {
    selectedDogImages(state) {
      return state.dogImages.map(imgSrcString => {
        return {          
          name: imgSrcString.split('/')[4],
          src: imgSrcString
        }
      });
    }
  },
  mutations: {
    setCurrentDogImg(state, imgSrcString) {
      state.currentDogImg = imgSrcString;
    },
    setDogBreedsList(state, breedsList) {
      state.dogBreedsList = breedsList;
    },
    setDogImages(state, dogImagesList) {
      state.dogImages = dogImagesList;
    },
    setErrorMessage(state) {
      state.errorMessage = true;
    },
    updateSearchText(state, newValue) {
      state.searchText = newValue;
    }
  },
  actions: {
    async getDogImages({ commit }) {
      try {
        const imageUrl = "https://dog.ceo/api/breeds/image/random/50";
        const response = await Promise.all([
          fetchDogs(imageUrl),
          fetchDogs(imageUrl)
        ]);
        const dataList = response.flat();
        commit("setDogImages", dataList);
      } catch (error) {
        commit("setErrorMessage");
      }   
    },
    async getDogBreedsList ({ commit, state }) {
      try {
        const responseData = await fetchDogs('https://dog.ceo/api/breeds/list/all');
        const dataList = [];
        for (const [breed, subBreed] of Object.entries(responseData)) {
          if (subBreed.length > 0) {
            subBreed.forEach(sub => { 
              dataList.push(`${sub} ${breed}`)
            });
          } else dataList.push(breed);          
        };
        commit("setDogBreedsList", dataList);
      } catch (error) {
        console.error(error)
      }; 
    }
  }
});

export default store;