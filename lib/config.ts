export const config = {
  development: {
    baseURL: "http://localhost:3000",
    timeout: 30000,
  },
  staging: {
    baseURL: process.env.STAGING_URL || "https://staging.yourapp.com",
    timeout: 30000,
  },
  production: {
    baseURL: process.env.PRODUCTION_URL || "https://yourapp.com",
    timeout: 30000,
  },
} as const;

export const getConfig = () => {
  const env = process.env.NODE_ENV || "development";
  return config[env as keyof typeof config];
};
