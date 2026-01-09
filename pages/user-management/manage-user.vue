<template>
  <NuxtLayout name="dashboard">
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between rounded-xl bg-[#DCF1FF] text-[#005B8F] py-4 px-6 mb-6">
        <h1 class="text-xl font-semibold bg-[#DCF1FF] text-[#005B8F]">User Management</h1>
        <button @click="openAddUserModal"
                class="flex items-center gap-2 px-4 py-3 text-[#DCF1FF] bg-[#005B8F] rounded-lg transition-colors">
       <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2023_384)">
<path d="M3.01562 0C1.9125 0 1.01562 0.896875 1.01562 2V14C1.01562 15.1031 1.9125 16 3.01562 16H11.0156C12.1187 16 13.0156 15.1031 13.0156 14V11H15.4563L14.4875 11.9688C14.1938 12.2625 14.1938 12.7375 14.4875 13.0281C14.7812 13.3187 15.2563 13.3219 15.5469 13.0281L17.7969 10.7781C18.0906 10.4844 18.0906 10.0094 17.7969 9.71875L15.5469 7.46875C15.2531 7.175 14.7781 7.175 14.4875 7.46875C14.1969 7.7625 14.1938 8.2375 14.4875 8.52812L15.4563 9.49687H13.0156V5.325C13.0156 4.79375 12.8062 4.28438 12.4312 3.90937L9.1 0.584375C8.725 0.209375 8.21875 0 7.6875 0H3.01562ZM11.1875 5.5H8.26562C7.85 5.5 7.51562 5.16563 7.51562 4.75V1.82812L11.1875 5.5ZM7.01562 10.25C7.01562 9.83438 7.35 9.5 7.76562 9.5H11.0156V11H7.76562C7.35 11 7.01562 10.6656 7.01562 10.25Z" fill="#005B8F"/>
</g>
<defs>
<clipPath id="clip0_2023_384">
<rect width="18" height="16" fill="white"/>
</clipPath>
</defs>
</svg>

          <span class="font-medium">Add New User</span>
        </button>
      </div>

      <!-- User Stats -->
      <UserStat :stats="userStats" />

      <!-- User Management Table -->
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">User Management</h3>
          <div class="flex items-center gap-3">
            <button @click="showFilterModal = true"
                    class="flex items-center gap-2 px-4 py-2 bg-[#EAF7FF] rounded-lg hover:bg-gray-50 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.0001 12V19.88C14.0401 20.18 13.9401 20.5 13.7101 20.71C13.6176 20.8027 13.5077 20.8762 13.3868 20.9264C13.2658 20.9766 13.1361 21.0024 13.0051 21.0024C12.8742 21.0024 12.7445 20.9766 12.6235 20.9264C12.5025 20.8762 12.3926 20.8027 12.3001 20.71L10.2901 18.7C10.1811 18.5933 10.0982 18.4629 10.0479 18.319C9.99763 18.175 9.98127 18.0213 10.0001 17.87V12H9.97013L4.21013 4.62C4.04774 4.41153 3.97446 4.14726 4.00632 3.88493C4.03817 3.6226 4.17257 3.38355 4.38013 3.22C4.57013 3.08 4.78013 3 5.00013 3H19.0001C19.2201 3 19.4301 3.08 19.6201 3.22C19.8277 3.38355 19.9621 3.6226 19.9939 3.88493C20.0258 4.14726 19.9525 4.41153 19.7901 4.62L14.0301 12H14.0001Z" fill="#005B8F"/>
              </svg>
              <span class="text-sm font-medium">Filter</span>
            </button>
            <button @click="exportUsers"
                    class="flex items-center gap-2 px-4 py-2 bg-[#005B8F] text-white rounded-lg transition-colors">
              <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_2004_1048)">
                  <path d="M3.01562 0C1.9125 0 1.01562 0.896875 1.01562 2V14C1.01562 15.1031 1.9125 16 3.01562 16H11.0156C12.1187 16 13.0156 15.1031 13.0156 14V11H15.4563L14.4875 11.9688C14.1938 12.2625 14.1938 12.7375 14.4875 13.0281C14.7812 13.3187 15.2563 13.3219 15.5469 13.0281L17.7969 10.7781C18.0906 10.4844 18.0906 10.0094 17.7969 9.71875L15.5469 7.46875C15.2531 7.175 14.7781 7.175 14.4875 7.46875C14.1969 7.7625 14.1938 8.2375 14.4875 8.52812L15.4563 9.49687H13.0156V5.325C13.0156 4.79375 12.8062 4.28438 12.4312 3.90937L9.1 0.584375C8.725 0.209375 8.21875 0 7.6875 0H3.01562ZM11.1875 5.5H8.26562C7.85 5.5 7.51562 5.16563 7.51562 4.75V1.82812L11.1875 5.5ZM7.01562 10.25C7.01562 9.83438 7.35 9.5 7.76562 9.5H11.0156V11H7.76562C7.35 11 7.01562 10.6656 7.01562 10.25Z" fill="white"/>
                </g>
              </svg>
              <span class="text-sm font-medium">Export</span>
            </button>
          </div>
        </div>

        <!-- Table -->
        <div v-if="loading" class="flex items-center justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005B8F]"></div>
        </div>

        <div v-else class="overflow-x-auto rounded-xl border-[0.5px] border-gray-50">
          <table class="w-full rounded-t-xl">
            <thead>
            <tr class="border-b bg-[#F6F6F6] border-gray-100">
              <th class="text-left py-6 px-4 text-sm font-semibold text-gray-700">SN</th>
              <th class="text-left py-6 px-4 text-sm font-semibold text-gray-700">Name</th>
              <th class="text-left py-6 px-4 text-sm font-semibold text-gray-700">Email</th>
              <th class="text-left py-6 px-4 text-sm font-semibold text-gray-700">Status</th>
              <th class="text-left py-6 px-4 text-sm font-semibold text-gray-700">Verified</th>
              <th class="text-left py-6 px-4 text-sm font-semibold text-gray-700">Created At</th>
              <th class="text-left py-6 px-4 text-sm font-semibold text-gray-700">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(user, index) in paginatedUsers" :key="user.user_id"
                class="border-b border-gray-50 hover:bg-gray-25 transition-colors">
              <td class="py-6 px-4 text-sm text-gray-900">
  {{ (currentPage - 1) * pageSize + index + 1 }}
