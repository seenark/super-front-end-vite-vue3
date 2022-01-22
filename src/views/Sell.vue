<script setup lang="ts">
import { ExchangeAddress, NFTAddress } from "../constants";
import { Exchange, SuperNFT } from "../typechain";
import { ethers } from "ethers";
import { ref } from "vue";
import exchangeAbi from "../artifacts/contracts/Exchange.sol/Exchange.json";
import nftAbi from "../artifacts/contracts/SuperNFT.sol/SuperNFT.json";
import { useExchangeStore } from "../store/exchange";
// import { cancelSell } from '../services/exchange'

const cExchange = ref<Exchange>();
const cNFT = ref<SuperNFT>();
// const account = ref<ethers.providers.JsonRpcSigner>();
// const ExchangeAddress = "0xFfBcF4531e753F64Bf2EED4DCA7534346fc5a53c";
// const NFTAddress = "0xFE303849b63E159A8Ff81Ab4F208060a2428Fb46";
async function approveToExchange() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { ethereum } = window as any;
  if (!ethereum) return;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  // account.value = signer
  const connectedContract = new ethers.Contract(
    ExchangeAddress,
    exchangeAbi.abi,
    signer
  ) as Exchange;
  cExchange.value = connectedContract;
  console.log(cExchange.value.address);

   const nftContract = new ethers.Contract(
      NFTAddress,
      nftAbi.abi,
      signer
    ) as SuperNFT;
    cNFT.value = nftContract
    console.log('nft c', cNFT.value.address)

    cNFT.value.setApprovalForAll(cExchange.value.address, true)
}

const tokenIdToBeSell = ref("")
function sell() {
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { ethereum } = window as any;
  if (!ethereum) return;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  // account.value = signer
  const connectedContract = new ethers.Contract(
    ExchangeAddress,
    exchangeAbi.abi,
    signer
  ) as Exchange;
  cExchange.value = connectedContract;
  console.log(cExchange.value.address);

   const nftContract = new ethers.Contract(
      NFTAddress,
      nftAbi.abi,
      signer
    ) as SuperNFT;
    cNFT.value = nftContract
    console.log('nft c', cNFT.value.address)

    cExchange.value.sell(tokenIdToBeSell.value, 1 * 1e8)
}

const exchangeStore = useExchangeStore()
const cancelTokenId = ref(0)
async function cancel() {
  const hash = await exchangeStore.cancelSell(cancelTokenId.value)
  alert(`cancel completed hash: ${hash}`)
}

</script>

<template>
  Connect Smart Contract to Target Wallet
  <div style="display: flex; flex-direction: column" class="about">
    <button @click="approveToExchange">Approve NFT</button>
    <hr>
    <div><label for="">token id to be sell</label><input v-model="tokenIdToBeSell" type="text"></div>
    <button @click="sell">Sell</button>
  </div>
  <hr>
  <div>
  <label for="">Cancel</label>
  <input v-model="cancelTokenId" type="number">
  <button @click="cancel">Cancel</button>
  </div>

</template>
