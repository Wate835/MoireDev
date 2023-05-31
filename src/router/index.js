import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../pages/MainPage.vue'
import CartPage from '../pages/CartPage.vue'
import ProductPage from '../pages/ProductPage.vue'
import OrderPage from '../pages/OrderPage.vue'
import OrderInfoPage from '../pages/OrderInfoPage.vue'
import NotFoundPage from '../pages/NotFoundPage.vue'

const routes = [
  { path: '/Moire/', name: 'main', component: MainPage },
  { path: '/Moire/cart', name: 'cart', component: CartPage },
  { path: '/Moire/product/:id', name: 'product', component: ProductPage },
  { path: '/Moire/order', name: 'order', component: OrderPage },
  { path: '/Moire/order/:id', name: 'orderInfo', component: OrderInfoPage },
  { path: '/Moire/notFound(.*)*', name: 'notfound', component: NotFoundPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
