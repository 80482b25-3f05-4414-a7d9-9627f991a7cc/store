<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Carrito</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list v-if="cart.items.length">
        <ion-item v-for="it in cart.items" :key="it.id">
          <ion-label>
            <h3>{{ it.name }}</h3>
            <p>${{ it.price.toFixed(2) }}</p>
          </ion-label>
          <ion-input type="number" :value="it.qty" @ionInput="onQty(it.id, $event)" style="width:80px" />
          <ion-button color="danger" @click="cart.remove(it.id)">Quitar</ion-button>
        </ion-item>
      </ion-list>
      <p v-else>Tu carrito está vacío.</p>

      <ion-item lines="full" class="ion-margin-top">
        <ion-label><strong>Total</strong></ion-label>
        <ion-note slot="end">${{ cart.total.toFixed(2) }}</ion-note>
      </ion-item>

      <ion-button expand="block" class="ion-margin-top" :disabled="!cart.items.length" @click="checkout">
        Pagar
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCartStore } from '@/stores/cart'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonButton, IonNote } from '@ionic/vue'

const cart = useCartStore()

onMounted(async () => { if (!cart.initialized) await cart.restore() })

function onQty(id: string, ev: any) {
  const v = Number(ev.target?.value || ev.detail?.value)
  if (!Number.isNaN(v)) cart.setQty(id, v)
}
function checkout() {
  alert('Se ha realizado el pago')
}
</script>
