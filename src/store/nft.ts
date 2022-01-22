import { ExchangeAddress } from './../constants';
import { useStore } from "./store";
import { defineStore } from "pinia";
import { NFTAddress } from "../constants";
import nftAbi from "../artifacts/contracts/SuperNFT.sol/SuperNFT.json";
import { ethers } from "ethers";
import { SuperNFT } from "../typechain";

export const useNFTStore = defineStore("nft", {
  state: () => ({}),
  getters: {},
  actions: {
    async getNFTContract() {
      const store = useStore();
      const account = store.account;
      if (!account) return Promise.reject("no account");
      const connectedContract = new ethers.Contract(
        NFTAddress,
        nftAbi.abi,
        account
      ) as SuperNFT;
      return connectedContract;
    },
    async createNFT(tokenUri: string) {
      try {
        const contract = await this.getNFTContract();
        const tx = await contract.createNFT(
          `https://gateway.pinata.cloud/ipfs/${tokenUri}`
        );
        await tx.wait();
        return tx.hash;
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    },
    async fetchNFT(tokenId: string): Promise<string> {
      try {
        const contract = await this.getNFTContract();
        const nft = await contract.tokenURI(tokenId);
        return nft;
      } catch (error) {
        console.log(error);
        return Promise.reject("not found tokenURI");
      }
    },
    async approveForAll() {
      try {
        const contract = await this.getNFTContract();
        const tx = await contract.setApprovalForAll(ExchangeAddress, true)
        await tx.wait()
        return tx.hash
      } catch (error) {
        return Promise.reject(`error approve for all: ${error}`)
      }
    }
  },
});
