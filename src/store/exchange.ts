import { useNFTStore } from './nft';
import { IUsedNFT } from "./../types/Exchange";
import { ethers } from "ethers";
import { Exchange__factory } from "./../typechain/factories/Exchange__factory";
import { defineStore } from "pinia";
import { Exchange } from "../typechain";
import { useStore } from "./store";
import { ExchangeAddress } from "../constants";
import exchangeAbi from "../artifacts/contracts/Exchange.sol/Exchange.json";

export const useExchangeStore = defineStore("exchange", {
  state: () => ({
    // cExchange: null as (Exchange | null)
  }),
  getters: {},
  actions: {
    async getExchangeContract(): Promise<Exchange> {
      const store = useStore();
      const account = store.account;
      if (!account) return Promise.reject("no account");
      const connectedContract = new ethers.Contract(
        ExchangeAddress,
        exchangeAbi.abi,
        account
      ) as Exchange;
      return connectedContract;
    },
    async directBuyCo2CreditFromToken(): Promise<string> {
     try {
      const cExchange = await this.getExchangeContract();
      const openForTrades = await cExchange.getAllNFTOpenForTrades()
      if (openForTrades.length <= 0) throw new Error("there is no any NFT open for trade")
      const tx = await cExchange.directBuyCo2FromToken(openForTrades[0]);
      await tx.wait();
      alert(`completed TX hash: ${tx.hash}`);
      return tx.hash;
     } catch (error) {
       console.log(error)
       return Promise.reject(error)
     }
    },
    async redeemNftToCo2Credit(tokenId:number): Promise<string> {
      const cExchange = await this.getExchangeContract();
      const tx = await cExchange.transformNFTToCo2Credit(tokenId)
      await tx.wait()
      return tx.hash
    },
    async getAllNFTOpenForTrades(): Promise<number[]> {
      const cExchange = await this.getExchangeContract();
      const nfts = await cExchange.getAllNFTOpenForTrades();
      return nfts.map((a) => a.toNumber());
    },
    async cancelSell(tokenId: number): Promise<string> {
      const cExchange = await this.getExchangeContract();
      const tx = await cExchange.cancelSell(tokenId);
      await tx.wait();
      return tx.hash;
    },
    async getUsedNFTs() {
      const cExchange = await this.getExchangeContract();
      const tx = await cExchange.getUsedNFTs();
      return tx;
    },
    async buy(buyTokenId: string) {
      const cExchange = await this.getExchangeContract();
      const tx = await cExchange.buy(buyTokenId);
      await tx.wait();
      return tx.hash;
    },
    async sell(tokenId: string) {
      const cExchange = await this.getExchangeContract();
      const tx = await cExchange.sell(tokenId, 1 * 1e8);
      await tx.wait();
      return tx.hash;
    },
    async watchUsedNFTUpdate(
      next: (usedNFTs: IUsedNFT[], idOpenForTrades: number[]) => void
    ) {
      const cExchange = await this.getExchangeContract();
      const filter = cExchange.filters.UpdateUsedNFT();
      cExchange.on(filter, (usedNFT, openForTradesArray) => {
        const usedNFTs = usedNFT.map(
          (nft) =>
            ({
              customer: nft.customer,
              tokenId: nft.tokenId.toNumber(),
              tokenURI: nft.tokenURI,
            } as IUsedNFT)
        );
        const IdOpenForTrades = openForTradesArray.map((s) => s.toNumber());
        next(usedNFTs, IdOpenForTrades);
      });
    },
    async getUsedNFTFromExchange() {
      const cExchange = await this.getExchangeContract();
      const nfts = await cExchange.getUsedNFTs();
      const newNFTs: IUsedNFT[] = nfts.map((nft) => {
        return {
          customer: nft.customer,
          tokenId: nft.tokenId.toNumber(),
          tokenURI: nft.tokenURI,
        };
      });
      return newNFTs;
    },
  },
});