</td>
              <td class="py-6 px-4 text-sm text-gray-900">{{ user.first_name }} {{ user.last_name }}</td>
              <td class="py-6 px-4 text-sm text-gray-700">{{ user.email }}</td>
              <td class="py-6 px-4">
                                    <span class="px-3 py-2.5 rounded-full text-xs font-medium"
                                          :class="user.is_active ? 'bg-[#E4F3ED] text-[#007B2D]' : 'bg-[#FFEBEB] text-[#FF0000]'">
                                        {{ user.is_active ? 'Active' : 'Inactive' }}
                                    </span>
              </td>
              <td class="py-6 px-4">
                                    <span class="px-3 py-2.5 rounded-full text-xs font-medium"
                                          :class="user.is_verified ? 'bg-[#E4F3ED] text-[#007B2D]' : 'bg-[#EDF4FF] text-[#0056E2]'">
                                        {{ user.is_verified ? 'Verified' : 'Pending' }}
                                    </span>
              </td>
              <td class="py-6 px-4 text-sm text-gray-700">{{ formatDate(user.created_at) }}</td>
              <td class="py-6 px-4">
                <div class="flex items-center gap-2">
                  <button @click="openEditUserModal(user)"
                          class="text-gray-600 hover:text-blue-600 transition-colors" title="Edit">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button v-if="user.is_active" @click="openDeactivateModal(user)"
                          class="px-3 py-2.5 bg-[#FFEBEB] text-[#FF0000] rounded-full text-xs font-medium transition-colors">
                    Deactivate
                  </button>
                  <button v-else @click="openActivateModal(user)"
                          class="px-3 py-2.5 bg-[#E4F3ED] text-[#007B2D] rounded-full text-xs font-medium transition-colors">
                    Activate
                  </button>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
           <Pagination 
    v-if="filteredUsers.length > 0"
    v-model:currentPage="currentPage" 
    v-model:pageSize="pageSize"
    :totalItems="totalItems" 
    :pageSizeOptions="[10, 25, 50, 100]" 
  />
        </div>
      </div>
    </div>

    <!-- Add User Modal -->
    <Teleport to="body">
      <div v-if="showAddUserModal"
           class="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4"
           @click.self="closeAddUserModal">
        <div class="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Add New User</h2>

          <form @submit.prevent="handleAddUser" class="space-y-5">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <UiAnimatedInput v-model="addUserForm.first_name" type="text" label="First name"
                       " required />
              </div>

              <div>
                <UiAnimatedInput v-model="addUserForm.last_name" type="text" label="Last name"
                      required />
              </div>
            </div>

            <div>
              <UiAnimatedInput v-model="addUserForm.email" type="email" label="Email"
                   required />
            </div>

            <!-- <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <UiAnimatedInput v-model="addUserForm.password" type="password" label="Password"
                      required minlength="8" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <UiAnimatedInput v-model="addUserForm.password_confirm" type="password" label="Confirm Password"
                      required minlength="8" />
            </div> -->

            <div class="flex gap-3 pt-4">
              <button type="button" @click="closeAddUserModal"
                      class="flex-1 px-6 py-3 border-[0.5px] border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">
                Cancel
              </button>
              <button type="submit" :disabled="isSubmitting"
                      class="flex-1 px-6 py-3 bg-[#005B8F] text-white rounded-xl transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 4v16m8-8H4" />
                </svg>
                {{ isSubmitting ? 'Creating...' : 'Create User' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- Edit User Modal -->
    <Teleport to="body">
      <div v-if="showEditUserModal"
           class="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex items-center justify-center p-4"
           @click.self="closeEditUserModal">
        <div class="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Edit User</h2>

          <form @submit.prevent="handleEditUser" class="space-y-5">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <UiAnimatedInput v-model="editUserForm.first_name" type="text"
                       label="First name" required />
              </div>

              <div>
                <UiAnimatedInput v-model="editUserForm.last_name" type="text"
                       label="Last name" required />
              </div>
            </div>

            <div>
              <UiAnimatedInput v-model="editUserForm.email" type="email"
                     label="Email" required />
            </div>

            <div>
              <label class="flex items-center gap-2">
                <input v-model="editUserForm.is_verified"  type="checkbox" class="custom-checkbox">
                <span class="text-sm font-medium text-gray-700">Email Verified</span>
              </label>
            </div>

            <div class="flex gap-3 pt-4">
              <button type="button" @click="closeEditUserModal"
                      class="flex-1 px-6 py-3 border-[0.5px] border-gray-100 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">
                Cancel
              </button>
              <button type="submit" :disabled="isSubmitting"
                      class="flex-1 px-6 py-3 bg-[#005B8F] text-white rounded-xl transition-colors font-medium disabled:opacity-50">
                {{ isSubmitting ? 'Saving...' : 'Save Changes' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- Activate Confirmation Modal -->
    <Teleport to="body">
      <div v-if="showActivateConfirmModal"
           class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4"
           @click.self="closeActivateModal">
        <div class="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
          <div class="flex flex-col items-center text-center">
            <div class="w-16 h-16 bg-[#E4F3ED] rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-[#007B2D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Activate User</h3>
            <p class="text-gray-600 mb-6">
              Are you sure you want to activate
              <span class="font-semibold">{{ selectedUser?.first_name }} {{ selectedUser?.last_name }}</span>?
            </p>
            <div class="flex gap-3 w-full">
              <button @click="closeActivateModal"
                      class="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">
                Cancel
              </button>
              <button @click="confirmActivateUser" :disabled="isSubmitting"
                      class="flex-1 px-6 py-3 bg-[#007B2D] text-white rounded-xl transition-colors font-medium disabled:opacity-50">
                {{ isSubmitting ? 'Activating...' : 'Activate' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Deactivate Confirmation Modal -->
    <Teleport to="body">
      <div v-if="showDeactivateConfirmModal"
           class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4"
           @click.self="closeDeactivateModal">
        <div class="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
          <div class="flex flex-col items-center text-center">
            <div class="w-16 h-16 bg-[#FFEBEB] rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-[#FF0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Deactivate User</h3>
            <p class="text-gray-600 mb-6">
              Are you sure you want to deactivate
              <span class="font-semibold">{{ selectedUser?.first_name }} {{ selectedUser?.last_name }}</span>?
              This user will no longer be able to access the system.
            </p>
            <div class="flex gap-3 w-full">
              <button @click="closeDeactivateModal"
                      class="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">
                Cancel
              </button>
              <button @click="confirmDeactivateUser" :disabled="isSubmitting"
                      class="flex-1 px-6 py-3 bg-[#FF0000] text-white rounded-xl transition-colors font-medium disabled:opacity-50">
                {{ isSubmitting ? 'Deactivating...' : 'Deactivate' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Filter Modal -->
    <Teleport to="body">
      <div v-if="showFilterModal"
           class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4"
           @click.self="showFilterModal = false">
        <div class="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Filter Users</h3>
            <button @click="showFilterModal = false"
                    class="text-gray-400 hover:text-gray-600 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <UiSelectInput :options="['active', 'inactive']" v-model="filters.status" label="Status" />
            </div>

            <div>
              <UiSelectInput :options="['verified', 'pending']" v-model="filters.verified" label="Verification" />
            </div>

            <div class="flex gap-3 pt-4">
              <button @click="applyFilters"
                      class="flex-1 bg-[#005B8F] text-white px-4 py-2 rounded-lg transition-colors font-medium">
                Apply Filters
              </button>
              <button @click="resetFilters"
                      class="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useUserManagement } from "@/composables/modules/user/useUserManagement"
import { useAuth } from "@/composables/modules/user/useAuth"
import { usePagination } from '@/composables/core/usePagination'

interface User {
  user_id: string
  email: string
  first_name: string
  last_name: string
  is_active: boolean
  is_verified: boolean
  created_at: string
}

interface AddUserForm {
  first_name: string
  last_name: string
  email: string
  // password: string
  // password_confirm: string
}

interface EditUserForm {
  first_name: string
  last_name: string
  email: string
  is_verified: boolean
}

interface Filters {
  status: string
  verified: string
}

const { loading, users, getAllUsers, updateUser, deactivateUser } = useUserManagement()
const { signUp } = useAuth()

// Modal states
const showAddUserModal = ref(false)
const showEditUserModal = ref(false)
const showFilterModal = ref(false)
const showActivateConfirmModal = ref(false)
const showDeactivateConfirmModal = ref(false)
const isSubmitting = ref(false)
const selectedUser = ref<User | null>(null)
const currentEditUserId = ref<string | null>(null)

// Forms
const addUserForm = ref<AddUserForm>({
  first_name: '',
  last_name: '',
  email: '',
  // password: '',
  // password_confirm: ''
})

const editUserForm = ref<EditUserForm>({
  first_name: '',
  last_name: '',
  email: '',
  is_verified: false
})

const filters = ref<Filters>({
  status: '',
  verified: ''
})

// Computed properties
const filteredUsers = computed(() => {
  if (!users.value) return []

  let result = users.value

  if (filters.value.status) {
    if (filters.value.status === 'active') {
      result = result.filter(user => user.is_active)
    } else if (filters.value.status === 'inactive') {
      result = result.filter(user => !user.is_active)
    }
  }

  if (filters.value.verified) {
    if (filters.value.verified === 'verified') {
      result = result.filter(user => user.is_verified)
    } else if (filters.value.verified === 'pending') {
      result = result.filter(user => !user.is_verified)
    }
  }

  return result
})

const {
  currentPage,
  pageSize,
  totalItems,
  paginatedItems: paginatedUsers,
  resetPagination
} = usePagination(filteredUsers, {
  initialPage: 1,
  initialPageSize: 10,
  pageSizeOptions: [10, 25, 50, 100]
})


const userStats = computed(() => {
  if (!users.value) return { total: 0, active: 0, inactive: 0, pending: 0 }

  return {
    total: users.value.length,
    active: users.value.filter(u => u.is_active).length,
    inactive: users.value.filter(u => !u.is_active).length,
    pending: users.value.filter(u => !u.is_verified).length
  }
})

// Lifecycle
onMounted(async () => {
  await getAllUsers()
})

// Utility functions
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Add User Modal functions
const openAddUserModal = () => {
  showAddUserModal.value = true
}

const closeAddUserModal = () => {
  showAddUserModal.value = false
  resetAddUserForm()
}

const resetAddUserForm = () => {
  addUserForm.value = {
    first_name: '',
    last_name: '',
    email: '',
    // password: '',
    // password_confirm: ''
  }
}

// const handleAddUser = async () => {
//   if (addUserForm.value.password !== addUserForm.value.password_confirm) {
//     alert('Passwords do not match!')
//     return
//   }

//   isSubmitting.value = true
//   const result = await signUp(addUserForm.value)
//   isSubmitting.value = false

//   if (result) {
//     closeAddUserModal()
//     await getAllUsers() // Refresh the list
//   }
// }

const handleAddUser = async () => {
  // Remove password validation since we don't have passwords anymore
  
  isSubmitting.value = true
  const result = await signUp(addUserForm.value)
  isSubmitting.value = false

  if (result) {
    closeAddUserModal()
    await getAllUsers() // Refresh the list
  }
}

// Edit User Modal functions
const openEditUserModal = (user: User) => {
  currentEditUserId.value = user.user_id
  editUserForm.value = {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    is_verified: user.is_verified
  }
  showEditUserModal.value = true
}

const closeEditUserModal = () => {
  showEditUserModal.value = false
  currentEditUserId.value = null
  resetEditUserForm()
}

const resetEditUserForm = () => {
  editUserForm.value = {
    first_name: '',
    last_name: '',
    email: '',
    is_verified: false
  }
}

const handleEditUser = async () => {
  if (!currentEditUserId.value) return

  isSubmitting.value = true
  const result = await updateUser(currentEditUserId.value, editUserForm.value)
  isSubmitting.value = false

  if (result) {
    closeEditUserModal()
    await getAllUsers() // Refresh the list
  }
}

// Activate/Deactivate Modal functions
const openActivateModal = (user: User) => {
  selectedUser.value = user
  showActivateConfirmModal.value = true
}

const closeActivateModal = () => {
  showActivateConfirmModal.value = false
  selectedUser.value = null
}

const confirmActivateUser = async () => {
  if (!selectedUser.value) return

  isSubmitting.value = true
  const result = await updateUser(selectedUser.value.user_id, { is_active: true })
  isSubmitting.value = false

  if (result) {
    closeActivateModal()
    await getAllUsers() // Refresh the list
  }
}

const openDeactivateModal = (user: User) => {
  selectedUser.value = user
  showDeactivateConfirmModal.value = true
}

const closeDeactivateModal = () => {
  showDeactivateConfirmModal.value = false
  selectedUser.value = null
}

const confirmDeactivateUser = async () => {
  if (!selectedUser.value) return

  isSubmitting.value = true
  const result = await deactivateUser(selectedUser.value.user_id)
  isSubmitting.value = false

  if (result) {
    closeDeactivateModal()
    await getAllUsers() // Refresh the list
  }
}

// Filter functions
const applyFilters = () => {
  showFilterModal.value = false
  resetPagination() // Add this line
}

const resetFilters = () => {
  filters.value = {
    status: '',
    verified: ''
  }
  showFilterModal.value = false
  resetPagination() // Add this line
}
// Export function
const exportUsers = () => {
  const csv = [
    ['SN', 'First Name', 'Last Name', 'Email', 'Status', 'Verified', 'Created At'],
    ...filteredUsers.value.map((u, i) => [
      i + 1,
      u.first_name,
      u.last_name,
      u.email,
      u.is_active ? 'Active' : 'Inactive',
      u.is_verified ? 'Verified' : 'Pending',
      formatDate(u.created_at)
    ])
  ].map(row => row.join(',')).join('\n')

  const blob = new Blob([csv], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `users_${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  window.URL.revokeObjectURL(url)
}
</script>

<style scoped>



/* Loading spinner animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Smooth transitions for modals */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Table hover effect */
tbody tr:hover {
  @apply bg-gray-50;
}

/* Badge styles */
.badge-active {
  @apply bg-[#E4F3ED] text-[#007B2D];
}

.badge-inactive {
  @apply bg-[#FFEBEB] text-[#FF0000];
}

.badge-verified {
  @apply bg-[#E4F3ED] text-[#007B2D];
}

.badge-pending {
  @apply bg-[#EDF4FF] text-[#0056E2];
}

/* Button disabled state */
button:disabled {
  @apply opacity-50 cursor-not-allowed;
}

/* Scrollbar styling */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  @apply bg-gray-100 rounded-lg;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  @apply bg-gray-300 rounded-lg;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400;
}

/* Form input focus state */
input:focus,
select:focus {
  @apply outline-none ring-2 ring-[#005B8F] border-transparent;
}



/* Select dropdown styling */
select {
  @apply appearance-none bg-white bg-no-repeat;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E");
  background-position: right 0.5rem center;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

/* Modal backdrop blur effect */
.fixed.inset-0.bg-black {
  backdrop-filter: blur(2px);
}

/* Card shadow on hover */
.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Button hover effects */
button {
  @apply transition-all duration-200;
}

button:hover:not(:disabled) {
  @apply transform scale-105;
}

button:active:not(:disabled) {
  @apply transform scale-95;
}

/* Table responsive */
@media (max-width: 768px) {
  .overflow-x-auto {
    @apply -mx-4;
  }

  table {
    @apply text-sm;
  }

  th, td {
    @apply px-2 py-4;
  }
}

/* Empty state */
.empty-state {
  @apply flex flex-col items-center justify-center py-12 text-gray-500;
}

/* Status badge animation */
.status-badge {
  @apply inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all;
}

/* Filter badge */
.filter-active {
  @apply relative;
}

.filter-active::after {
  content: '';
  @apply absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full;
}

/* Loading overlay */
.loading-overlay {
  @apply absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10;
}

/* Success animation for icons */
@keyframes checkmark {
  0% {
    stroke-dashoffset: 50;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

.checkmark {
  stroke-dasharray: 50;
  stroke-dashoffset: 50;
  animation: checkmark 0.3s ease-in-out forwards;
}

/* Modal slide-in animation */
@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-content {
  animation: slideUp 0.3s ease-out;
}

/* Gradient background for header */
.gradient-bg {
  background: linear-gradient(135deg, #005B8F 0%, #003d5c 100%);
}

/* Tooltip */
[title] {
  @apply relative;
}

/* Focus visible for accessibility */
button:focus-visible,
input:focus-visible,
select:focus-visible {
  @apply outline-2 outline-offset-2 outline-[#005B8F];
}

/* Print styles */
@media print {
  .no-print {
    display: none !important;
  }

  table {
    @apply text-xs;
  }
}
</style>