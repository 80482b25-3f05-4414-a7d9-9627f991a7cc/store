<template>
  <ion-item lines="full">
    <ion-thumbnail slot="start" v-if="product.image">
      <img :src="product.image" alt="" />
    </ion-thumbnail>
    <ion-label>
      <h2>{{ product.name }}</h2>
      <p>${{ product.price.toFixed(2) }}</p>
    </ion-label>
    <ion-button slot="end" @click="$emit('add', product)">Agregar</ion-button>
  </ion-item>
</template>

<script setup lang="ts">
import { IonItem, IonThumbnail, IonLabel, IonButton } from '@ionic/vue'
const props = defineProps<{ product: any }>()
</script>
