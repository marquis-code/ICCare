
<template>
  <NuxtLayout name="dashboard">
    <div class="min-h-screen">
      <div class="">
        <!-- Main Content -->
        <main class="">
          <div class="">
            <!-- Page Title -->
            <div class="mb-6 rounded-xl bg-[#DCF1FF] text-[#005B8F] px-6 py-4 mb-6">
              <h1 class="text-xl font-bold bg-[#DCF1FF] text-[#005B8F]">My Profile</h1>
              <p class="text-base bg-[#DCF1FF] text-[#005B8F] mt-1">Manage your personal information, credentials, and system preferences.</p>
            </div>

            <!-- Profile Card -->
            <div class="bg-white rounded-lg  border-[0.5px] border-gray-100 p-6 mb-6">
              <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div class="flex items-center gap-4">
                  <div 
                    class="w-20 h-20 rounded-full bg-[#005B8F] flex items-center justify-center text-white text-2xl font-bold border-2 border-gray-100"
                  >
                    {{ userInitials }}
                  </div>
                  <div>
                    <h2 class="text-xl font-bold text-gray-900">{{ fullName }}</h2>
                    <p class="text-sm text-gray-700 mt-1 font-medium">Site Manager</p>
                    <p class="text-sm text-gray-500 mt-0.5">Lagos Biobank – Site A</p>
                    <span class="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      Active
                    </span>
                  </div>
                </div>
                
                <!-- <button 
                  @click="editMode = !editMode"
                  class="px-6 py-2.5 bg-[#005B8F] text-white rounded-lg hover:bg-[#004a73] transition flex items-center gap-2 justify-center  font-medium"
                >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.988 2.01221L21.988 5.01221L19.701 7.30021L16.701 4.30021L18.988 2.01221ZM8 16.0002H11L18.287 8.71321L15.287 5.71321L8 13.0002V16.0002Z" fill="white"/>
<path d="M19 19H8.158C8.132 19 8.105 19.01 8.079 19.01C8.046 19.01 8.013 19.001 7.979 19H5V5H11.847L13.847 3H5C3.897 3 3 3.896 3 5V19C3 20.104 3.897 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V10.332L19 12.332V19Z" fill="white"/>
</svg>

                  <span>Edit</span>
                </button> -->
              </div>
            </div>

            <!-- Tabs Content -->
            <div class="bg-white rounded-lg  border-[0.5px] border-gray-100">
              <!-- Tabs Navigation -->
              <div class="border-b border-gray-100">
                <div class="flex flex-wrap gap-0 px-4 md:px-6">
                  <button 
                    @click="activeTab = 'personal'"
                    :class="[
                      'flex items-center gap-2 px-6 py-4 font-medium text-lg transition-all border-b-[3px] relative',
                      activeTab === 'personal' 
                        ? 'text-[#005B8F] border-[#005B8F] bg-blue-50/30' 
                        : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'
                    ]"
                  >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 7C8 5.93913 8.42143 4.92172 9.17157 4.17157C9.92172 3.42143 10.9391 3 12 3C13.0609 3 14.0783 3.42143 14.8284 4.17157C15.5786 4.92172 16 5.93913 16 7C16 8.06087 15.5786 9.07828 14.8284 9.82843C14.0783 10.5786 13.0609 11 12 11C10.9391 11 9.92172 10.5786 9.17157 9.82843C8.42143 9.07828 8 8.06087 8 7ZM8 13C6.67392 13 5.40215 13.5268 4.46447 14.4645C3.52678 15.4021 3 16.6739 3 18C3 18.7956 3.31607 19.5587 3.87868 20.1213C4.44129 20.6839 5.20435 21 6 21H18C18.7956 21 19.5587 20.6839 20.1213 20.1213C20.6839 19.5587 21 18.7956 21 18C21 16.6739 20.4732 15.4021 19.5355 14.4645C18.5979 13.5268 17.3261 13 16 13H8Z" fill="#005B8F"/>
