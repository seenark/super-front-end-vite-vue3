// import { IUser } from "@/store/types";
import Web3 from "web3";
// import store from "../store/index";

interface IEthereum extends Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ethereum: any;
}

declare let window: IEthereum;

export async function getWeb3(): Promise<Web3 | null> {
  const isMetamask = isMetamaskInstalled();
  if (!isMetamask) {
    return null;
  }
  try {
    const web3 = new Web3(window.ethereum);
    onAccountChanged();
    onDisconnected();
    return web3;
  } catch (error) {
    return null;
  }
}

function isMetamaskInstalled(): boolean {
  if (typeof window.ethereum === "undefined") {
    alert("please installed Metamask");
    return false;
  }
  if (!window.ethereum.isMetaMask) {
    alert("We recommended to use Metamask Wallet");
    return false;
  }
  console.log("MetaMask is installed!");
  return true;
}

export async function connectMetamaskWallet(): Promise<void> {
  const accounts: string[] = await window.ethereum.request({ method: "eth_requestAccounts" });
  console.log("🚀 ~ file: web3.ts ~ line 42 ~ connectMetamaskWallet ~ accounts", accounts)
  if (accounts.length == 0) {
    alert("Not found wallet address");
    return;
  }
  // const self: IUser = {
  //   wallet: accounts[0],
  // };
  // store.account.setAccount(self);
  // console.log("req", accounts);
}

export function onAccountChanged(next?: () => void) {
  window.ethereum.on("accountsChanged", (accounts: Array<string>) => {
    // console.log("account changed", accounts);
    if (accounts.length == 0) {
      // store.account.setAccount(undefined);
      return;
    }
    // const self: IUser = {
    //   wallet: accounts[0],
    // };
    // store.account.setAccount(self);
  });
  if (next) next();
}

function onDisconnected() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  window.ethereum.on("disconnect", (error: any) => {
    // console.warn("disconnected", error);
    // store.account.setAccount(undefined);
  });
}
