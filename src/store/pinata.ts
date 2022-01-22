import axios from "axios";
import { defineStore } from "pinia";

const apiKey = "fc56bb6f36bf32b0087e";
const secret =
  "2f3cfd22e4591b95665ec94818a44b73e4ca00d5898598164359edeab269e317";
const jwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmNzQ3ODkwNS1mZmYxLTQzNGYtODc2Yi1jYjhiOWJhYzIxMzUiLCJlbWFpbCI6InVtX29vbUBob3RtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2V9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJmYzU2YmI2ZjM2YmYzMmIwMDg3ZSIsInNjb3BlZEtleVNlY3JldCI6IjJmM2NmZDIyZTQ1OTFiOTU2NjVlYzk0ODE4YTQ0YjczZTRjYTAwZDU4OTg1OTgxNjQzNTllZGVhYjI2OWUzMTciLCJpYXQiOjE2NDE2MTg2MDB9.r-8wyp_qQWHf-vapNdRjEkf9tHtcQ0SbEedObBJkY3M";
const url = "https://api.pinata.cloud";

interface IPinFileResponse {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
}

export const usePinataStore = defineStore("pinata", {
  state: () => ({}),
  getters: {},
  actions: {
    async uploadFile(file: File): Promise<IPinFileResponse> {
      const options = {
        headers: {
          pinata_api_key: apiKey,
          pinata_secret_api_key: secret,
        },
      };
      const form = new FormData();
      form.append("file", file);
      const { data } = await axios.post<IPinFileResponse>(
        `${url}/pinning/pinFileToIPFS`,
        form,
        options
      );
      console.log("data", data);
      return data;
    },
  },
});
