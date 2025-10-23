export const AppConfig = {
  apiUrl: import.meta.env.VITE_API_URL || "http://172.25.0.112/API_A7MANGATUR_GO",
  version: "1.0.0",
  apiDB: import.meta.env.VITE_API_DB || "dev-a7mangatur",
  appKey:
    import.meta.env.VITE_APP_KEY ||
    "bd0c956113ecb5dcb8b22d81b8932739b9fbf1e16beb69d42f46fe3fb359e36f",
};