<template>
  <div class="min-h-screen flex">
    <!-- Left Side - Enhanced Carousel -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      <!-- Animated Background Gradient -->
      <div class="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-900">
        <div class="absolute inset-0 opacity-30">
          <div 
            v-for="i in 20" 
            :key="i" 
            class="floating-orb"
            :style="{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }"
          ></div>
        </div>
      </div>
      
      <!-- Main Carousel Content -->
      <div class="relative z-10 flex flex-col justify-center items-center w-full px-12 text-white">
        <div class="max-w-2xl w-full">
          <transition 
            :name="slideDirection" 
            mode="out-in"
            @before-enter="onBeforeEnter"
            @enter="onEnter"
            @leave="onLeave"
          >
            <div :key="currentSlide" class="carousel-content">
              <!-- Image Container with 3D Effect -->
              <div class="image-container mb-8">
                <div class="image-wrapper">
                  <div class="image-glow"></div>
                  <img 
                    :src="slides[currentSlide].image" 
                    :alt="slides[currentSlide].title"
                    class="carousel-image"
                  />
                  <!-- Floating Icons Animation -->
                  <div class="floating-icons">
                    <component 
                      :is="slides[currentSlide].icon" 
                      class="main-icon"
                    />
                  </div>
                </div>
              </div>

              <!-- Content -->
              <div class="text-center space-y-6">
                <div class="inline-block">
                  <span class="badge">
                    {{ slides[currentSlide].category }}
                  </span>
                </div>
                
                <h2 class="text-4xl font-black mb-4 leading-tight">
                  <span class="text-gradient">{{ slides[currentSlide].title }}</span>
                </h2>
                
                <p class="text-lg text-blue-100 leading-relaxed max-w-xl mx-auto">
                  {{ slides[currentSlide].description }}
                </p>

                <!-- Testimonial Card -->
                <!-- <div class="testimonial-card">
                  <div class="quote-icon">"</div>
                  <p class="testimonial-text">
                    {{ slides[currentSlide].testimonial }}
                  </p>
                  <div class="testimonial-author">
                    <div class="author-avatar">
                      <img :src="slides[currentSlide].authorAvatar" :alt="slides[currentSlide].author" />
                    </div>
                    <div class="author-info">
                      <div class="author-name">{{ slides[currentSlide].author }}</div>
                      <div class="author-role">{{ slides[currentSlide].authorRole }}</div>
                    </div>
                    <div class="rating">
                      <span v-for="star in 5" :key="star" class="star">★</span>
                    </div>
                  </div>
                </div> -->

                <!-- Stats -->
                <!-- <div class="stats-grid">
                  <div 
                    v-for="(stat, index) in slides[currentSlide].stats" 
                    :key="index"
                    class="stat-item"
                    :style="{ animationDelay: `${index * 0.1}s` }"
                  >
                    <div class="stat-value">{{ stat.value }}</div>
                    <div class="stat-label">{{ stat.label }}</div>
                  </div>
                </div> -->
              </div>
            </div>
          </transition>
          
          <!-- Enhanced Carousel Controls -->
          <!-- <div class="carousel-controls">
            <button 
              @click="previousSlide"
              class="nav-button nav-button-prev"
              aria-label="Previous slide"
            >
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div class="indicators">
              <button
                v-for="(slide, index) in slides"
                :key="index"
                @click="goToSlide(index)"
                :class="['indicator', { active: currentSlide === index }]"
                :aria-label="`Go to slide ${index + 1}`"
              >
                <span class="indicator-progress" v-if="currentSlide === index"></span>
              </button>
            </div>

            <button 
              @click="nextSlide"
              class="nav-button nav-button-next"
              aria-label="Next slide"
            >
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div> -->
        </div>
      </div>

      <!-- Animated Particles -->
      <div class="particles">
        <div v-for="i in 50" :key="i" class="particle" :style="getParticleStyle(i)"></div>
      </div>

      <!-- Decorative Mesh Gradient -->
      <div class="mesh-gradient"></div>
    </div>

    <!-- Right Side - Form Content -->
    <div class="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <!-- Subtle Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, #000 1px, transparent 0); background-size: 40px 40px;"></div>
      </div>
      
      <div class="w-full max-w-md relative z-10">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import carousel4 from "@/assets/img/health.jpg"
import carousel1 from "@/assets/img/carousel1.jpg"
import carousel2 from "@/assets/img/carousel2.jpg"
import carousel3 from "@/assets/img/consultation.jpg"
import { ref, onMounted, onUnmounted } from 'vue'

// Icon Components
const HeartPulseIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 8h.01M16 12h.01" />
    </svg>
  `
}

const ShieldCheckIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  `
}

const SparklesIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  `
}

const UsersIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  `
}

interface Slide {
  icon: any
  image: string
  category: string
  title: string
  description: string
  testimonial: string
  author: string
  authorRole: string
  authorAvatar: string
  stats: { value: string; label: string }[]
}

