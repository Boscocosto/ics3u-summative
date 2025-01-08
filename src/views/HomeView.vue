<script setup>
import Header from '../components/Header.vue';
import Hero from '../components/Hero.vue';
import Footer from '../components/Footer.vue';
import Feature from '../components/Feature.vue';
</script>

<template>
  <Header />
  <div class="homePage">
    <Hero />
    <Feature />
  </div>
  <Footer />
</template>

<style scoped>
.homePage {
  background-image: url('/popcorn.jpg');
  background-size: cover;
  background-position: center;
}
</style>