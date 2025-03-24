import type { APIRoute } from "astro";
import { getCustomerAccessToken, getUserDetails } from "@/lib/store";
import { app } from "../../firebase/server";
import { getAuth } from "firebase-admin/auth";

export const GET:APIRoute = async({ request, cookies, redirect }:any) => {
  const auth = getAuth(app);

  /* Get token from request headers */
  const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];
  if (!idToken) {
    return new Response(
      "No token found",
      { status: 401 }
    );
  }

  /* Verify id token */
  try {
    await auth.verifyIdToken(idToken);
  } catch (error) {
    return new Response(
      "Invalid token",
      { status: 401 }
    );
  }

  /* Create and set session cookie */
  const fiveDays = 60 * 60 * 24 * 5 * 1000;
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: fiveDays,
  });

  cookies.set("__session", sessionCookie, {
    path: "/",
  });

  const { customer } = await getUserDetails(idToken);

  const response = new Response(JSON.stringify({ ...customer, token:idToken }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });

  // Set token in cookie with HttpOnly flag
  response.headers.set("Set-Cookie", `token=${idToken}; Path=/; SameSite=Lax`);

  return response;
}

export const POST:APIRoute = async ({ request, cookies, redirect }:any ) => { // { request: Request }
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({
          errors: [{ message: "Email and password are required." }],
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Get the customer token via Shopify API
    const { token, customerLoginErrors } = await getCustomerAccessToken({
      email,
      password,
    });

    if (customerLoginErrors?.length > 0) {
      return new Response(JSON.stringify({ errors: customerLoginErrors }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Fetch customer details using the token
    const { customer } = await getUserDetails(token);

    const response = new Response(JSON.stringify({ ...customer, token }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

    // Set token in cookie with HttpOnly flag
    response.headers.set("Set-Cookie", `token=${token}; Path=/; SameSite=Lax`);

    return response;
  } catch (error: any) {
    console.error("Error during login:", error);

    return new Response(
      JSON.stringify({
        errors: [
          {
            code: "INTERNAL_ERROR",
            message: error.message || "An unknown error occurred",
          },
        ],
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
