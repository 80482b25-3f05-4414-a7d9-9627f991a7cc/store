import { createRouter, createWebHistory } from '@ionic/vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { authGuard } from './guards'

// Carga perezosa de las páginas
const Cart = () => import('../pages/Cart.vue')
const Login = () => import('../pages/Login.vue')
const Products = () => import('../pages/Products.vue')
const Profile = () => import('../pages/Profile.vue')
const Register = () => import('../pages/Register.vue')

const routes: Array<RouteRecordRaw> = [
    { path: '/', redirect: '/products' },
    { path: '/cart', name: 'Cart', component: Cart },
    { path: '/login', name: 'Login', component: Login, meta: { public: true } },
    { path: '/products', name: 'Products', component: Products },
    { path: '/profile', name: 'Profile', component: Profile },
    { path: '/register', name: 'Register', component: Register, meta: { public: true } }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

// Protege las rutas privadas salvo meta.public
router.beforeEach(authGuard)

export default router
