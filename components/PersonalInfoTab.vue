<template>
  <div class="space-y-6">
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            First Name
          </label>
          <input 
            v-model="formData.firstName"
            type="text" 
            placeholder="e.g Admin"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Last Name
          </label>
          <input 
            v-model="formData.lastName"
            type="text" 
            placeholder="e.g Admin"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            New Password
          </label>
          <input 
            v-model="formData.newPassword"
            type="password" 
            placeholder="e.g Admin"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Confirmed New Password
          </label>
          <input 
            v-model="formData.confirmedNewPassword"
            type="password" 
            placeholder="e.g Admin"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>
      </div>

      <div class="flex gap-3 justify-start pt-4">
        <button 
          type="button"
          @click="handleCancel"
          class="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
        >
          Cancel
        </button>
        <button 
          type="submit"
          class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-sm"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { PersonalInfoForm } from '~/types/profile';

const formData = ref<PersonalInfoForm>({
  firstName: '',
  lastName: '',
  newPassword: '',
  confirmedNewPassword: ''
});

const handleSubmit = () => {
  console.log('Personal info submitted:', formData.value);
  // Add your API call here
};

const handleCancel = () => {
  formData.value = {
    firstName: '',
    lastName: '',
    newPassword: '',
    confirmedNewPassword: ''
  };
};
</script>