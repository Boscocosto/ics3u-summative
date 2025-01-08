<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <div class="header">
        <div class="logo">
            <img src="/movie.png" class="logo" />
            <h1>Pop Movies</h1>
        </div>
        <div class="buttons">
            <RouterLink to="/register" class="button">Register</RouterLink>
            <RouterLink to="/login" class="button">Login</RouterLink>
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
</style>