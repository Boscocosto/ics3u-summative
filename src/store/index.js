import { ref } from "vue";
import { defineStore } from "pinia";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export const useStore = defineStore('store', () => {
  const email = ref(localStorage.getItem('email') || "");  // Get email from localStorage
  const name = ref(localStorage.getItem('firstName') || "");  // Get first name from localStorage
  const lastName = ref(localStorage.getItem('lastName') || "");  // Get last name from localStorage
  const cart = ref(new Map());

  // Save to localStorage when values change
  const setEmail = (newEmail) => {
    email.value = newEmail;
    localStorage.setItem('email', newEmail);  // Save email in localStorage
  };

  const setName = (newName) => {
    name.value = newName;
    localStorage.setItem('firstName', newName);  // Save first name in localStorage
  };

  const setLastName = (newLastName) => {
    lastName.value = newLastName;
    localStorage.setItem('lastName', newLastName);  // Save last name in localStorage
  };

  return { email, cart, name, lastName, setEmail, setName, setLastName };
});

export const userAuthorized = new Promise((resolve, reject) => {
  onAuthStateChanged(auth, user => {
    try {
      const store = useStore();
      store.user = user;

      // If user is authenticated, set data in store and localStorage
      if (user) {
        store.setEmail(user.email);
        store.setName(user.displayName?.split(' ')[0] || "");  // Assuming displayName is in the format "First Last"
        store.setLastName(user.displayName?.split(' ')[1] || "");

        const storedCart = localStorage.getItem(`cart_${store.email}`);
        store.cart = storedCart ? new Map(Object.entries(JSON.parse(storedCart))) : new Map();
      }

      resolve();
    } catch (error) {
      reject(error);
    }
  });
});