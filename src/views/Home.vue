<script setup lang="ts">
import { ref } from "vue";
import { NFTAddress, NFT_SYMBOL, TokenAddress, TOKEN_DECIMAL, TOKEN_SYMBOL } from "../constants";
import { useNFTStore } from "../store/nft";
import { usePinataStore } from "../store/pinata";
import { useStore } from "../store/store";
// import { connectMetamaskWallet } from "../Web3/web3";

const file = ref<File>();

const pinataStore = usePinataStore()
const nftStore = useNFTStore()
const store = useStore()
function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (!files) {
    return;
  }
  file.value = files[0];
}

async function upload() {
  console.log("file", file.value)
  if (!file.value) return;
  const data = await pinataStore.uploadFile(file.value);
  await nftStore.createNFT(data.IpfsHash);
}

const imgs = ref<string[]>([]);
const tokenIdSelect = ref("");
async function showNFT() {
  const url = await nftStore.fetchNFT(tokenIdSelect.value);
  if (url) imgs.value.push(url);
}

async function addTokenToWallet() {
  store.addTokenToWallet(TokenAddress, TOKEN_SYMBOL, TOKEN_DECIMAL, "ERC20")
}
async function add_NFT_ToWallet() {
  store.addTokenToWallet(NFTAddress, NFT_SYMBOL, 0, "ERC721")
}
</script>

<template>
  <div>
    <div>
      <button @click="store.connnectWallet">Connect Wallet</button> | 
      <button @click="addTokenToWallet">Add Super token to wallet</button> | 
      <button @click="add_NFT_ToWallet">Add NFT Token to wallet</button>
    </div>
    <hr />
    <div>
      <input type="file" name="" id="" @change="onFileChange($event)" />
      <button @click="upload">Create NFT</button>
    </div>
    <hr>
    <div>
      <input v-model="tokenIdSelect" type="text" />
      <button @click="showNFT">Show NFT</button>
    </div>

    <img v-for="(img, index) in imgs" :key="index" :src="img" alt="" />
  </div>
</template>

<style lang="scss" scoped></style>
