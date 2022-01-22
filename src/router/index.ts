import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Home from '../views/Home.vue'
import Sell from '../views/Sell.vue'
import Buy from '../views/Buy.vue'
import SwapTokenVue from '../views/SwapToken.vue'
import SwapNFTVue from '../views/SwapNFT.vue'
import UsedNFTVue from "../views/UsedNFT.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sell',
    name: 'sell',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/Sell.vue')
    component: Sell
  },
  {
    path: '/buy',
    name: 'buy',
    component: Buy
  },
  {
    path: '/token-co2',
    name: 'swaptoken',
    component: SwapTokenVue
  },
  {
    path: '/nft-co2',
    name: 'swapnft',
    component: SwapNFTVue
  },
  {
    path: "/used-nft",
    name: 'usedNfts',
    component: UsedNFTVue
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
