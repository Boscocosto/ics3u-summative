<script setup>
</script>

<template>
    <div>
        <div class="hero">
            <h1>Welcome to Pop Movies</h1>
            <p>A place where you can watch all your favorite movies for free in one place</p>
            <button type="button">Explore Now</button>
        </div>
    </div>
</template>

<style scoped>
* {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.hero {
    color: black;
    text-align: center;
    padding: 50px;
}

.hero h1 {
    font-size: 50px;
    margin-bottom: 20px;
    background-color: white;
    display: inline-block;
}

.hero p {
    font-size: 30px;
    margin-bottom: 30px;
    background-color: white;
    display: block;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
}

.botton {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #000000;
    color: white;
    transition: background-color 0.3s;
}
</style>