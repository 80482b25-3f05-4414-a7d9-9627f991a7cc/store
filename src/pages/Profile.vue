<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Perfil</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-button expand="block" color="medium" @click="logout">Cerrar sesión</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue'

const auth = useAuthStore()
const router = useRouter()

async function logout() {
  await auth.logout()
  router.replace('/login')
}
</script>
