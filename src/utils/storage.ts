import { Preferences } from '@capacitor/preferences'

// Insertar un ítem en el storage
export async function setItem(key: string, value: any)
{
    await Preferences.set({ key, value: JSON.stringify(value) })
}

// Obtener un ítem del storage
export async function getItem<T = any>(key: string): Promise<T | null>
{
    const { value } = await Preferences.get({ key })
    return value ? JSON.parse(value) as T : null
}

// Eliminar un ítem del storage
export async function removeItem(key: string)
{
    await Preferences.remove({ key })
}