const slides: Slide[] = [
  {
    icon: HeartPulseIcon,
    image: carousel1,
    category: 'Healthcare Excellence',
    title: 'Your Health, Our Priority',
    description: 'Experience world-class healthcare with our team of expert physicians. From routine checkups to specialized treatments, we\'re here for you every step of the way.',
    testimonial: 'The booking process was seamless! I got an appointment within 24 hours and the care I received was exceptional. This platform has truly revolutionized how I access healthcare.',
    author: 'Sarah Mitchell',
    authorRole: 'Patient since 2023',
    authorAvatar: 'https://i.pravatar.cc/150?img=1',
    stats: [
      { value: '50K+', label: 'Happy Patients' },
      { value: '500+', label: 'Expert Doctors' },
      { value: '98%', label: 'Satisfaction' }
    ]
  },
  {
    icon: ShieldCheckIcon,
    image: carousel2,
    category: 'Trusted & Secure',
    title: 'Your Data is Safe With Us',
    description: 'We use bank-level encryption to protect your medical records and personal information. Your privacy and security are our top concerns.',
    testimonial: 'I feel completely safe sharing my medical information here. The security measures are top-notch and the doctors are incredibly professional. Highly recommend!',
    author: 'Dr. James Rodriguez',
    authorRole: 'Healthcare Provider',
    authorAvatar: 'https://i.pravatar.cc/150?img=12',
    stats: [
      { value: '256-bit', label: 'Encryption' },
      { value: '100%', label: 'HIPAA Compliant' },
      { value: '24/7', label: 'Support' }
    ]
  },
  {
    icon: SparklesIcon,
    image: carousel3,
    category: 'Smart Scheduling',
    title: 'Book Instantly, Anytime',
    description: 'No more waiting on hold or playing phone tag. Our intelligent booking system finds the perfect appointment slot that fits your schedule.',
    testimonial: 'As a busy professional, this service is a lifesaver. I can book appointments during my lunch break and manage everything from my phone. Absolutely brilliant!',
    author: 'Michael Chen',
    authorRole: 'Tech Executive',
    authorAvatar: 'https://i.pravatar.cc/150?img=33',
    stats: [
      { value: '<2min', label: 'Avg. Booking Time' },
      { value: '24/7', label: 'Access' },
      { value: '1000+', label: 'Daily Bookings' }
    ]
  },
  {
    icon: UsersIcon,
   image: carousel4,
    category: 'Expert Network',
    title: 'Connect With Top Specialists',
    description: 'Access a nationwide network of board-certified specialists. From cardiologists to dermatologists, find the right expert for your needs.',
    testimonial: 'Finding a specialist used to be such a hassle. Now I can browse profiles, read reviews, and book appointments all in one place. It\'s made healthcare so much more accessible.',
    author: 'Emily Thompson',
    authorRole: 'Verified Patient',
    authorAvatar: 'https://i.pravatar.cc/150?img=5',
    stats: [
      { value: '40+', label: 'Specialties' },
      { value: '200+', label: 'Locations' },
      { value: '4.9★', label: 'Avg. Rating' }
    ]
  }
]

const currentSlide = ref(0)
const slideDirection = ref('slide-left')
let interval: NodeJS.Timeout | null = null
let isTransitioning = ref(false)

