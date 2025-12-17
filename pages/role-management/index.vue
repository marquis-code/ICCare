<template>
  <NuxtLayout name="dashboard">
  <div class="min-h-screen">
    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
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
          class="flex items-center gap-2 px-4 py-2 bg-[#005B8F] text-white rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add New Role
        </button>
      </div>
</div>

      <!-- Roles Table -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <!-- Mobile View -->
        <div class="block lg:hidden divide-y divide-gray-200">
          <div
            v-for="role in roles"
            :key="role.id"
            class="p-4 hover:bg-gray-50"
          >
            <div class="flex justify-between items-start mb-2">
              <div>
                <div class="font-medium text-gray-900">{{ role.name }}</div>
                <div class="text-sm text-gray-600 mt-1">{{ role.permission }}</div>
              </div>
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

        <!-- Desktop Table View -->
        <div class="hidden lg:block overflow-x-auto border-[0.5px] border-gray-50">
          <table class="min-w-full divide-y-[0.5px] divide-gray-5-">
            <thead class="bg-gray-25">
              <tr>
                <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SN
                </th>
                <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Permission
                </th>
                <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y-[0.5px] divide-gray-50">
              <tr
                v-for="(role, index) in roles"
                :key="role.id"
                class="hover:bg-gray-25"
              >
                <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-900">
                  {{ index + 1 }}
                </td>
                <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-900">
                  {{ role.name }}
                </td>
                <td class="px-6 py-6 text-sm text-gray-600">
                  {{ role.permission }}
                </td>
                <td class="px-6 py-6 whitespace-nowrap text-sm">
                  <button
                    @click="openDeleteModal(role)"
                    class="text-red-600 hover:text-red-800"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                    </svg>
                  </button>
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
            <div class="inline-block w-full max-w-lg my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
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
                  <h3 class="text-lg font-semibold text-gray-900">Add New Roles</h3>
                </div>
              </div>

              <!-- Modal Body -->
              <div class="px-6 py-6 space-y-6">
                <!-- Role Name -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Role Name
                  </label>
                  <input
                    v-model="newRole.name"
                    type="text"
                    placeholder="e.g Admin"
                    class="custom-input"
                  />
                </div>

                <!-- Permission -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Permission
                  </label>
                  <div class="relative" ref="permissionDropdownRef">
                    <button
                      @click="togglePermissionDropdown"
                      type="button"
                      class="w-full px-3 py-3.5 text-left border-[0.5px] border-gray-100 rounded-lg focus:outline-none  outline-none bg-white"
                    >
                      <span v-if="selectedPermissions.length === 0" class="text-gray-400">
                        Select permissions
                      </span>
                      <span v-else class="text-gray-900">
                        {{ selectedPermissions.length }} permission(s) selected
                      </span>
                    </button>

                    <!-- Dropdown -->
                    <Transition name="dropdown">
                      <div
                        v-if="showPermissionDropdown"
                        class="absolute z-10 w-full mt-1 bg-white border-[0.5px] border-gray-100 rounded-md shadow-lg max-h-60 overflow-auto"
                      >
                        <div class="py-2">
                          <label
                            v-for="permission in availablePermissions"
                            :key="permission.id"
                            class="flex items-center px-4 py-2 hover:bg-gray-25 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              :value="permission.id"
                              v-model="selectedPermissions"
                              class="custom-checkbox"
                            />
                            <span class="ml-3 text-sm text-gray-900">{{ permission.name }}</span>
                          </label>
                        </div>
                      </div>
                    </Transition>
                  </div>

                  <!-- Selected Permissions Display -->
                  <div v-if="selectedPermissions.length > 0" class="mt-3 space-y-1">
                    <div class="text-xs text-gray-500 mb-2">Selected Permissions:</div>
                    <div class="flex flex-wrap gap-2">
                      <span
                        v-for="permId in selectedPermissions"
                        :key="permId"
                        class="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                      >
                        {{ getPermissionName(permId) }}
                        <button
                          @click="removePermission(permId)"
                          class="hover:text-blue-900"
                        >
                          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                          </svg>
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Modal Footer -->
              <div class="flex justify-end gap-3 px-6 py-4 bg-gray-25 border-t border-gray-100">
                <button
                  @click="closeAddRoleModal"
                  class="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border-[0.5px] border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  @click="saveRole"
                  class="px-6 py-2.5 text-sm font-medium text-white bg-[#005B8F] rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Save Role
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
                  <h3 class="text-lg font-semibold text-gray-900">Add New Roles</h3>
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
                  Are you sure you want to delete the '{{ roleToDelete?.name }}' role?
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
                  class="px-6 py-3 text-sm w-full font-medium text-sm text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Yes, Delete
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
import { ref, onMounted, onUnmounted } from 'vue'

