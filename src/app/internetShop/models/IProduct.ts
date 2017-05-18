export interface IProduct {
    id: number;
    images: number[];
    mainImageId: number;
    name: string;
    category: {
        id: number;
        categoryName?: string;
        urlName?: string;
    };
}