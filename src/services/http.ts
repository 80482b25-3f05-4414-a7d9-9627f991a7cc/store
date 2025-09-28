import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

// Crea una conexión HTTP
export const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE || '',
    timeout: 10000,
})

// Adjuntar token si existe
http.interceptors.request.use((config) => {
    const auth = useAuthStore()
    if (auth?.accessToken) {
        config.headers = config.headers || {}
        config.headers.Authorization = `Bearer ${auth.accessToken}`
    }
    return config
})

// Si la petición HTTP está desautorizada, se cierra la sesión (vencimiento del token)
http.interceptors.response.use(
    (res) => res,
    async (error) => {
        const auth = useAuthStore()
        const { response, config } = error
        if (response?.status === 401 && auth?.tokens?.refreshToken && !config.__isRetryRequest) {
            await auth.logout()
        }
        return Promise.reject(error)
    }
)
