<script setup>
import Footer from "../components/Footer.vue";
import { RouterLink, useRouter } from 'vue-router';
import { ref } from 'vue';
import { useStore } from "../store"

const store = useStore();
const router = useRouter();
const email = ref('');
const password = ref('');

const handleLogin = () => {
  if (password.value === "password") {
    store.email = email.value;
    router.push("/movies");
  } else {
    alert("Invalid Password");
  }
};
</script>

<template>
  <div class="header">
    <div class="logo">
      <img src="/movie.png" class="logo" />
      <h1>Pop Movies</h1>
    </div>
    <div class="buttons">
      <RouterLink to="/register" class="button">Register</RouterLink>
    </div>
  </div>
  <div class="login">
    <div class="loginText">
      <h2>Login to Your Account</h2>
      <form @submit.prevent="handleLogin">
        <input v-model:="email" type="email" placeholder="Email" class="input-field" required />
        <input v-model:="password" type="password" placeholder="Password" class="input-field" required />
        <button type="submit" class="button">Login</button>
      </form>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
.loginText {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

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

.login {
  text-align: center;
  background-image: url('/popcorn.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh;
}

.login h2 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.login-form {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
}

.input-field {
  flex: 1 1 45%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-size: 16px;
}

.input-field:focus {
  border-color: #000;
  outline: none;
}
</style>