</svg>

                    <span class="hidden sm:inline">Personal Information</span>
                    <span class="sm:hidden">Personal</span>
                  </button>
                  
                  <button 
                    @click="activeTab = 'security'"
                    :class="[
                      'flex items-center gap-2 px-6 py-4 font-medium text-lg transition-all border-b-[3px] relative',
                      activeTab === 'security' 
                        ? 'text-[#005B8F] border-[#005B8F] bg-blue-50/30' 
                        : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'
                    ]"
                  >
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 22C9.68333 21.4167 7.77067 20.0873 6.262 18.012C4.75333 15.9367 3.99933 13.6327 4 11.1V5L12 2L20 5V11.1C20 13.6333 19.246 15.9377 17.738 18.013C16.23 20.0883 14.3173 21.4173 12 22ZM12 19.9C13.6167 19.4 14.9667 18.4123 16.05 16.937C17.1333 15.4617 17.7667 13.816 17.95 12H12V4.125L6 6.375V11.55C6 11.6667 6.01667 11.8167 6.05 12H12V19.9Z" fill="#005B8F"/>
</svg>

                    <span class="hidden sm:inline">Security & Authentication</span>
                    <span class="sm:hidden">Security</span>
                  </button>
                  
                  <button 
                    @click="activeTab = 'settings'"
                    :class="[
                      'flex items-center gap-2 px-6 py-4 font-medium text-lg transition-all border-b-[3px] relative',
                      activeTab === 'settings' 
                        ? 'text-[#005B8F] border-[#005B8F] bg-blue-50/30' 
                        : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'
                    ]"
                  >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.9009 12.6599C19.7406 12.4774 19.6521 12.2428 19.6521 11.9999C19.6521 11.757 19.7406 11.5224 19.9009 11.3399L21.1809 9.89989C21.3219 9.74256 21.4095 9.5446 21.4311 9.3344C21.4526 9.12421 21.407 8.91258 21.3009 8.72989L19.3009 5.2699C19.1958 5.08742 19.0358 4.94277 18.8436 4.85658C18.6515 4.77039 18.437 4.74705 18.2309 4.7899L16.3509 5.1699C16.1117 5.21932 15.8626 5.17948 15.6508 5.0579C15.4389 4.93631 15.2789 4.74138 15.2009 4.5099L14.5909 2.6799C14.5238 2.48127 14.396 2.30876 14.2255 2.18674C14.055 2.06471 13.8505 1.99935 13.6409 1.9999H9.64087C9.42281 1.98851 9.20701 2.04882 9.02644 2.17161C8.84587 2.2944 8.71045 2.47291 8.64087 2.6799L8.08087 4.5099C8.00287 4.74138 7.84284 4.93631 7.63099 5.0579C7.41913 5.17948 7.17009 5.21932 6.93087 5.1699L5.00087 4.7899C4.80542 4.76228 4.60617 4.79312 4.42822 4.87853C4.25027 4.96395 4.10157 5.10012 4.00087 5.2699L2.00087 8.72989C1.89203 8.91054 1.84309 9.12098 1.86106 9.33112C1.87902 9.54126 1.96296 9.74034 2.10087 9.89989L3.37087 11.3399C3.53119 11.5224 3.61961 11.757 3.61961 11.9999C3.61961 12.2428 3.53119 12.4774 3.37087 12.6599L2.10087 14.0999C1.96296 14.2595 1.87902 14.4585 1.86106 14.6687C1.84309 14.8788 1.89203 15.0892 2.00087 15.2699L4.00087 18.7299C4.10597 18.9124 4.26599 19.057 4.45812 19.1432C4.65026 19.2294 4.8647 19.2527 5.07087 19.2099L6.95087 18.8299C7.19009 18.7805 7.43913 18.8203 7.65099 18.9419C7.86284 19.0635 8.02287 19.2584 8.10087 19.4899L8.71087 21.3199C8.78045 21.5269 8.91587 21.7054 9.09644 21.8282C9.27701 21.951 9.49281 22.0113 9.71087 21.9999H13.7109C13.9205 22.0004 14.125 21.9351 14.2955 21.8131C14.466 21.691 14.5938 21.5185 14.6609 21.3199L15.2709 19.4899C15.3489 19.2584 15.5089 19.0635 15.7208 18.9419C15.9326 18.8203 16.1817 18.7805 16.4209 18.8299L18.3009 19.2099C18.507 19.2527 18.7215 19.2294 18.9136 19.1432C19.1058 19.057 19.2658 18.9124 19.3709 18.7299L21.3709 15.2699C21.477 15.0872 21.5226 14.8756 21.5011 14.6654C21.4795 14.4552 21.3919 14.2572 21.2509 14.0999L19.9009 12.6599ZM18.4109 13.9999L19.2109 14.8999L17.9309 17.1199L16.7509 16.8799C16.0307 16.7327 15.2814 16.855 14.6455 17.2237C14.0095 17.5924 13.531 18.1817 13.3009 18.8799L12.9209 19.9999H10.3609L10.0009 18.8599C9.77073 18.1617 9.29225 17.5724 8.65628 17.2037C8.0203 16.835 7.27109 16.7127 6.55087 16.8599L5.37087 17.0999L4.07087 14.8899L4.87087 13.9899C5.36283 13.4399 5.6348 12.7278 5.6348 11.9899C5.6348 11.252 5.36283 10.5399 4.87087 9.98989L4.07087 9.0899L5.35087 6.88989L6.53087 7.1299C7.25109 7.27712 8.0003 7.15478 8.63628 6.78609C9.27225 6.41741 9.75073 5.82805 9.98087 5.1299L10.3609 3.9999H12.9209L13.3009 5.13989C13.531 5.83805 14.0095 6.42741 14.6455 6.79609C15.2814 7.16478 16.0307 7.28712 16.7509 7.13989L17.9309 6.8999L19.2109 9.11989L18.4109 10.0199C17.9244 10.5687 17.6558 11.2766 17.6558 12.0099C17.6558 12.7432 17.9244 13.4511 18.4109 13.9999ZM11.6409 7.9999C10.8497 7.9999 10.0764 8.23449 9.41859 8.67402C8.76079 9.11354 8.24811 9.73826 7.94535 10.4692C7.6426 11.2001 7.56339 12.0043 7.71773 12.7803C7.87207 13.5562 8.25304 14.2689 8.81245 14.8283C9.37186 15.3877 10.0846 15.7687 10.8605 15.923C11.6364 16.0774 12.4407 15.9982 13.1716 15.6954C13.9025 15.3927 14.5272 14.88 14.9668 14.2222C15.4063 13.5644 15.6409 12.791 15.6409 11.9999C15.6409 10.939 15.2194 9.92161 14.4693 9.17147C13.7192 8.42132 12.7017 7.9999 11.6409 7.9999ZM11.6409 13.9999C11.2453 13.9999 10.8586 13.8826 10.5297 13.6628C10.2008 13.4431 9.94449 13.1307 9.79311 12.7653C9.64174 12.3998 9.60213 11.9977 9.6793 11.6097C9.75647 11.2218 9.94695 10.8654 10.2267 10.5857C10.5064 10.306 10.8627 10.1155 11.2507 10.0383C11.6387 9.96115 12.0408 10.0008 12.4062 10.1521C12.7717 10.3035 13.084 10.5599 13.3038 10.8888C13.5236 11.2177 13.6409 11.6043 13.6409 11.9999C13.6409 12.5303 13.4302 13.039 13.0551 13.4141C12.68 13.7892 12.1713 13.9999 11.6409 13.9999Z" fill="#005B8F"/>
</svg>

                    <span>Settings</span>
                  </button>
                </div>
              </div>

              <!-- Tab Content -->
         <div class="p-6 md:p-8">
            <Transition name="fade" mode="out-in">
              <PersonalInfoTab v-if="activeTab === 'personal'" key="personal" :user="user" />
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
import { useCurrentUser } from "@/composables/modules/auth/useCurrentUser"

const activeTab = ref<'personal' | 'security' | 'settings'>('personal');
const editMode = ref(false);

const { loading, user } = useCurrentUser();

// Computed properties for user display
const fullName = computed(() => {
  if (!user.value) return 'User';
  return `${user.value.first_name || ''} ${user.value.last_name || ''}`.trim() || 'User';
});

const userInitials = computed(() => {
  if (!user.value) return 'U';
  const firstName = user.value.first_name || '';
  const lastName = user.value.last_name || '';
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'U';
});
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