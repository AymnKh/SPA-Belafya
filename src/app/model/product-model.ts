export interface Product {
    _id: string
    image: string
    name: string
    sizes: Size[]
    head: Head[]
    cutting: Cutting[]
    preparation: Preparation[]
    donationSide: any[]
    donationStatus: any[]
}

export interface Size {
    name: string
    price: number
}

export interface Head {
    name: string
}

export interface Cutting {
    name: string
}

export interface Preparation {
    name: string
}