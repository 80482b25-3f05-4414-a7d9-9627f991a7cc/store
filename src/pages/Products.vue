<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Productos</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="goCart">Carrito ({{ cart.count }})</ion-button>
          <ion-button @click="goProfile">Perfil</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <product-card v-for="p in products" :key="p.id" :product="p" @add="addToCart" />
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { fetchProducts } from '@/services/products'
import { useCartStore } from '@/stores/cart'
import ProductCard from '@/components/ProductCard.vue'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonButtons, IonButton } from '@ionic/vue'

const products = ref<any[]>([])
const cart = useCartStore()
const router = useRouter()

onMounted(async () => {
  if (!cart.initialized) await cart.restore()
  products.value = await fetchProducts()
})

function addToCart(p: any) {
  cart.add({ id: p.id, name: p.name, price: p.price, qty: 1, image: p.image })
}
function goCart() { router.push('/cart') }
function goProfile() { router.push('/profile') }
</script>
