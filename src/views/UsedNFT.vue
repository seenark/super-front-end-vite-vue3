<script lang="ts" setup>

import {onMounted, ref} from 'vue'
import { useExchangeStore } from '../store/exchange'
import { useNFTStore } from '../store/nft'
import { IUsedNFT } from '../types/Exchange'

const exchangeStore = useExchangeStore()
const usedNfts = ref<IUsedNFT[]>([])

onMounted(async () => {
    usedNfts.value = await exchangeStore.getUsedNFTFromExchange()
    exchangeStore.watchUsedNFTUpdate((newUsedNFTs, idOpenTrades) => {
        usedNfts.value = [...usedNfts.value, ...newUsedNFTs]
    })
})

</script>


<template>
       
    <div>Used NFT</div>
    <div v-for="(nft, index) in usedNfts" :key="index">
        <div>Address: {{nft.customer}}</div>
        <div>NFT ID: {{nft.tokenId}}</div>
        <div>
            <img width="100" height="100" :src="nft.tokenURI" alt="">
        </div>
        <hr>
    </div>

</template>