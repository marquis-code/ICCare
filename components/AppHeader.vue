<template>
  <header class="backdrop-blur-md border-b-[0.5px] sticky top-0 z-50 shadow-sm transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16 sm:h-20">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 sm:gap-3 group">
          <div class="relative">
            <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <svg class="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
            <div class="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <div class="hidden sm:block">
            <span class="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors">DrConnect</span>
            <div class="text-xs text-gray-500 -mt-1">Healthcare Made Easy</div>
          </div>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-1">
          <NuxtLink
            v-if="isLoggedIn && !isAdmin"
            to="/appointments"
            class="relative px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors group"
          >
            <span>My Appointments</span>
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#005B8F] group-hover:w-full transition-all duration-300"></span>
          </NuxtLink>
          <NuxtLink
            v-if="isLoggedIn && !isAdmin"
            to="/book"
            class="relative px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors group"
          >
            <span>Book Consultation</span>
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#005B8F] group-hover:w-full transition-all duration-300"></span>
          </NuxtLink>
          <NuxtLink
            v-if="isLoggedIn && isAdmin"
            to="/admin"
            class="relative px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors group"
          >
            <span>Admin Dashboard</span>
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#005B8F] group-hover:w-full transition-all duration-300"></span>
          </NuxtLink>
        </nav>

        <!-- Auth Actions -->
        <div class="flex items-center gap-3">
          <!-- Logged In User -->
          <div v-if="isLoggedIn" class="hidden sm:flex items-center gap-3">
            <NuxtLink to="/profile" class="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
              <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {{ user?.name?.charAt(0).toUpperCase() }}
              </div>
              <span class="text-sm font-medium text-gray-700">{{ user?.name }}</span>
            </NuxtLink>
            <button
              @click="showLogoutModal = true"
              class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
            >
              Logout
            </button>
          </div>

          <!-- Not Logged In -->
          <div v-else class="hidden sm:flex gap-2">
            <NuxtLink
              to="/login"
              class="px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-300"
            >
              Login
            </NuxtLink>
            <NuxtLink
              to="/register"
              class="px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Sign Up
            </NuxtLink>
          </div>

          <!-- Mobile Menu Button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-all duration-300"
            :class="{ 'bg-gray-100': mobileMenuOpen }"
          >
            <svg
              class="w-6 h-6 text-gray-700 transition-transform duration-300"
              :class="{ 'rotate-90': mobileMenuOpen }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                v-if="!mobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div v-if="mobileMenuOpen" class="md:hidden border-t border-gray-200 py-4 bg-white">
          <nav class="flex flex-col gap-1">
            <!-- User Info on Mobile -->
            <div v-if="isLoggedIn" class="px-4 py-3 mb-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg mx-2">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {{ user?.name?.charAt(0).toUpperCase() }}
                </div>
                <div>
                  <div class="text-sm font-semibold text-gray-900">{{ user?.name }}</div>
                  <div class="text-xs text-gray-600">{{ user?.email }}</div>
                </div>
              </div>
            </div>

            <NuxtLink
              v-if="isLoggedIn && !isAdmin"
              to="/appointments"
              @click="mobileMenuOpen = false"
              class="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg mx-2 font-medium"
            >
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <span>My Appointments</span>
              </div>
            </NuxtLink>

            <NuxtLink
              v-if="isLoggedIn && !isAdmin"
              to="/book"
              @click="mobileMenuOpen = false"
              class="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg mx-2 font-medium"
            >
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
                <span>Book Consultation</span>
              </div>
            </NuxtLink>

            <NuxtLink
              v-if="isLoggedIn && isAdmin"
              to="/admin"
              @click="mobileMenuOpen = false"
              class="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg mx-2 font-medium"
            >
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
                <span>Admin Dashboard</span>
              </div>
            </NuxtLink>

            <!-- Mobile Auth Actions -->
            <div v-if="isLoggedIn" class="px-2 pt-3 mt-2 border-t border-gray-200">
              <button
                @click="showLogoutModal = true"
                class="w-full px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors rounded-lg font-medium flex items-center gap-3"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
                <span>Logout</span>
              </button>
            </div>

            <div v-else class="px-2 pt-3 mt-2 border-t border-gray-200 flex flex-col gap-2">
              <NuxtLink
                to="/login"
                @click="mobileMenuOpen = false"
                class="px-4 py-2.5 text-center text-gray-700 hover:bg-gray-100 transition-colors rounded-lg font-medium"
              >
                Login
              </NuxtLink>
              <NuxtLink
                to="/register"
                @click="mobileMenuOpen = false"
                class="px-4 py-2.5 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all"
              >
                Sign Up
              </NuxtLink>
            </div>
          </nav>
        </div>
      </transition>
    </div>
  </header>

  <!-- Logout Confirmation Modal -->
  <Teleport to="body">
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showLogoutModal"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
        @click.self="showLogoutModal = false"
      >
        <transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
        >
          <div
            v-if="showLogoutModal"
            class="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            @click.stop
          >
            <!-- Animated Background Gradient -->
            <div class="absolute inset-0 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 opacity-50"></div>
            
            <!-- Decorative Elements -->
            <div class="absolute top-0 right-0 w-32 h-32 bg-red-400/10 rounded-full blur-3xl"></div>
            <div class="absolute bottom-0 left-0 w-32 h-32 bg-orange-400/10 rounded-full blur-3xl"></div>

            <!-- Content -->
            <div class="relative p-6 sm:p-8">
              <!-- Icon Container -->
              <div class="flex justify-center mb-6">
                <div class="relative">
                  <div class="w-10 h-10 bg-black rounded-full flex items-center justify-center shadow-lg animate-bounce-slow">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                    </svg>
                  </div>
                  <!-- Pulse Ring -->
                  <div class="absolute inset-0 rounded-full bg-red-500 opacity-20 animate-ping"></div>
                </div>
              </div>

              <!-- Title -->
              <h3 class="text-lg font-bold text-gray-900 text-center mb-3">
                Leaving Already?
              </h3>

              <!-- Description -->
              <p class="text-gray-600 text-sm text-center mb-8 leading-relaxed">
                Are you sure you want to logout? You'll need to sign in again to access your appointments and book consultations.
              </p>

              <!-- User Info Badge -->
              <div class="flex items-center justify-center gap-3 mb-8 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {{ user?.name?.charAt(0).toUpperCase() }}
                </div>
                <div class="text-left">
                  <div class="font-semibold text-gray-900">{{ user?.name }}</div>
                  <div class="text-sm text-gray-500">{{ user?.email }}</div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-3">
                <button
                  @click="showLogoutModal = false"
                  class="flex-1 px-6 py-3 bg-gray-100 text-sm hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                >
                  Stay Logged In
                </button>
                <button
                  @click="confirmLogout"
                  :disabled="isLoggingOut"
                  class="flex-1 px-6 py-3 bg-black text-sm text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <svg 
                    v-if="isLoggingOut"
                    class="animate-spin h-5 w-5 text-white" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{{ isLoggingOut ? 'Logging Out...' : 'Yes, Logout' }}</span>
                </button>
              </div>
            </div>

            <!-- Close Button -->
            <button
              @click="showLogoutModal = false"
              class="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-all duration-300 group"
            >
              <svg class="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUser } from '@/composables/modules/auth/user';
import { useLogout } from '@/composables/modules/auth/useLogout';

const router = useRouter();
const { user, isLoggedIn } = useUser();
const { logout } = useLogout();
const mobileMenuOpen = ref(false);
const showLogoutModal = ref(false);
const isLoggingOut = ref(false);

const isAdmin = computed(() => user.value?.role === 'admin');

const confirmLogout = async () => {
  isLoggingOut.value = true;
  
  // Simulate a small delay for better UX
  await new Promise(resolve => setTimeout(resolve, 800));
  
  logout();
  showLogoutModal.value = false;
  isLoggingOut.value = false;
  mobileMenuOpen.value = false;
  router.push('/');
};
</script>

<style scoped>
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce-slow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}

/* Prevent body scroll when modal is open */
body:has(.fixed.inset-0.z-\[100\]) {
  overflow: hidden;
}
</style>