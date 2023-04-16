export interface Product {
    _id: string
    image: string
    name: string
    name_ar: string
    country: string
    sizes: Size[]
    head: Head[]
    cutting: Cutting[]
    preparation: Preparation[]
    donationStatus: any[]
    donationSide: any[]
    createdAt: string
    updatedAt: string
}

interface Size {
    name: string
    name_ar: string
    price: number
    _id: string
}

interface Head {
    name: string
    name_ar: string
    _id: string
}

interface Cutting {
    name: string
    name_ar: string
    _id: string
}

interface Preparation {
    name: string
    name_ar: string
    _id: string
}
