<template>
  <div class="space-y-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <UiSelectInput
        v-model="formData.language"
        label="Language"
        :options="languageOptions"
      />
      
      <UiSelectInput
        v-model="formData.timeZone"
        label="Time Zone"
        :options="timeZoneOptions"
      />
    </div>

    <!-- Notifications Preference -->
    <div>
      <h3 class="text-lg font-semibold text-gray-900 mb-6">Notifications preference</h3>
      
      <div class="space-y-4">
        <!-- Email Notifications -->
        <div class="bg-gray-25 rounded-lg p-5 flex items-center justify-between">
          <div class="flex-1">
            <h4 class="text-base font-semibold text-gray-900 mb-1">Email Notifications</h4>
            <p class="text-sm text-gray-600">Manage your personal information, credentials, and system preferences.</p>
          </div>
          <UiCustomToggle v-model="formData.emailNotifications" />
        </div>

        <!-- In-App Notifications -->
        <div class="bg-gray-25 rounded-lg p-5 flex items-center justify-between">
          <div class="flex-1">
            <h4 class="text-base font-semibold text-gray-900 mb-1">In-App Notifications</h4>
            <p class="text-sm text-gray-600">Manage your personal information, credentials, and system preferences.</p>
          </div>
          <UiCustomToggle v-model="formData.inAppNotifications" />
        </div>

        <!-- Push Notifications -->
        <div class="bg-gray-25 rounded-lg p-5 flex items-center justify-between">
          <div class="flex-1">
            <h4 class="text-base font-semibold text-gray-900 mb-1">In-App Notifications</h4>
            <p class="text-sm text-gray-600">Manage your personal information, credentials, and system preferences.</p>
          </div>
          <UiCustomToggle v-model="formData.pushNotifications" />
        </div>
      </div>
    </div>

    <!-- Save Button -->
    <div class="flex justify-end pt-4">
      <button 
        @click="handleSave"
        class="px-8 py-3 bg-[#005B8F] text-white rounded-xl  transition font-medium shadow-sm"
      >
        Save Role
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SettingsForm, DropdownOption } from '~/types/profile';

const formData = ref<SettingsForm>({
  language: 'english',
  timeZone: 'english',
  emailNotifications: true,
  inAppNotifications: false,
  pushNotifications: true
});

const languageOptions: DropdownOption[] = [
  { label: 'English', value: 'english' },
  { label: 'Spanish', value: 'spanish' },
  { label: 'French', value: 'french' },
  { label: 'German', value: 'german' }
];

const timeZoneOptions: DropdownOption[] = [
  { label: 'English', value: 'english' },
  { label: 'UTC', value: 'utc' },
  { label: 'GMT', value: 'gmt' },
  { label: 'EST', value: 'est' },
  { label: 'PST', value: 'pst' }
];

const handleSave = () => {
  console.log('Settings saved:', formData.value);
  // Add your API call here
};
</script>