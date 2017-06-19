export interface IPropertyWithValues {
    id: {
        property: {
            deleted: boolean;
            id: number;
            name: string;
            priority: number;
            type: string;
        };
        vals: string[];
    };
}