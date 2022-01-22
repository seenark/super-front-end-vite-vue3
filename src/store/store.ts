import { TOKEN_SYMBOL, TOKEN_NAME, TOKEN_DECIMAL } from "./../constants";
import { ethers } from "ethers";
import { defineStore } from "pinia";
import { TokenAddress } from "../constants";

export const useStore = defineStore("main", {
  state: () => ({}),
  getters: {
    provider(): ethers.providers.Web3Provider | null {
      const { ethereum } = window as any;
      if (!ethereum) return null;
      const provider = new ethers.providers.Web3Provider(ethereum);
      return provider;
    },
    account(): ethers.providers.JsonRpcSigner | null {
      const Provider = this.provider;
      if (!Provider) return null;
      return Provider.getSigner();
    },
  },
  actions: {
    connnectWallet() {
      if (!this.provider) {
        alert("Please install Metamask");
        return;
      }
      this.provider.send("eth_requestAccounts", []);
    },
    onAccountChanged(next?: () => void) {
      // if (!this.provider) {
      //     alert("Please install Metamask");
      //     return
      // }
      // const a = this.provider.on("accountsChanged", () => {

      // } )
      (window as any).ethereum.on(
        "accountsChanged",
        (accounts: Array<string>) => {
          if (accounts.length == 0) {
            return;
          }
        }
      );
      if (next) next();
    },
    onDisconnected() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).ethereum.on("disconnect", (error: any) => {
        // console.warn("disconnected", error);
        // store.account.setAccount(undefined);
      });
    },
    addTokenToWallet(address: string, symbol: string, decimal:number, type: "ERC20" | "ERC721" = "ERC20") {
      // const tokenAddress = TokenAddress;
      // const tokenSymbol = TOKEN_SYMBOL;
      // const tokenName = TOKEN_NAME
      // const decimal = TOKEN_DECIMAL;
      try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        const wasAdded = (window as any).ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: type, // Initially only supports ERC20, but eventually more!
            options: {
              address: address, // The address that the token is at.
              symbol: symbol, // A ticker symbol or shorthand, up to 5 chars.
              decimals: decimal, // The number of decimals in the token
              image: "", // A string url of the token logo
            },
          },
        });

        if (wasAdded) {
          console.log("Thanks for your interest!");
        } else {
          console.log("Your loss!");
        }
      } catch (error) {
        return Promise.reject("not found");
      }
    },
  },
});
