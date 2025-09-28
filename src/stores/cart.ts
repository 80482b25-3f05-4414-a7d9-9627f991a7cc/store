import { defineStore } from 'pinia'
import { getItem, setItem } from '@/utils/storage'

export interface CartItem { id: string; name: string; price: number; qty: number; image?: string }
const CART_KEY = 'cart/items'

export const useCartStore = defineStore('cart', {
    state: () => ({ items: [] as CartItem[], initialized: false }),
    getters: {
        count: (s) => s.items.reduce((sum, i) => sum + i.qty, 0),
        total: (s) => s.items.reduce((sum, i) => sum + i.qty * i.price, 0),
    },
    actions: {
        // Restaurar productos del carrito
        async restore() {
            const saved = await getItem<CartItem[]>(CART_KEY)
            if (saved) this.items = saved
            this.initialized = true
        },
        // Agregar un producto al carrito
        async add(item: CartItem) {
            const idx = this.items.findIndex(i => i.id === item.id)
            if (idx >= 0) this.items[idx].qty += item.qty
            else this.items.push(item)
            await setItem(CART_KEY, this.items)
        },
        // Establecer la cantidad de un producto en el carrito
        async setQty(id: string, qty: number) {
            const it = this.items.find(i => i.id === id)
            if (!it) return
            it.qty = Math.max(1, qty)
            await setItem(CART_KEY, this.items)
        },
        // Eliminar un producto del carrito
        async remove(id: string) {
            this.items = this.items.filter(i => i.id !== id)
            await setItem(CART_KEY, this.items)
        },
        // Limpiar productos del carrito
        async clear() {
            this.items = []
            await setItem(CART_KEY, this.items)
        }
    }
})
