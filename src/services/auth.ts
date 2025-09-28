import { http } from './http'

const GOREST_BASE = 'https://gorest.co.in/public/v2'
const GOREST_USERS = `${GOREST_BASE}/users`

// HTTP headers necesarios para hacer el llamado a la API de GoRest
function gorestHeaders()
{
    const token = import.meta.env.VITE_GOREST_TOKEN
    return { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
}

// Iniciar sesión, retorna un token JWT
export async function loginRequest(payload: { email: string; password?: string })
{
    const { data } = await http.get(`${GOREST_USERS}?email=${encodeURIComponent(payload.email)}`, gorestHeaders())
    if (!Array.isArray(data) || data.length === 0) throw new Error('Usuario no encontrado en GoREST')
    const user = data[0]
    const accessToken = import.meta.env.VITE_GOREST_TOKEN
    return { accessToken, user }
}

// Registrar un nuevo usuario
export async function registerRequest(payload: {
    name: string; email: string; gender: 'male' | 'female'; password?: string
}) {
    const { name, email, gender } = payload
    const { data } = await http.post(GOREST_USERS, { name, email, gender, status: 'active' }, gorestHeaders())
    const accessToken = import.meta.env.VITE_GOREST_TOKEN
    return { accessToken, user: data }
}
