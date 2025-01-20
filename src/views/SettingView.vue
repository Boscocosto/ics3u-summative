<script setup>
import Footer from "../components/Footer.vue";
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { useStore } from '../store';
import { updatePassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

const store = useStore();
const router = useRouter();
const name = ref(store.user?.displayName?.split(" ")[0] || '');
const lastName = ref(store.user?.displayName?.split(" ")[1] || '');
const email = ref(store.user?.email || '');
const password = ref('');

const changeName = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      await updateProfile(user, { displayName: `${name.value} ${lastName.value}` })
      store.user = { ...store.user, displayName: `${name.value} ${lastName.value}` };
    }
  } catch (error) {
    console.error("Error occurred during name change:", error);
    alert("There was an error updating the name. Please try again.");
  }
};

const changePassword = async () => {
  try {
    const user = auth.currentUser;
    await updatePassword(user, password.value);
    alert("Password updated successfully!");
    password.value = '';
  } catch (error) {
    alert("There was an error updating the password. Please try again.");
  }
};
</script>

<template>
  <div class="header">
    <div class="logo">
      <img src="/movie.png" class="logo" />
      <h1>{{ `Hello ${store.user?.displayName}!` }}</h1>
    </div>
    <div class="buttons">
      <button @click="router.push('/cart')" class="button">Cart</button>
      <button @click="store.logout" class="button">Logout</button>
    </div>
  </div>

  <div class="setting">
    <form @submit.prevent="changeName" class="form">
      <div class="input-container">
        <p>{{ `First Name: ${store.user?.displayName?.split(" ")[0] || ''}` }}</p>
        <input v-model="name" type="text" id="name" class="input-field" />
        <button type="submit" class="changeName">Change</button>
      </div>
    </form>
    <form @submit.prevent="changeName" class="form">
      <div class="input-container">
        <p>{{ `Last Name: ${store.user?.displayName?.split(" ")[1] || ''}` }}</p>
        <input v-model="lastName" type="text" id="lastName" class="input-field" />
        <button type="submit" class="changeName">Change</button>
      </div>
    </form>
    <div class="email">
      <div class="input-container">
        <p>{{ `Email:` }}</p>
        <input v-model="email" type="email" id="email" class="input-field" readonly />
      </div>
    </div>
    <form @submit.prevent="changePassword" class="form">
      <div class="input-container">
        <p>New Password</p>
        <input v-model="password" type="password" id="password" class="input-field" required />
        <button type="submit" class="changeName">Change Password</button>
      </div>
    </form>
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

.setting {
  background-image: url('/popcorn.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
}

.input-container {
  display: flex;
  gap: 10px;
  align-items: center;
}

.input-field {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;
}

.changeName {
  padding: 10px 20px;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.changeName:hover {
  background-color: #0000008d;
}

.email {
  padding: 20px;
  border-radius: 10px;
}
</style>