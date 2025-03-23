import type { Cart } from "../types";

export const getCart = async (cartId:string): Promise<Cart> => {
    const amount = {
        amount: "10",
        currencyCode: "$"
    }

    return {
        id: cartId,
        checkoutUrl:"",
        cost: {
            subtotalAmount: amount,
            totalAmount: amount,
            totalTaxAmount: amount
        },
        totalQuantity: 0,
        lines: []
    }
}

export const addToCart = async (
    cartId:string,
    items:{
        merchandiseId:string,
        quantity:number
    }[]) => {
        
}

export const createCart = async ():Promise<Cart> => {
    return getCart("")
}

export const removeFromCart = async (cartId:string, lines:string[]) => {

}

export const updateCart = async (
    cartId:string,
    lines:{
        id:string
        merchandiseId:string
        quantity:number
    }[]
) => {
    
}