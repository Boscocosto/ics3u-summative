<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
import { useStore } from '../store';

const props = defineProps(["genres"]);
const router = useRouter();
const store = useStore();
const selectedGenre = ref(28);
const response = ref(null);

async function getMovieByGenre() {
  response.value = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&include_adult=false&with_genres=${selectedGenre.value}`);
}

function getMovieDetails(id) {
  router.push(`/movies/${id}`);
}

onMounted(async () => {
  response.value = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&include_adult=false&with_genres=${selectedGenre.value}`);
});
</script>

<template>
  <div class="header">
    <div class="logo">
      <img src="/movie.png" class="logo" />
      <h1>{{ `Hello ${store.user?.displayName}!` }}</h1>
    </div>
    <div class="buttons">
      <button @click="router.push('/cart')" class="button">Cart</button>
      <button @click="router.push('/')" class="button">Logout</button>
      <button @click="router.push('/setting')" class="button">Settings</button>
    </div>
  </div>
  <div class="movie-gallery">
    <select v-model="selectedGenre" @change="getMovieByGenre()">
      <option v-for="genre of genres" :value="genre.id">{{ genre.genreName }}</option>
    </select>
    <div v-if="response" class="movie-list">
      <div v-for="movie in response.data.results" :key="movie.id" class="movie-card" @click="getMovieDetails(movie.id)">
        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Movie Poster" class="movie-poster" />
        <p class="movie-title">{{ movie.title }}</p>
        <button
          @click.stop="store.addToCart(movie.id, { title: movie.title, url: movie.poster_path })"
          class="movie-site">
          {{ store.cart.has(movie.id) ? 'Added' : 'Buy' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1%;
  background-color: white;
  border: 2px solid rgba(0, 0, 0, 0.8);
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  margin: 20px;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  height: 50px;
  margin-right: 10px;
}

.buttons {
  display: flex;
  gap: 10px;
}

.button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #000000;
  color: white;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #0000008d;
}

.movie-gallery {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  min-height: 100vh;
  background-image: url('/popcorn.jpg');
  background-size: cover;
  background-position: center;
}

select {
  padding: 12px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 5px;
  width: 250px;
  cursor: pointer;
  background-color: #fff;
  transition: border-color 0.3s ease;
  align-self: flex-end;
}

.movie-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin-top: 20px;
  padding: 0 20px;
}

.movie-card {
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
}

.movie-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.movie-poster {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.movie-title {
  font-size: 18px;
  text-align: center;
  padding: 15px;
  font-weight: bold;
  margin: 0;
}

.movie-site {
  display: inline-block;
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 16px;
  font-weight: bold;
}

.movie-site:hover {
  background-color: #4d4d4d;
}
</style>