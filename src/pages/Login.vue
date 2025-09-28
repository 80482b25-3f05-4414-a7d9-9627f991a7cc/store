<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Iniciar sesión</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <form @submit.prevent="onSubmit">
        <ion-item>
          <ion-input v-model="email" type="email" label="Email" label-placement="stacked" placeholder="usuario@dominio.ext" required />
        </ion-item>
        <ion-item>
          <ion-input v-model="password" type="password" label="Contraseña" label-placement="stacked" placeholder="••••••••" required />
        </ion-item>
        <ion-button expand="block" class="ion-margin-top" type="submit" :disabled="loading">
          {{ loading ? 'Entrando…' : 'Entrar' }}
        </ion-button>
      </form>
      <ion-button fill="clear" class="ion-margin-top" @click="goRegister">
        ¿No tienes cuenta? Regístrate
      </ion-button>
    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton } from '@ionic/vue'


const email = ref('')
const password = ref('')
const loading = ref(false)
const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

async function onSubmit() {
  try {
    loading.value = true
    await auth.login(email.value, password.value)
    const redirect = (route.query.redirect as string) || '/products'
    router.replace(redirect)
  } catch (e: any) {
    console.error(e)
    alert('Credenciales inválidas')
  } finally {
    loading.value = false
  }
}

function goRegister() { router.push('/register') }

</script>
