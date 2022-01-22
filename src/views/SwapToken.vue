<script lang="ts" setup>

import {onMounted, ref} from 'vue'
import { useExchangeStore } from '../store/exchange'
import { useNFTStore } from '../store/nft'
import { useTokenStore } from '../store/token'
import { IUsedNFT } from '../types/Exchange'

const exchangeStore = useExchangeStore()
const nftStore = useNFTStore()

const nfts = ref<string[]>([])
const usedNfts = ref<IUsedNFT[]>([])

onMounted(async () => {
    fetchAllNFTs()

    usedNfts.value = await exchangeStore.getUsedNFTFromExchange()

    exchangeStore.watchUsedNFTUpdate((newUsedNFTs, idOpenTrades) => {
        usedNfts.value = [...usedNfts.value, ...newUsedNFTs]
    })
    //   const filter = cExchange.filters.UpdateUsedNFT()
    //     cExchange.on(filter,  (a,b) => {
    //   console.warn("event", a,b);
    // })
})

async function fetchAllNFTs() {
    const nft = await exchangeStore.getAllNFTOpenForTrades()
    console.log("🚀 ~ file: SwapToken.vue ~ line 6 ~ onMounted ~ nft", nft)
    const promises = await Promise.all( nft.map(tokenId => {
        return nftStore.fetchNFT(tokenId.toString())
    }))
    nfts.value = promises.filter(String)
}

const buyTokenId = ref<number>(-1)
async function directBuyCo2() {
    const hash = await exchangeStore.directBuyCo2CreditFromToken()
    console.log('hash', hash)
    fetchAllNFTs()
}

const tokenStore = useTokenStore()
async function approveToken() {
    const hash = await tokenStore.approve()
    alert(`hash: ${hash}`)
}
</script>


<template>
    <div>
    <button @click="approveToken">Approve token</button> | 
    <button @click="directBuyCo2">Buy Co2 credit</button>
    <!-- <input v-model="buyTokenId" type="number"> -->
    </div>
    
    <div>NFT ready for sell</div>
    <div>
        <img v-for="(nft, index) in nfts" :key="index" :src="nft" alt="" width="200" height="200">
    </div>
    <hr>
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