import type { user } from "../types";
import { getAuth } from "firebase-admin/auth";
import { app } from "../../../firebase/server";


export const getUserDetails = async (accessToken:string): Promise<user> => {
    const firstName = ""
    const lastName = ""
    const email = ""
    const phone = ""

    return {
        customer: {
            firstName,
            lastName,
            email,
            phone,
            acceptsMarketing: false
        }
    }
}

export const getCustomerAccessToken = async ({
    email,
    password
}:{
    email:      string
    password:   string
}) : Promise<{
    token: string
    data: any
    customerLoginErrors: string[]
}> => {
    
    const auth = getAuth(app);
    const user = await auth.getUserByEmail( email )
    const dataUser = await user.toJSON()
    return {
        token: "" ,
        data: dataUser,
        customerLoginErrors: []
    }
}

export const createCustomer = async ({
    email,
    password,
    firstName,
    lastName
}:{
    email: string
    password: string
    firstName: string
    lastName?: string
}):Promise<{
    customer: any|null
    customerCreateErrors: string[]
}> => {
    const auth = getAuth(app);

    try {
        const customer = await auth.createUser({
          email,
          password,
          displayName: lastName ? `${firstName} ${lastName}` : firstName,
        });
        return {
            customer,
            customerCreateErrors: []
        }
      } catch (error: any) {
        return {
            customer: null,
            customerCreateErrors: [
                "Something went wrong"
            ]
        }
      }
}