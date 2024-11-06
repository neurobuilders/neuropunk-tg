const env = {
  env: process.env.NODE_ENV,
  isProduction: process.env.NODE_ENV === "production",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : ""),
  auth: {
    url: process.env.AUTH_URL!,
    secret: process.env.AUTH_SECRET!,
  },
  telegram: {
    botToken: process.env.TG_BOT_TOKEN,
  },
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
};

export default env;
