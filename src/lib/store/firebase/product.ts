import type { PageInfo, Product } from "../types"

export const getHighestProductPrice = () => {}

export const getProducts = async ({
    sortKey,
    reverse,
    query,
    cursor
}:{
    sortKey: "RELEVANCE" | "BEST_SELLING" | "CREATED_AT" | "PRICE"
    reverse: boolean
    query?: string
    cursor: string | null | undefined
}): Promise<{
    products: Product[]
    pageInfo?: PageInfo|null
}> => {

    return {
        products: [],
        pageInfo: null
    }
}

export const getProduct = async (slug:string): Promise<Product|undefined> => {
    return undefined
}

export const getProductRecommendations = async (productId:string): Promise<Product[]> => {
    return []
}
