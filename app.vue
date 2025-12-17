<template>
 <div>
   <UiToast class="z-[9999999]" />
   <NuxtLayout class="z-10">
     <NuxtPage class="z-10" />
   </NuxtLayout>
 </div>
</template>

<style>
body {
  font-family: 'Roobert PRO', sans-serif;
}
</style>

<script setup lang="ts">
// Global app configuration
useHead({
  title: 'iCCare Biobank | Secure Clinical & BioSpecimen Repository Platform',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'format-detection', content: 'telephone=no' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { 
      rel: 'stylesheet', 
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap' 
    }
  ]
})

useSeoMeta({
  title: 'iCCare Biobank — Secure Access for Research and Biobank Collaboration',
  ogTitle: 'iCCare Biobank — Integrated Clinical & BioSpecimen Repository Platform',
  description: 'iCCare Biobank provides secure access for research and biobank collaboration, ensuring HIPAA & GDPR compliance and real-time tracking for over 500 institutions.',
  ogDescription: 'iCCare Biobank offers a trusted platform for clinical and biobank research collaboration. HIPAA & GDPR certified, providing real-time sample tracking for secure, compliant data management.',
  ogImage: '/images/og-image.jpg',
  ogUrl: 'https://iccarebiobank.com',
  twitterTitle: 'iCCare Biobank — Secure and Compliant Research Platform',
  twitterDescription: 'Discover how iCCare Biobank ensures secure and compliant research collaboration with real-time tracking for clinical and bio-specimen samples.',
  twitterImage: '/images/og-image.jpg',
  twitterCard: 'summary_large_image'
})
</script>
