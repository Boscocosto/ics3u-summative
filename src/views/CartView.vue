<script setup>
import Footer from "../components/Footer.vue";
import { useRouter } from "vue-router";
import { useStore } from '../store';

const router = useRouter();
const store = useStore();
</script>

<template>
    <div class="header">
        <div class="logo">
            <img src="/movie.png" class="logo" />
            <h1>{{ `Hello ${store.user?.displayName}!` }}</h1>
        </div>
        <div class="buttons">
            <button @click="router.push(`/`)" class="button">Logout</button>
            <button @click="router.push('/setting')" class="button">Settings</button>
        </div>
    </div>
    <div class="cart">
        <h1>Shopping Cart</h1>
        <div class="item" v-for="([key, value]) in store.cart" :key="key">
            <img :src="`https://image.tmdb.org/t/p/w500${value.url}`" alt="Movie Poster" class="item-image" />
            <h2 class="item-title">{{ value.title }}</h2>
            <button @click="store.removeFromCart(key)" class="button">Remove</button>
        </div>
    </div>
    <Footer />
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

.cart {
    padding: 20px;
    background-image: url('/popcorn.jpg');
    background-size: cover;
    background-position: center;
    height: 100vh;
    border-radius: 10px;
    margin: 20px;
}

.item {
    display: flex;
    align-items: center;
    margin: 15px 0;
}

.item-image {
    width: 100px;
    height: 150px;
    object-fit: cover;
    border-radius: 10px;
    margin-right: 20px;
}

.item-title {
    font-size: 18px;
    font-weight: bold;
    margin-right: auto;
}

.remove-button {
    background-color: #ff4d4d;
}

.remove-button:hover {
    background-color: #ff1a1a;
}
</style>