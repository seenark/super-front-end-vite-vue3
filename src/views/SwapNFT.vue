<script lang="ts" setup>import { useExchangeStore } from '../store/exchange';
import {ref} from 'vue'
import { useNFTStore } from '../store/nft';
const selectedNFT = ref(-1)

const exchangeStore = useExchangeStore()
async function redeemNFT2CO2() {
    if (selectedNFT.value >= 0) {
        const tx = await exchangeStore.redeemNftToCo2Credit(selectedNFT.value)
        alert(tx);
    }
}
const nftStore = useNFTStore()
async function approveNFT() {
    nftStore.approveForAll()
}
</script>


<template>
    <div>
        <button @click="approveNFT">Approve NFT</button>
        <button @click="redeemNFT2CO2">Redeem NFT to CO2 Credit</button>
        <input v-model="selectedNFT" type="text">
    </div>
</template>