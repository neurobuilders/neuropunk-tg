import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/core/i18n/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["t.me", "cdn.neurocdn.ru"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "t.me",
        port: "",
        pathname: "/u/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
