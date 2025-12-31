<template>
  <NuxtLayout name="dashboard">
    <div class="min-h-screen">
      <!-- Main Content -->
      <div class="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <!-- Page Header -->
        <div class="flex justify-between items-center">
          <div class="mb-6 sm:mb-8">
            <h1 class="text-2xl font-bold text-gray-900">Role Management</h1>
            <p class="mt-2 text-sm sm:text-base text-gray-600">
              Define and manage access roles across iCCaREPO sites and modules.
            </p>
          </div>

          <!-- Add New Role Button -->
          <div class="mb-6">
            <button
                @click="openAddRoleModal"
                class="flex items-center gap-2 px-4 py-2 bg-[#005B8F] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add New Role
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005B8F]"></div>
        </div>

        <!-- Roles Table -->
        <div v-else class="bg-white rounded-lg shadow-sm border-[0.5px] border-gray-100 overflow-hidden">
          <!-- Mobile View -->
          <div class="block lg:hidden divide-y divide-gray-200">
            <div
                v-for="role in roles"
                :key="role.role_type"
                class="p-4 hover:bg-gray-50"
            >
              <div class="flex justify-between items-start mb-2">
                <div>
                  <div class="font-medium text-gray-900">{{ role.role_type }}</div>
                  <div class="text-sm text-gray-600 mt-1">{{ role.role_function }}</div>
                  <div class="mt-2">
                    <span
                        class="px-2 py-1 text-xs rounded-full"
                        :class="role.status === 'Enabled' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                    >
                      {{ role.status }}
                    </span>
                  </div>
                </div>
                <div class="flex gap-2">
                  <button
                      @click="openEditRoleModal(role)"
                      class="text-blue-600 hover:text-blue-800"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                      @click="openDeleteModal(role)"
                      class="text-red-600 hover:text-red-800"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Desktop Table View -->
          <div class="hidden lg:block overflow-x-auto border-[0.5px] border-gray-50">
            <table class="min-w-full divide-y-[0.5px] divide-gray-50">
              <thead class="bg-gray-25">
              <tr>
                <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SN
                </th>
                <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role Type
                </th>
                <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Function
                </th>
                <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiration
                </th>
                <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
              </thead>
              <tbody class="bg-white divide-y-[0.5px] divide-gray-50">
              <tr
                  v-for="(role, index) in roles"
                  :key="role.role_type"
                  class="hover:bg-gray-25"
              >
                <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-900">
                  {{ index + 1 }}
                </td>
                <td class="px-6 py-6 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ role.role_type }}
                </td>
                <td class="px-6 py-6 text-sm text-gray-600">
                  {{ role.role_function }}
                </td>
                <td class="px-6 py-6 whitespace-nowrap text-sm">
                    <span
                        class="px-3 py-1 rounded-full text-xs font-medium"
                        :class="role.status === 'Enabled' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                    >
                      {{ role.status }}
                    </span>
                </td>
                <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-600">
                  {{ role.expiration_date ? formatDate(role.expiration_date) : 'No Expiration' }}
                </td>
                <td class="px-6 py-6 whitespace-nowrap text-sm">
                  <div class="flex gap-2">
                    <button
                        @click="openEditRoleModal(role)"
                        class="text-blue-600 hover:text-blue-800"
                        title="Edit Role"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                        @click="openDeleteModal(role)"
                        class="text-red-600 hover:text-red-800"
                        title="Delete Role"
                    >
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Add/Edit Role Modal -->
      <Teleport to="body">
        <Transition name="modal">
          <div
              v-if="showAddRoleModal"
              class="fixed inset-0 z-50 overflow-y-auto"
              @click.self="closeAddRoleModal"
          >
            <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <!-- Background overlay -->
              <div class="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75" @click="closeAddRoleModal"></div>

              <!-- Modal panel -->
              <div class="inline-block w-full max-w-2xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
                <!-- Modal Header -->
                <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                  <div class="flex items-center gap-3">
                    <button
                        @click="closeAddRoleModal"
                        class="text-gray-400 hover:text-gray-600"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <h3 class="text-lg font-semibold text-gray-900">
                      {{ isEditMode ? 'Edit Role' : 'Add New Role' }}
                    </h3>
                  </div>
                </div>

                <!-- Modal Body -->
                <div class="px-6 py-6 space-y-6 max-h-[70vh] overflow-y-auto">
                  <!-- Role Type -->
                  <div>
                    <UiAnimatedInput
                        v-model="roleForm.role_type"
                        label="Role Type"
                        type="text"
                        :disabled="isEditMode"
                        required
                    />
                  </div>

                  <!-- Role Function -->
                  <div>
                    <UiAnimatedInput
                        v-model="roleForm.role_function"
                        label="Role Function"
                        :rows="3"
                        required
                    />
                  </div>

                  <!-- Function Rights -->
                  <div>
                    <div class="space-y-3">
                      <div
                          v-for="(functionRight, index) in roleForm.role_function_rights"
                          :key="index"
                          class="border border-gray-200 rounded-lg p-4"
                      >
                        <div class="flex justify-between items-start mb-3">
                          <UiAnimatedInput
                              v-model="functionRight.function_name"
                              type="text"
                              label="Function Rights"
                              class="w-full"
                          />
                          <button
                              @click="removeFunctionRight(index)"
                              class="text-red-600 hover:text-red-800"
                              type="button"
                          >
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                          </button>
                        </div>
                        <div class="space-y-2">
                          <label class="text-xs text-gray-600">Rights:</label>
                          <div class="flex flex-wrap gap-2">
                            <label v-for="right in availableRights" :key="right" class="inline-flex items-center">
                              <input
                                  type="checkbox"
                                  :value="right"
                                  v-model="functionRight.rights"
                                  class="custom-checkbox"
                              />
                              <span class="ml-2 text-sm">{{ right }}</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                        @click="addFunctionRight"
                        type="button"
                        class="mt-3 text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                      </svg>
                      Add Function Right
                    </button>
                  </div>

                  <!-- Status -->
                  <div>
                    <UiSelectInput :options="['Enabled', 'Disabled']" v-model="roleForm.status"  label="Status" />
                  </div>

                  <!-- Expiration Date -->
                  <div>
                    <UiAnimatedInput
                        v-model="roleForm.expiration_date"
                        type="date"
                        label="Expiration Date (Optional)"
                    />
                  </div>
                </div>

                <!-- Modal Footer -->
                <div class="flex justify-end gap-3 px-6 py-4 bg-gray-25 border-t border-gray-100">
                  <button
                      @click="closeAddRoleModal"
                      type="button"
                      class="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border-[0.5px] border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <button
                      @click="saveRole"
                      :disabled="isSubmitting"
                      type="button"
                      class="px-6 py-2.5 text-sm font-medium text-white bg-[#005B8F] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {{ isSubmitting ? 'Saving...' : (isEditMode ? 'Update Role' : 'Save Role') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>

      <!-- Delete Confirmation Modal -->
      <Teleport to="body">
        <Transition name="modal">
          <div
              v-if="showDeleteModal"
              class="fixed inset-0 z-50 overflow-y-auto"
              @click.self="closeDeleteModal"
          >
            <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <!-- Background overlay -->
              <div class="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75" @click="closeDeleteModal"></div>

              <!-- Modal panel -->
              <div class="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
                <!-- Modal Header -->
                <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                  <div class="flex items-center gap-3">
                    <button
                        @click="closeDeleteModal"
                        class="text-gray-400 hover:text-gray-600"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <h3 class="text-lg font-semibold text-gray-900">Delete Role</h3>
                  </div>
                </div>

                <!-- Modal Body -->
                <div class="px-6 py-8 text-center">
                  <div class="flex justify-center mb-4">
                    <div class="w-16 h-16 flex items-center justify-center bg-red-100 rounded-full">
                      <svg class="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                      </svg>
                    </div>
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Delete Role?</h3>
                  <p class="text-gray-600">
                    Are you sure you want to delete the '<span class="font-semibold">{{ roleToDelete?.role_type }}</span>' role? This action cannot be undone.
                  </p>
                </div>

                <!-- Modal Footer -->
                <div class="flex justify-between items-center w-full gap-3 px-6 py-4 bg-gray-50">
                  <button
                      @click="closeDeleteModal"
                      class="px-6 py-3 text-sm w-full font-medium text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <button
                      @click="confirmDelete"
                      :disabled="isSubmitting"
                      class="px-6 py-3 text-sm w-full font-medium text-sm text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {{ isSubmitting ? 'Deleting...' : 'Yes, Delete' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoleManagement } from "@/composables/modules/user/useRoleManagement"
