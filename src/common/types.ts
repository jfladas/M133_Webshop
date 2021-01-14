export type Item = {
    id: string,
    productName: string,
    specialOffer: number,
    normalPrice: number,
    imageName: string,
    description: string
}

export type CartItem = {
    id: string,
    amount: number,
    price: number
}