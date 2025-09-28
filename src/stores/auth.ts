import { defineStore } from 'pinia'
import { getItem, setItem, removeItem } from '@/utils/storage'
import { loginRequest, registerRequest } from '@/services/auth'

const TOKEN_KEY = 'auth/token'

interface Tokens { accessToken: string; refreshToken?: string }

export const useAuthStore = defineStore('auth', {
    state: () => ({ tokens: null as Tokens | null, user: null as any, initialized: false }),
    getters: {
        isAuthenticated: (s) => !!s.tokens?.accessToken,
        accessToken: (s) => s.tokens?.accessToken || '',
    },
    actions: {
        // Restaurar el token desde el storage
        async restore() {
            const access = await getItem<string>(TOKEN_KEY)
            if (access) this.tokens = { accessToken: access }
            this.initialized = true
        },
        // Almacenar los datos de sesión en el storage
        async login(email: string, password?: string) {
            const res = await loginRequest({ email, password })
            this.tokens = { accessToken: res.accessToken }
            await setItem(TOKEN_KEY, res.accessToken)
            this.user = res.user
        },
        // Almacenar los datos de sesión en el storage
        async register(name: string, email: string, gender: 'male' | 'female', password?: string) {
            const res = await registerRequest({ name, email, gender, password })
            this.tokens = { accessToken: res.accessToken }
            await setItem(TOKEN_KEY, res.accessToken)
            this.user = res.user
        },
        // Eliminar el token de sesión del storage
        async logout() {
            this.tokens = null
            this.user = null
            await removeItem(TOKEN_KEY)
        },
    },
})
