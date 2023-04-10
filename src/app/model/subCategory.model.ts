import { Category } from "./category-model";
import { Product } from "./product-model";

export interface SubCategory {
    _id: string,
    name: string,
    name_ar: string,
    category: Category,
    products: Product[]
}