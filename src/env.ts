const env = {
  env: process.env.NODE_ENV,
  isProduction: process.env.NODE_ENV === "production",
  app: {
    version: process.env.appVersion,
    erudaDisabled: process.env.NEXT_PUBLIC_ERUDA_DISABLED === "true",
  },
  vercel: {
    gitCommitRef: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF,
    gitCommitSha: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
  },
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : ""),
  auth: {
    url: process.env.AUTH_URL!,
    secret: process.env.AUTH_SECRET!,
  },
  telegram: {
    botToken: process.env.TG_BOT_TOKEN,
    userValidationDisabled: process.env.TG_USER_VALIDATION_DISABLED === "true",
  },
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
};

export default env;
