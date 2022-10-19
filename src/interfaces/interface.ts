export interface Thumbnail {
    _id?: string;
    urlId?: string;
    url: string;
}

export interface Picture {
    _id?: string;
    urlId?: string;
    url: string;
}

export interface Product {
    _id?: string;
    trademark: string;
    name: string;
    price: string;
    sizes: string[];
    description: string;
    colors: string[];
    discount: string;
    quantity: string;
    thumbnails: Thumbnail[];
    categoryName?: string;
    categoryId?: string;
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

export interface Alias {
    _id: string;
    name: string;
    deleted: boolean;
}

export interface Category {
    _id: string;
    name: string;
    aliasId: string;
    deleted: boolean;
    aliasName?: string;
}

export interface News {
    _id: string;
    title: string;
    content: string;
    pictures: Picture[];
}

export interface HomeData {
    bannerUrls: string[];
    news: News[];
    featuredProducts: [
        {
            title: string;
            data: Product[];
        }
    ];
    collections: [
        {
            title: string;
            data: Product[];
        }
    ];
}
