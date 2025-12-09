import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const loggedIn = ref(false)
  const balance = ref(0)
  const username = ref('')

  function login(name = 'User', initialBalance = 100) {
    loggedIn.value = true
    username.value = name
    balance.value = initialBalance
  }

  function logout() {
    loggedIn.value = false
    username.value = ''
    balance.value = 0
  }

  function deposit(amount = 0) {
    balance.value = Number(balance.value) + Number(amount)
  }

  return { loggedIn, username, balance, login, logout, deposit }
})
