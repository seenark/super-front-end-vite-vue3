<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useTokenStore } from "../store/token";
import { useExchangeStore } from "../store/exchange";

const buyTokenId = ref("");
  const tokenStore = useTokenStore()
  const exchangeStore = useExchangeStore()
function approveToken() {
  tokenStore.approve()
}

function buy() {
  exchangeStore.buy(buyTokenId.value)
}

onMounted(async () => {

});
</script>

<template>
Connect Smart Contract to Target Wallet
  <div style="display: flex; flex-direction: column">
    <button @click="approveToken">approve Token</button>
    <hr>
    <div>
      <label for="">Buy TokenId</label>
      <input v-model="buyTokenId" type="text" />
    </div>
    <button @click="buy">Buy</button>
  </div>
</template>
