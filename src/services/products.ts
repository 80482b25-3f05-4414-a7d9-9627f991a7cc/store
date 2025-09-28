import { http } from './http'

export async function fetchProducts() {
    const { data } = await http.get('https://dummyjson.com/products')
    return (data.products as Array<any>).map((p) => ({
        id: String(p.id),
        name: p.title,
        price: Number(p.price),
        image: p.thumbnail || p.images?.[0],
    }))
}
