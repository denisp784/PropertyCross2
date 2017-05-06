export interface IProductProperty {
    id: number;
    product: {
        id: number;
    };
    propertiesValues: {
        property: {
            id: number;
        };
        value: string;
    }[];
}