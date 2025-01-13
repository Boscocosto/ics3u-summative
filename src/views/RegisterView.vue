<script setup>
import Footer from "../components/Footer.vue";
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useStore } from "../store";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

const store = useStore();
const router = useRouter();
const email = ref('');
const password1 = ref('');
const password2 = ref('');
const lastName = ref('');
const name = ref('');

async function registerByEmail() {
  if (password1.value !== password2.value) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password1.value);
    const user = userCredential.user;

    // Add user's name to profile
    await updateProfile(user, { displayName: `${name.value} ${lastName.value}` });

    // Update the store's user
    store.user = user;

    // Navigate to the movies page after successful registration
    router.push("/movies");
  } catch (error) {
    console.error(error);
    alert("There was an error creating a user with email!");
  }
}

async function registerByGoogle() {
  try {
    const userCredential = await signInWithPopup(auth, new GoogleAuthProvider());
    const user = userCredential.user;

    // Update the store's user
    store.user = user;

    // Navigate to the movies page after successful login
    router.push("/movies");
  } catch (error) {
    console.error(error);
    alert("There was an error creating a user with Google!");
  }
}
</script>

<template>
  <div class="header">
    <div class="logo">
      <img src="/movie.png" class="logo" />
      <h1>Pop Movies</h1>
    </div>
    <div class="buttons">
      <RouterLink to="/login" class="button">Log in</RouterLink>
    </div>
  </div>
  <div class="register">
    <div class="registerText">
      <h2>Create an Account</h2>
      <form @submit.prevent="registerByEmail">
        <input v-model="name" type="text" placeholder="First Name" class="input-field" required>
        <input v-model="lastName" type="text" placeholder="Last Name" class="input-field" required>
        <input v-model="email" type="email" placeholder="Email" class="input-field" required>
        <input v-model="password1" type="password" placeholder="Password" class="input-field" required>
        <input v-model="password2" type="password" placeholder="Re-Enter Password" class="input-field" required>
        <button type="submit" class="button">Register</button>
      </form>
      <button @click="registerByGoogle" class="button">Register by Google</button>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
.registerText {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
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

.register {
  text-align: center;
  background-image: url('/popcorn.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh;
}

.register h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  width: 100%;
}

.input-field {
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

.button.register {
  padding: 12px;
  background-color: #333;
  color: white;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button.register:hover {
  background-color: #000;
}
</style>