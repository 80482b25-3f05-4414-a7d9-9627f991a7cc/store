<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Crear cuenta</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <form @submit.prevent="onSubmit">
        <ion-item>
          <ion-input v-model="name" label="Nombre" label-placement="stacked" placeholder="Tu nombre" required />
        </ion-item>
        <ion-item>
          <ion-input v-model="password" type="password" label="Contraseña" label-placement="stacked" placeholder="Tu contraseña" />
        </ion-item>
        <ion-item>
          <ion-input v-model="email" type="email" label="Email" label-placement="stacked" placeholder="Tu correo" required />
        </ion-item>
        <ion-item>
          <ion-select v-model="gender" label="Género" label-placement="stacked">
            <ion-select-option value="male">Masculino</ion-select-option>
            <ion-select-option value="female">Femenino</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-button expand="block" class="ion-margin-top" type="submit" :disabled="loading">
          {{ loading ? 'Creando…' : 'Crear cuenta' }}
        </ion-button>
      </form>
      <ion-button fill="clear" class="ion-margin-top" @click="goLogin">¿Ya tienes cuenta? Inicia sesión</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton } from '@ionic/vue'

const name = ref('')
const email = ref('')
const gender = ref<'male' | 'female'>('male')
const password = ref('')
const loading = ref(false)
const auth = useAuthStore()
const router = useRouter()

async function onSubmit() {
  try {
    loading.value = true
    await auth.register(name.value, email.value, gender.value, password.value)
    router.replace('/login')
  } catch (e) {
    alert('No se pudo registrar. Verifica los datos.')
  } finally {
    loading.value = false
  }
}
function goLogin() { router.push('/login') }
</script>
