import { ExchangeAddress } from './../constants';
import { useStore } from "./store";
import { defineStore } from "pinia";
import { TokenAddress } from "../constants";
import { SuperToken } from "../typechain";
import tokenAbi from "../artifacts/contracts/SuperToken.sol/SuperToken.json";
import { ethers } from "ethers";

export const useTokenStore = defineStore("token", {
  state: () => ({}),
  getters: {},
  actions: {
    async getTokenContract() {
      const store = useStore();
      const signer = store.account;
      if (!signer) return Promise.reject("no account");
      const tokenContract = new ethers.Contract(
        TokenAddress,
        tokenAbi.abi,
        signer
      ) as SuperToken;
      return tokenContract;
    },
    async approve() {
        const contract = await this.getTokenContract()
        const tx = await contract.approve(ExchangeAddress, 1 * 1e8)
        await tx.wait()
        return tx.hash
    }
  },
});
