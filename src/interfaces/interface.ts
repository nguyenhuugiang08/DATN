export interface Thumbnail {
    _id: string;
    urlId: string;
    url: string;
}

export interface Product {
    _id: string;
    trademark: string;
    name: string;
    price: number;
    sizes: string[];
    description: string;
    colors: string[];
    discount: number;
    quantity: number;
    thumbnails: Thumbnail[];
    categoryId: string;
}

export interface User {
    name: string;
    surname: string;
    email: string;
    password?: string;
    phone: string;
    role?: string;
    accessToken: string;
    createdAt?: string;
    updatedAt?: string;
}
