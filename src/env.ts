const env = {
  env: process.env.NODE_ENV,
  telegram: {
    botToken: process.env.TG_BOT_TOKEN,
  },
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
};

export default env;