import type { Role, CreateRolePayload, UpdateRolePayload } from "@/api_factory/modules/auth"

const { loading, roles, createRole, getAllRoles, updateRole, deleteRole } = useRoleManagement()

// State
const showAddRoleModal = ref(false)
const showDeleteModal = ref(false)
const isEditMode = ref(false)
const isSubmitting = ref(false)
const roleToDelete = ref<Role | null>(null)
const currentEditRoleType = ref<string | null>(null)

const availableRights = ['create', 'read', 'update', 'delete', 'write', 'export', 'submit']

interface RoleForm {
  role_type: string
  role_function: string
  role_function_rights: Array<{
    function_name: string
    rights: string[]
  }>
  expiration_date: string | null
  status: 'Enabled' | 'Disabled'
}

const roleForm = ref<RoleForm>({
  role_type: '',
  role_function: '',
  role_function_rights: [],
  expiration_date: null,
  status: 'Enabled'
})

// Lifecycle
onMounted(async () => {
  await getAllRoles()
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

// Modal functions
const openAddRoleModal = () => {
  isEditMode.value = false
  resetRoleForm()
  showAddRoleModal.value = true
}

const openEditRoleModal = (role: Role) => {
  isEditMode.value = true
  currentEditRoleType.value = role.role_type
  roleForm.value = {
    role_type: role.role_type,
    role_function: role.role_function,
    role_function_rights: JSON.parse(JSON.stringify(role.role_function_rights)),
    expiration_date: role.expiration_date,
    status: role.status
  }
  showAddRoleModal.value = true
}

const closeAddRoleModal = () => {
  showAddRoleModal.value = false
  isEditMode.value = false
  currentEditRoleType.value = null
  resetRoleForm()
}

const resetRoleForm = () => {
  roleForm.value = {
    role_type: '',
    role_function: '',
    role_function_rights: [
      {
        function_name: '',
        rights: []
      }
    ],
    expiration_date: null,
    status: 'Enabled'
  }
}

const openDeleteModal = (role: Role) => {
  roleToDelete.value = role
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  roleToDelete.value = null
}

// Function Rights management
const addFunctionRight = () => {
  roleForm.value.role_function_rights.push({
    function_name: '',
    rights: []
  })
}

const removeFunctionRight = (index: number) => {
  roleForm.value.role_function_rights.splice(index, 1)
}

// Save role
const saveRole = async () => {
  // Validation
  if (!roleForm.value.role_type.trim()) {
    alert('Please enter a role type')
    return
  }

  if (!roleForm.value.role_function.trim()) {
    alert('Please enter a role function')
    return
  }

  if (roleForm.value.role_function_rights.length === 0) {
    alert('Please add at least one function right')
    return
  }

  // Validate function rights
  for (const fr of roleForm.value.role_function_rights) {
    if (!fr.function_name.trim()) {
      alert('Please fill in all function names')
      return
    }
    if (fr.rights.length === 0) {
      alert(`Please select at least one right for ${fr.function_name}`)
      return
    }
  }

  isSubmitting.value = true

  if (isEditMode.value && currentEditRoleType.value) {
    // Update existing role
    const payload: UpdateRolePayload = {
      role_function: roleForm.value.role_function,
      role_function_rights: roleForm.value.role_function_rights,
      expiration_date: roleForm.value.expiration_date || null,
      status: roleForm.value.status
    }

    const result = await updateRole(currentEditRoleType.value, payload)
    isSubmitting.value = false

    if (result) {
      closeAddRoleModal()
      await getAllRoles()
    }
  } else {
    // Create new role
    const payload: CreateRolePayload = {
      role_type: roleForm.value.role_type,
      role_function: roleForm.value.role_function,
      role_function_rights: roleForm.value.role_function_rights,
      expiration_date: roleForm.value.expiration_date || null,
      status: roleForm.value.status
    }

    const result = await createRole(payload)
    isSubmitting.value = false

    if (result) {
      closeAddRoleModal()
      await getAllRoles()
    }
  }
}

// Delete role
const confirmDelete = async () => {
  if (!roleToDelete.value) return

  isSubmitting.value = true
  const result = await deleteRole(roleToDelete.value.role_type)
  isSubmitting.value = false

  if (result) {
    closeDeleteModal()
    await getAllRoles()
  }
}
</script>

<style scoped>



.custom-input:disabled {
  @apply bg-gray-100 cursor-not-allowed;
}


/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .inline-block,
.modal-leave-active .inline-block {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from .inline-block,
.modal-leave-to .inline-block {
  transform: scale(0.95);
  opacity: 0;
}

/* Loading spinner */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
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

/* Button disabled state */
button:disabled {
  @apply opacity-50 cursor-not-allowed;
}

/* Textarea resize */
textarea {
  resize: vertical;
}

/* Focus visible for accessibility */
button:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  @apply outline-2 outline-offset-2 outline-[#005B8F];
}

/* Table hover effect */
tbody tr:hover {
  @apply bg-gray-50;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .px-6 {
    @apply px-4;
  }

  .py-6 {
    @apply py-4;
  }
}
</style>