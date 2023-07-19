export interface Order {
    _id: string
    name: string
    phone: number
    country: string
    address: string
    city: string
    totalPrice: number
    notes: string
    delivered: boolean
    orderItems: OrderItem[]
}

export interface OrderItem {
    _id: string
    quantity: number
    product: Product
    size: Size
    head?: Head
    cutting?: Cutting
    preparation?: Preparation
    donationSide?: DonationSide
    donationStatus?: DonationStatus
}

export interface Product {
    _id: string
    name: string
    imageUrl: string
}

export interface Size {
    _id: string
    name: string
    price: number
}

export interface Head {
    name: string
    _id: string
}

export interface Cutting {
    name: string
    _id: string
}

export interface Preparation {
    name: string
    _id: string
}
export interface DonationSide {
    name: string
    _id: string
}
export interface DonationStatus {
    name: string
    _id: string
}