import z from "zod";

const EnvSchema = z.object({
  appName: z.string().trim(),
  cookieExpiresInDay: z.coerce.number().int(),
  baseUrl: z.string().trim(),
});

type EnvType = z.infer<typeof EnvSchema>;

const envInput: Record<keyof EnvType, unknown> = {
  appName: process.env.NEXT_PUBLIC_APP_NAME,
  cookieExpiresInDay: process.env.NEXT_PUBLIC_COOKIE_EXPIRES_IN_DAY,
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
};

const { data, success, error } = EnvSchema.safeParse(envInput);

if (!success) {
  throw error;
}

const env: EnvType = data;

export default env;
