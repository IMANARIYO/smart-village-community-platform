// Environment variables helper
export const env = {
  // API Configuration
  API_BASE_URL:
    import.meta.env.VITE_API_BASE_URL || "https://smartville.onrender.com",

  // App Configuration
  APP_NAME: import.meta.env.VITE_APP_NAME || "Smart Village Community Platform",
  APP_VERSION: import.meta.env.VITE_APP_VERSION || "1.0.0",

  // Site Configuration
  SITE_URL: import.meta.env.VITE_SITE_URL || "https://smartvillage.community",
  SITE_NAME:
    import.meta.env.VITE_SITE_NAME || "Smart Village Community Platform",
  SITE_DESCRIPTION:
    import.meta.env.VITE_SITE_DESCRIPTION ||
    "Join your local community platform",

  // Social Media
  TWITTER_HANDLE: import.meta.env.VITE_TWITTER_HANDLE || "@SmartVillage",
  OG_IMAGE: import.meta.env.VITE_OG_IMAGE || "/images/smart-village-og.jpg",

  // Development
  DEV_PORT: parseInt(import.meta.env.VITE_DEV_PORT || "3000"),
  ENABLE_DEVTOOLS: import.meta.env.VITE_ENABLE_DEVTOOLS === "true",

  // Environment
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  mode: import.meta.env.MODE,
} as const;
