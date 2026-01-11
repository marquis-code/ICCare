import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  ssr: false,

  postcss: {
    plugins: {
      "postcss-import": {},
      "tailwindcss/nesting": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.VITE_BASE_URL,
      googleClientId: process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID,
      paystackPublicKey: process.env.NUXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    },
  },

  app: {
    head: {
      title: "iCCare Biobank | Integrated Clinical & BioSpecimen Repository Platform",
      htmlAttrs: { lang: "en" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },

        // ✅ SEO meta
        {
          name: "description",
          content:
            "iCCare Biobank provides secure access for research and biobank collaboration, ensuring HIPAA & GDPR compliance, and real-time tracking for over 500 institutions.",
        },
        {
          name: "keywords",
          content:
            "biobank, clinical research, HIPAA compliance, GDPR certified, real-time tracking, bio specimen, healthcare collaboration, iCCare Biobank",
        },
        { name: "author", content: "iCCare Biobank" },

        // ✅ Open Graph (for social previews)
        { property: "og:title", content: "iCCare Biobank — Integrated Clinical & BioSpecimen Repository" },
        {
          property: "og:description",
          content:
            "Discover iCCare Biobank’s secure platform for clinical and bio-specimen research collaboration with HIPAA & GDPR compliance and real-time sample tracking.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://iccarebiobank.com" },
        { property: "og:image", content: "https://iccarebiobank.com/og-image.jpg" },

        // ✅ Twitter meta
        { name: "twitter:card", content: "summary_large_image" },
        { property: "twitter:url", content: "https://iccarebiobank.com" },
        { name: "twitter:title", content: "iCCare Biobank — Secure Biobank & Research Platform" },
        {
          name: "twitter:description",
          content:
            "Collaborate on secure biobank and clinical research with iCCare Biobank. HIPAA & GDPR certified, offering real-time tracking for samples and transfers.",
        },
        { name: "twitter:image", content: "https://iccarebiobank.com/og-image.jpg" },
      ],

      link: [
        { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
        { rel: "shortcut icon", href: "/favicon.ico", type: "image/x-icon" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon-96x96.png" },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "manifest", href: "/site.webmanifest" }
      ],

      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js",
          type: "text/javascript",
        },
      ],
    },
  },

  build: {
    transpile: ["lucide-vue-next"],
  },

  css: ['/assets/css/font/stylesheet.css', "/assets/css/main.css"],

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@nuxtjs/robots",
  ],

  googleFonts: {
    families: {
      "Inter": [400, 500, 600, 700],
      "Poppins": [400, 500, 600, 700],
    },
    display: "swap",
    preload: true,
  },

  compatibilityDate: "2025-12-17"
});