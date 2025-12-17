<template>
   <NuxtLayout name="dashboard">
  <div class="min-h-screen">

    <div class="flex">

      <!-- Main Content -->
      <main class="flex-1 p-4 md:p-6 lg:p-8">
        <div class="max-w-5xl mx-auto">
          <!-- Page Title -->
          <div class="mb-6">
            <h1 class="text-2xl md:text-3xl font-bold text-gray-900">My Profile</h1>
            <p class="text-sm text-gray-600 mt-1">Manage your personal information, credentials, and system preferences.</p>
          </div>

          <!-- Profile Card -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div class="flex items-center gap-4">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Adaeze"
                  alt="Profile"
                  class="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h2 class="text-xl font-bold text-gray-900">Dr. Adaeze Bello</h2>
                  <p class="text-sm text-gray-600 mt-1">Site Manager</p>
                  <p class="text-sm text-gray-500 mt-0.5">Lagos Biobank – Site A</p>
                  <span class="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    Active
                  </span>
                </div>
              </div>
              
              <button 
                @click="editMode = !editMode"
                class="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 justify-center shadow-sm"
              >
                <Icon name="heroicons:pencil-square" class="w-5 h-5" />
                <span>Edit</span>
              </button>
            </div>
          </div>

          <!-- Tabs Content -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <!-- Tabs Navigation -->
            <div class="border-b border-gray-200">
              <div class="flex flex-wrap gap-2 md:gap-8 px-4 md:px-6">
                <button 
                  @click="activeTab = 'personal'"
                  :class="[
                    'flex items-center gap-2 py-4 text-sm font-semibold transition-all border-b-2',
                    activeTab === 'personal' 
                      ? 'text-blue-600 border-blue-600' 
                      : 'text-gray-500 border-transparent hover:text-gray-700'
                  ]"
                >
                  <Icon name="heroicons:user" class="w-5 h-5" />
                  <span class="hidden sm:inline">Personal Information</span>
                  <span class="sm:hidden">Personal</span>
                </button>
                
                <button 
                  @click="activeTab = 'security'"
                  :class="[
                    'flex items-center gap-2 py-4 text-sm font-semibold transition-all border-b-2',
                    activeTab === 'security' 
                      ? 'text-blue-600 border-blue-600' 
                      : 'text-gray-500 border-transparent hover:text-gray-700'
                  ]"
                >
                  <Icon name="heroicons:shield-check" class="w-5 h-5" />
                  <span class="hidden sm:inline">Security & Authentication</span>
                  <span class="sm:hidden">Security</span>
                </button>
                
                <button 
                  @click="activeTab = 'settings'"
                  :class="[
                    'flex items-center gap-2 py-4 text-sm font-semibold transition-all border-b-2',
                    activeTab === 'settings' 
                      ? 'text-blue-600 border-blue-600' 
                      : 'text-gray-500 border-transparent hover:text-gray-700'
                  ]"
                >
                  <Icon name="heroicons:cog-6-tooth" class="w-5 h-5" />
                  <span>Settings</span>
                </button>
              </div>
            </div>

            <!-- Tab Content -->
            <div class="p-4 md:p-6">
              <Transition name="fade" mode="out-in">
                <PersonalInfoTab v-if="activeTab === 'personal'" key="personal" />
                <SecurityTab v-else-if="activeTab === 'security'" key="security" />
                <SettingsTab v-else-if="activeTab === 'settings'" key="settings" />
              </Transition>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
  </NuxtLayout>
</template>

<script setup lang="ts">


const activeTab = ref<'personal' | 'security' | 'settings'>('personal');
const editMode = ref(false);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>