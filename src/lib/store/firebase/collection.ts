import type { Product, PageInfo, Collection } from "../types";

export const getCollectionProducts = async ({
    collection,
    reverse
}:{
    collection: string;
    reverse?: boolean;
    sortKey?: string;
    filterCategoryProduct?: any[]
}):Promise<{ pageInfo: PageInfo | null; products: Product[] }> => {

    return {
        pageInfo: null,
        products: []
    }
}

export const getCollections = async ():Promise<Collection[]> => {
    return []
}