interface Role {
  id: number
  name: string
  permission: string
}

interface Permission {
  id: string
  name: string
}

interface NewRole {
  name: string
  permissions: string[]
}

// State
const roles = ref<Role[]>([
  {
    id: 1,
    name: 'Admin',
    permission: 'Full system access with configuration privileges'
  },
  {
    id: 2,
    name: 'Researcher',
    permission: 'Full system access with configuration privileges'
  },
  {
    id: 3,
    name: 'Data Entry',
    permission: 'Full system access with configuration privileges'
  },
  {
    id: 4,
    name: 'Field Collector',
    permission: 'Full system access with configuration privileges'
  },
  {
    id: 5,
    name: 'Co-Investigator',
    permission: 'Full system access with configuration privileges'
  }
])

const availablePermissions = ref<Permission[]>([
  { id: 'create-admin', name: 'Create Admin' },
  { id: 'delete-admin', name: 'Delete Admin' },
  { id: 'create-user', name: 'Create User' },
  { id: 'delete-user', name: 'Delete User' },
  { id: 'create-role', name: 'Create Role' },
  { id: 'delete-role', name: 'Delete Role' },
  { id: 'manage-biosample', name: 'Manage Biosample' },
  { id: 'manage-tracking', name: 'Manage Tracking' },
  { id: 'view-reports', name: 'View Reports' },
  { id: 'export-data', name: 'Export Data' },
  { id: 'system-config', name: 'System Configuration' },
  { id: 'audit-logs', name: 'View Audit Logs' }
])

const showAddRoleModal = ref(false)
const showDeleteModal = ref(false)
const showPermissionDropdown = ref(false)
const roleToDelete = ref<Role | null>(null)
const permissionDropdownRef = ref<HTMLElement | null>(null)

const newRole = ref<NewRole>({
  name: '',
  permissions: []
})

const selectedPermissions = ref<string[]>([])

// Methods
const openAddRoleModal = () => {
  showAddRoleModal.value = true
  newRole.value = { name: '', permissions: [] }
  selectedPermissions.value = []
}

const closeAddRoleModal = () => {
  showAddRoleModal.value = false
  showPermissionDropdown.value = false
  newRole.value = { name: '', permissions: [] }
  selectedPermissions.value = []
}

const openDeleteModal = (role: Role) => {
  roleToDelete.value = role
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  roleToDelete.value = null
}

const togglePermissionDropdown = () => {
  showPermissionDropdown.value = !showPermissionDropdown.value
}

const getPermissionName = (permissionId: string): string => {
  const permission = availablePermissions.value.find(p => p.id === permissionId)
  return permission ? permission.name : permissionId
}

const removePermission = (permissionId: string) => {
  selectedPermissions.value = selectedPermissions.value.filter(id => id !== permissionId)
}

const saveRole = () => {
  if (!newRole.value.name.trim()) {
    alert('Please enter a role name')
    return
  }

  if (selectedPermissions.value.length === 0) {
    alert('Please select at least one permission')
    return
  }

  const permissionText = selectedPermissions.value
    .map(id => getPermissionName(id))
    .join(', ')

  const newRoleData: Role = {
    id: roles.value.length + 1,
    name: newRole.value.name,
    permission: permissionText
  }

  roles.value.push(newRoleData)
  closeAddRoleModal()

  // Here you would typically call your API
  // await $fetch('/api/roles', { method: 'POST', body: newRoleData })
}

const confirmDelete = () => {
  if (roleToDelete.value) {
    roles.value = roles.value.filter(role => role.id !== roleToDelete.value!.id)
    
    // Here you would typically call your API
    // await $fetch(`/api/roles/${roleToDelete.value.id}`, { method: 'DELETE' })
  }
  closeDeleteModal()
}

const handleClickOutside = (event: MouseEvent) => {
  if (permissionDropdownRef.value && !permissionDropdownRef.value.contains(event.target as Node)) {
    showPermissionDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
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

/* Dropdown Transitions */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>