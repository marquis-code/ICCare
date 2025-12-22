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
            placeholder="Enter first name"
            class="custom-input"
          />
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Last Name
          </label>
          <input 
            v-model="formData.lastName"
            type="text" 
            placeholder="Enter last name"
            class="custom-input"
          />
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Email Address
          </label>
          <input 
            v-model="formData.email"
            type="email" 
            placeholder="Enter email"
            disabled
            class="custom-input bg-gray-50 cursor-not-allowed"
          />
          <p class="text-xs text-gray-500 mt-1">Email cannot be changed</p>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            User ID
          </label>
          <input 
            v-model="formData.userId"
            type="text" 
            disabled
            class="custom-input bg-gray-50 cursor-not-allowed"
          />
          <p class="text-xs text-gray-500 mt-1">User ID is read-only</p>
        </div>
      </div>

      <div class="flex gap-3 justify-start pt-4 border-t border-gray-200 mt-6">
        <button 
          type="button"
          @click="handleCancel"
          class="px-6 py-3 border-[0.5px] text-sm border-gray-100 text-gray-700 rounded-xl hover:bg-gray-50 transition font-medium"
        >
          Cancel
        </button>
        <button 
          type="submit"
          class="px-6 py-3 bg-[#005B8F] text-sm text-white rounded-xl hover:bg-[#004a73] transition font-medium shadow-sm"
        >
          Save Changes
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { PersonalInfoForm } from '~/types/profile';

const props = defineProps<{
  user: {
    user_id: string;
    email: string;
    first_name: string;
    last_name: string;
  } | null;
}>();

const formData = ref<PersonalInfoForm>({
  firstName: '',
  lastName: '',
  email: '',
  userId: ''
});

// Initialize form with user data when component mounts or user changes
watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      formData.value.firstName = newUser.first_name || '';
      formData.value.lastName = newUser.last_name || '';
      formData.value.email = newUser.email || '';
      formData.value.userId = newUser.user_id || '';
    }
  },
  { immediate: true }
);

const handleSubmit = () => {
  const updatePayload = {
    first_name: formData.value.firstName,
    last_name: formData.value.lastName
  };

  console.log('Profile update submitted:', updatePayload);
  // Add your API call here to update user profile
  // Example: await updateUserProfile(props.user.user_id, updatePayload);
};

const handleCancel = () => {
  // Reset form to original user data
  if (props.user) {
    formData.value.firstName = props.user.first_name || '';
    formData.value.lastName = props.user.last_name || '';
    formData.value.email = props.user.email || '';
    formData.value.userId = props.user.user_id || '';
  }
};
</script>