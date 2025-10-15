import { environmentVariable } from "../../env";
import { SHOPIFY_GRAPHQL_API_ENDPOINT } from "./constants";
import { isShopifyError } from "./shopify/type.guard";

export function ensureStartWith(stringToCheck: string, startsWith: string) {
  return stringToCheck.startsWith(startsWith) ? stringToCheck : `${startsWith}${stringToCheck}`;
}

export const domain = environmentVariable.domain
  ? ensureStartWith(environmentVariable.domain, "https://")
  : "";
const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;

type ExtractVariables<T> = T extends { variables: object }
  ? T["variables"]
  : never;

export async function shopifyFetch<T>({
  cache = "force-cache",
  headers,
  query,
  tags,
  variables,
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
  try {
    console.log('🔍 Endpoint:', endpoint);
    console.log('🔑 Token:', environmentVariable.key?.substring(0, 10) + '...');
    console.log('📦 Query:', query);
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": environmentVariable.key,
        ...headers,
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables }),
      }),
      cache,
      ...(tags && { next: { tags } }),
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body,
    };
  } catch (error) {
    if (isShopifyError(error)) {
      throw {
        cause: error.cause?.toString() || "unknown",
        status: error.status || 500,
        message: error.message,
        query,
      };
    }

    throw {
      error,
      query,
    };
  }
}

export const ASSETS = {
  logo: 'https://framerusercontent.com/images/EQrwRO1DcUwMjEwIscE6PHiIQw.svg',
  hero1: 'https://framerusercontent.com/images/Pm8aIIZc1vtQLar92NlOVHVfg.png',
  hero2: 'https://framerusercontent.com/images/zgH9iFm9Jy0JlSaToXSL6rCDlk.png',
  card1: 'https://framerusercontent.com/images/GAKdXV1aPZp7ySJWh34mr1P1ZsA.png',
  card2: 'https://framerusercontent.com/images/aoAtyeke8GQZadofK4eweHSw.png',
  productA: 'https://framerusercontent.com/images/IC43SmGjdliAn6sxdSTN1U9HaGs.png',
  productB: 'https://framerusercontent.com/images/XQlUJ7DxrJyKRfCaUHRjwrSvuo.png',
  productC: 'https://framerusercontent.com/images/svEz5QaSD2vyupGSaFv3pfcFW4.png',
  productD: 'https://framerusercontent.com/images/5kS4SlRfKqkdo0AFH7Jl9meGo.png',
  icons: {
    left: 'https://framerusercontent.com/images/6tTbkXggWgQCAJ4DO2QEdXXmgM.svg',
    right: 'https://framerusercontent.com/images/11KSGbIZoRSg4pjdnUoif6MKHI.svg'
  }
};