const nextSlide = () => {
  if (isTransitioning.value) return
  slideDirection.value = 'slide-left'
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

const previousSlide = () => {
  if (isTransitioning.value) return
  slideDirection.value = 'slide-right'
  currentSlide.value = currentSlide.value === 0 ? slides.length - 1 : currentSlide.value - 1
}

const goToSlide = (index: number) => {
  if (isTransitioning.value || index === currentSlide.value) return
  slideDirection.value = index > currentSlide.value ? 'slide-left' : 'slide-right'
  currentSlide.value = index
}

const onBeforeEnter = () => {
  isTransitioning.value = true
}

const onEnter = () => {
  setTimeout(() => {
    isTransitioning.value = false
  }, 600)
}

const onLeave = () => {
  isTransitioning.value = true
}

const getParticleStyle = (index: number) => {
  const size = Math.random() * 4 + 1
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${10 + Math.random() * 20}s`
  }
}

onMounted(() => {
  interval = setInterval(() => {
    nextSlide()
  }, 7000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<style scoped>
/* Floating Orbs Background */
.floating-orb {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%);
  animation: float infinite ease-in-out;
  pointer-events: none;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(20px, -20px) scale(1.1); }
  50% { transform: translate(-20px, 20px) scale(0.9); }
  75% { transform: translate(20px, 20px) scale(1.05); }
}

/* Carousel Content */
.carousel-content {
  width: 100%;
}

/* Image Container with 3D Effect */
.image-container {
  perspective: 1000px;
  display: flex;
  justify-content: center;
}

.image-wrapper {
  position: relative;
  width: 320px;
  height: 320px;
  transform-style: preserve-3d;
  animation: imageFloat 6s ease-in-out infinite;
}

@keyframes imageFloat {
  0%, 100% { transform: translateY(0) rotateY(0deg); }
  50% { transform: translateY(-20px) rotateY(5deg); }
}

.image-glow {
  position: absolute;
  inset: -20px;
  background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(30px);
  animation: glowPulse 3s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.5; transform: scale(0.9); }
  50% { opacity: 1; transform: scale(1.1); }
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 30px;
  box-shadow: 0 40px 80px rgba(0,0,0,0.4);
  border: 4px solid rgba(255,255,255,0.2);
}

/* Floating Icons */
.floating-icons {
  position: absolute;
  top: -20px;
  right: -20px;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 20px 40px rgba(102, 126, 234, 0.4);
  animation: iconBounce 2s ease-in-out infinite;
  border: 3px solid rgba(255,255,255,0.3);
}

@keyframes iconBounce {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(5deg); }
}

.main-icon {
  width: 40px;
  height: 40px;
  color: white;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
}

/* Badge */
.badge {
  display: inline-block;
  padding: 8px 20px;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(10px);
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: 1px solid rgba(255,255,255,0.3);
  animation: badgeSlideIn 0.6s ease-out;
}

@keyframes badgeSlideIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Text Gradient */
.text-gradient {
  background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: titleSlideIn 0.8s ease-out 0.2s both;
}

@keyframes titleSlideIn {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Testimonial Card */
.testimonial-card {
  position: relative;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 32px;
  margin-top: 32px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: cardSlideIn 0.8s ease-out 0.4s both;
  overflow: hidden;
}

@keyframes cardSlideIn {
  from { opacity: 0; transform: translateY(30px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.testimonial-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.quote-icon {
  font-size: 64px;
  line-height: 1;
  opacity: 0.3;
  font-family: Georgia, serif;
  margin-bottom: -20px;
}

.testimonial-text {
  font-size: 16px;
  line-height: 1.6;
  font-style: italic;
  margin-bottom: 24px;
  color: rgba(255, 255, 255, 0.95);
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.author-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.3);
  flex-shrink: 0;
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-info {
  flex: 1;
  text-align: left;
}

.author-name {
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 4px;
}

.author-role {
  font-size: 13px;
  opacity: 0.8;
}

.rating {
  display: flex;
  gap: 2px;
}

.star {
  color: #fbbf24;
  font-size: 18px;
  filter: drop-shadow(0 2px 4px rgba(251, 191, 36, 0.4));
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 32px;
}

.stat-item {
  text-align: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: statPop 0.6s ease-out both;
  transition: all 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px) scale(1.05);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

@keyframes statPop {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}

.stat-value {
  font-size: 28px;
  font-weight: 900;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 13px;
  opacity: 0.9;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Carousel Controls */
.carousel-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-top: 48px;
}

.nav-button {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
}

.nav-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
}

.nav-button:active {
  transform: scale(0.95);
}

/* Indicators */
.indicators {
  display: flex;
  gap: 12px;
}

.indicator {
  position: relative;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.indicator:hover {
  background: rgba(255, 255, 255, 0.5);
  transform: scale(1.2);
}

.indicator.active {
  width: 40px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.5);
}

.indicator-progress {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: white;
  animation: indicatorProgress 7s linear;
  border-radius: 10px;
}

@keyframes indicatorProgress {
  from { width: 0%; }
  to { width: 100%; }
}

/* Particles */
.particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.particle {
  position: absolute;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  animation: particleFloat infinite ease-in-out;
}

@keyframes particleFloat {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translate(var(--tx, 100px), var(--ty, -100px)) scale(0); }
}

/* Mesh Gradient */
.mesh-gradient {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(at 20% 30%, rgba(99, 102, 241, 0.3) 0, transparent 50%),
    radial-gradient(at 80% 70%, rgba(139, 92, 246, 0.3) 0, transparent 50%),
    radial-gradient(at 50% 50%, rgba(59, 130, 246, 0.2) 0, transparent 50%);
  animation: meshMove 20s ease-in-out infinite;
  pointer-events: none;
}

@keyframes meshMove {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.1); }
}

/* Slide Transitions */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(100px) scale(0.9) rotateY(20deg);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-100px) scale(0.9) rotateY(-20deg);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-100px) scale(0.9) rotateY(-20deg);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(100px) scale(0.9) rotateY(20deg);
}

/* Responsive */
@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  
  .stat-value {
    font-size: 24px;
  }
  
  .stat-label {
    font-size: 11px;
  }
  
  .image-wrapper {
    width: 280px;
    height: 280px;
  }
  
  .testimonial-card {
    padding: 24px;
  }
  
  .text-gradient {
    font-size: 42px;
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
  
  .stat-item {
    padding: 16px 12px;
  }
  
  .stat-value {
    font-size: 20px;
  }
  
  .stat-label {
    font-size: 10px;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Loading State Animation */
@keyframes shimmerLoading {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}

/* Hover Effects */
.carousel-image {
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.image-wrapper:hover .carousel-image {
  transform: scale(1.05);
}

/* Focus States for Accessibility */
.nav-button:focus-visible,
.indicator:focus-visible {
  outline: 3px solid rgba(255, 255, 255, 0.8);
  outline-offset: 4px;
}

/* Glass Morphism Effects */
.testimonial-card,
.stat-item,
.badge {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
}

/* Smooth Scrolling */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>