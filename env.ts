import z from "zod"

const envSchema = z.object({
  SHOPIFY_STORE_DOMAIN: z.string("SHOPIFY_STORE_DOMAIN must be of type string").nonempty("SHOPIFY_STORE_DOMAIN is required"),
  SHOPIFY_STOREFRONT_ACCESS_TOKEN: z.string("SHOPIFY_STOREFRONT_ACCESS_TOKEN must be a string").nonempty("SHOPIFY_STOREFRONT_ACCESS_TOKEN is required"),
  COMPANY_NAME: z.string(),
  TWITTER_CREATOR: z.string(),
  TWITTER_SITE: z.string(),
  SITE_NAME: z.string(),
  SHOPIFY_REVALIDATION_SECRET: z.string(),
})

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:", parsedEnv.error.format());
  throw new Error("Invalid or missing environment variables.");
}

export const environmentVariable = {
  domain: parsedEnv.data?.SHOPIFY_STORE_DOMAIN,
  key: parsedEnv.data.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
}