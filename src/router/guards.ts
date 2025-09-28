import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export async function authGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
    const auth = useAuthStore()
    if (!auth.initialized) {
        await auth.restore() // Cargar el token desde el storage
    }
    if (to.meta.public) return next()
    if (auth.isAuthenticated) return next()
    return next({ path: '/login', query: { redirect: to.fullPath } })
}
