<template>
    <NuxtLayout name="dashboard">
        <div class="space-y-6">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <h1 class="text-xl font-semibold text-gray-900">User Management</h1>
                <button @click="openAddUserModal"
                    class="flex items-center gap-2 px-4 py-2 bg-[#005B8F] text-white rounded-lg  transition-colors">
                  <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2013_376)">
<path d="M3.01562 0C1.9125 0 1.01562 0.896875 1.01562 2V14C1.01562 15.1031 1.9125 16 3.01562 16H11.0156C12.1187 16 13.0156 15.1031 13.0156 14V11H15.4563L14.4875 11.9688C14.1938 12.2625 14.1938 12.7375 14.4875 13.0281C14.7812 13.3187 15.2563 13.3219 15.5469 13.0281L17.7969 10.7781C18.0906 10.4844 18.0906 10.0094 17.7969 9.71875L15.5469 7.46875C15.2531 7.175 14.7781 7.175 14.4875 7.46875C14.1969 7.7625 14.1938 8.2375 14.4875 8.52812L15.4563 9.49687H13.0156V5.325C13.0156 4.79375 12.8062 4.28438 12.4312 3.90937L9.1 0.584375C8.725 0.209375 8.21875 0 7.6875 0H3.01562ZM11.1875 5.5H8.26562C7.85 5.5 7.51562 5.16563 7.51562 4.75V1.82812L11.1875 5.5ZM7.01562 10.25C7.01562 9.83438 7.35 9.5 7.76562 9.5H11.0156V11H7.76562C7.35 11 7.01562 10.6656 7.01562 10.25Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_2013_376">
<rect width="18" height="16" fill="white"/>
</clipPath>
</defs>
</svg>

                    <span class="font-medium">Add New User</span>
                </button>
            </div>

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
<defs>
<clipPath id="clip0_2004_1048">
<rect width="18" height="16" fill="white"/>
</clipPath>
</defs>
</svg>

                            <span class="text-sm font-medium">Export</span>
                        </button>
                    </div>
                </div>

                <!-- Table -->
                <div class="overflow-x-auto rounded-xl border-[0.5px] border-gray-50">
                    <table class="w-full rounded-t-xl">
                        <thead>
                            <tr class="border-b bg-[#F6F6F6]  border-gray-100">
                                <th class="text-left py-6 px-4 text-sm font-semibold text-gray-700">SN</th>
                                <th class="text-left py-6 px-4 text-sm font-semibold text-gray-700">Name</th>
                                <th class="text-left py-6 px-4 text-sm font-semibold text-gray-700">Email</th>
                                <th class="text-left py-6 px-4 text-sm font-semibold text-gray-700">Location</th>
                                <th class="text-left py-6 px-4 text-sm font-semibold text-gray-700">Role</th>
                                <th class="text-left py-6 px-4 text-sm font-semibold text-gray-700">Actions</th>
                                <th class="text-left py-6 px-4 text-sm font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(user, index) in filteredUsers" :key="user.id"
                                class="border-b border-gray-50 hover:bg-gray-25 transition-colors">
                                <td class="py-6 px-4 text-sm text-gray-900">{{ index + 1 }}</td>
                                <td class="py-6 px-4 text-sm text-gray-900">{{ user.name }}</td>
                                <td class="py-6 px-4 text-sm text-gray-700">{{ user.email }}</td>
                                <td class="py-6 px-4">
                                    <div class="flex items-center gap-2 text-sm text-gray-600">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {{ user.location }}
                                    </div>
                                </td>
                                <td class="py-6 px-4">
                                    <span class="px-3 py-2.5 rounded-full text-xs font-medium"
                                        :class="getRoleBadgeClass(user.role)">
                                        {{ user.role }}
                                    </span>
                                </td>
                                <td class="py-6 px-4">
                                    <div class="flex items-center gap-2">
                                        <button @click="unblockUser(user)"
                                            class="px-3 py-2.5 bg-[#E4F3ED] text-[#007B2D] rounded-full text-xs font-medium transition-colors">
                                            Unblock
                                        </button>
                                        <button @click="blockUser(user)"
                                            class="px-3 py-2.5 bg-[#FFEBEB] text-[#FF0000] rounded-full text-xs font-medi transition-colors">
                                            Block
                                        </button>
                                    </div>
                                </td>
                                <td class="py-6 px-4">
                                    <div class="flex items-center gap-3">
                                        <button @click="openEditUserModal(user)"
                                            class="text-gray-600 hover:text-blue-600 transition-colors" title="Edit">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <!-- <button @click="activateUser(user)"
                                            class="px-3 py-2.5 bg-[#E4F3ED] text-[#007B2D] rounded-full text-xs font-medium transition-colors">
                                            Activate
                                        </button> -->
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Add User Modal -->
        <Teleport to="body">
            <div v-if="showAddUserModal"
                class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                @click.self="closeAddUserModal">
                <div class="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
                    <h2 class="text-xl font-semibold text-gray-900 mb-6">Add New User</h2>

                    <form @submit.prevent="handleAddUser" class="space-y-5">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">First name</label>
                                <input v-model="addUserForm.firstName" type="text" placeholder="Joe"
                                    class="custom-input"
                                    required />
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Last name</label>
                                <input v-model="addUserForm.lastName" type="text" placeholder="Joe"
                                    class="custom-input"
                                    required />
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input v-model="addUserForm.email" type="email" placeholder="Joe"
                                class="custom-input"
                                required />
                        </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                <input v-model="addUserForm.phone" type="tel" placeholder="Joe"
                                    class="custom-input"
                                    required />
                            </div>


                            <div>
                                <UiSelectInput label="Site Location" :options="siteLocation" position="standalone" v-model="addUserForm.location" />
                            </div>

                        <div>
                            <UiSelectInput label="Roles" :options="roles" position="standalone" v-model="addUserForm.role" />
                        </div>

                        <div class="flex gap-3 pt-4">
                            <button type="button" @click="closeAddUserModal"
                                class="flex-1 px-6 py-3 border-[0.5px] border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">
                                Cancel
                            </button>
                            <button type="submit" :disabled="isSubmitting"
                                class="flex-1 px-6 py-3 bg-[#005B8F] text-white rounded-xl  transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50">
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
                class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                @click.self="closeEditUserModal">
                <div class="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
                    <h2 class="text-2xl font-bold text-gray-900 mb-6">Edit User</h2>

                    <form @submit.prevent="handleEditUser" class="space-y-5">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">First name</label>
                                <input v-model="editUserForm.firstName" type="text" placeholder="Joe"
                                    class="custom-input"
                                    required />
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Last name</label>
                                <input v-model="editUserForm.lastName" type="text" placeholder="Joe"
                                    class="custom-input"
                                    required />
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input v-model="editUserForm.email" type="email" placeholder="Joe"
                                class="custom-input"
                                required />
                        </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                <input v-model="editUserForm.phone" type="tel" placeholder="Joe"
                                    class="custom-input"
                                    required />
                            </div>

                            <div>
                                 <UiSelectInput label="Site Location" :options="siteLocation" position="standalone" v-model="editUserForm.location" />
                            </div>

                        <div>
                             <UiSelectInput label="Roles" :options="roles" position="standalone" v-model="editUserForm.role" />
                        </div>

                        <div class="flex gap-3 pt-4">
                            <button type="button" @click="closeEditUserModal"
                                class="flex-1 px-6 py-3 border-[0.5px] border-gray-100 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">
                                Cancel
                            </button>
                            <button type="submit" :disabled="isSubmitting"
                                class="flex-1 px-6 py-3 bg-[#005B8F] text-white rounded-xl  transition-colors font-medium disabled:opacity-50">
                                {{ isSubmitting ? 'Saving...' : 'Save' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Teleport>

        <!-- Filter Modal -->
        <Teleport to="body">
            <div v-if="showFilterModal"
                class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
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
                            <label class="block text-sm font-medium text-gray-700 mb-2">Role</label>
                            <select v-model="filters.role"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                <option value="">All Roles</option>
                                <option value="Admin">Admin</option>
                                <option value="Auditor">Auditor</option>
                                <option value="Site Manager">Site Manager</option>
                                <option value="Lab Technician">Lab Technician</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
                            <select v-model="filters.location"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                <option value="">All Locations</option>
                                <option value="Ikeja medical centre">Ikeja medical centre</option>
                                <option value="Lagos General Hospital">Lagos General Hospital</option>
                                <option value="Yaba Medical Center">Yaba Medical Center</option>
                            </select>
                        </div>

                        <div class="flex gap-3 pt-4">
                            <button @click="applyFilters"
                                class="flex-1 bg-[#005B8F] text-white px-4 py-2 rounded-lg  transition-colors font-medium">
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
interface User {
    id: number
    name: string
    email: string
    location: string
    role: string
    phone?: string
    firstName?: string
    lastName?: string
}

interface AddUserForm {
    firstName: string
    lastName: string
    email: string
    phone: string
    location: string
    role: string
}

interface Filters {
    role: string
    location: string
}

const stats = ref({
    total: 24500,
    active: 24500,
    inactive: 24500,
    pending: 24500
})

const users = ref<User[]>([
    { id: 1, name: 'John Romans', email: 'johnromans@gmail.com', location: 'Ikeja medical centre', role: 'Admin', phone: '+234 800 0000' },
    { id: 2, name: 'John Romans', email: 'johnromans@gmail.com', location: 'Ikeja medical centre', role: 'Auditor', phone: '+234 800 0000' },
    { id: 3, name: 'John Romans', email: 'johnromans@gmail.com', location: 'Ikeja medical centre', role: 'Site Manager', phone: '+234 800 0000' },
    { id: 4, name: 'John Romans', email: 'johnromans@gmail.com', location: 'Ikeja medical centre', role: 'Lab Technician', phone: '+234 800 0000' },
    { id: 5, name: 'John Romans', email: 'johnromans@gmail.com', location: 'Ikeja medical centre', role: 'Site Manager', phone: '+234 800 0000' },
    { id: 6, name: 'John Romans', email: 'johnromans@gmail.com', location: 'Ikeja medical centre', role: 'Lab Technician', phone: '+234 800 0000' },
    { id: 7, name: 'John Romans', email: 'johnromans@gmail.com', location: 'Ikeja medical centre', role: 'Auditor', phone: '+234 800 0000' },
])

const showAddUserModal = ref(false)
const showEditUserModal = ref(false)
const showFilterModal = ref(false)
const isSubmitting = ref(false)

const addUserForm = ref<AddUserForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    role: ''
})

const editUserForm = ref<AddUserForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    role: ''
})

const currentEditUserId = ref<number | null>(null)

const filters = ref<Filters>({
    role: '',
    location: ''
})

const filteredUsers = computed(() => {
    let result = users.value

    if (filters.value.role) {
        result = result.filter(user => user.role === filters.value.role)
    }

    if (filters.value.location) {
        result = result.filter(user => user.location === filters.value.location)
    }

    return result
})
const roles = ref([
   'Supervisor',  'Admin', 'Auditor', 'Site Manager', 'Lab Technician', 'Supervisor'
])

const siteLocation = ref([
   'Ikeja medical Center',  'Ikeja medical Centre', 'Lagos General Hospital', 'Yaba Medical Center'
])

const getRoleBadgeClass = (role: string) => {
    const classes: Record<string, string> = {
        'Admin': 'bg-[#E4F3ED] text-[#007B2D]',
        'Auditor': 'bg-[#E4F3ED] text-[#007E2F]',
        'Site Manager': 'bg-[#EDF4FF] text-[#0056E2]',
        'Lab Technician': 'bg-[#F9ECE2] text-[#FF6800]'
    }
    return classes[role] || 'bg-gray-100 text-gray-700'
}

const openAddUserModal = () => {
    showAddUserModal.value = true
}

const closeAddUserModal = () => {
    showAddUserModal.value = false
    resetAddUserForm()
}

const resetAddUserForm = () => {
    addUserForm.value = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        role: ''
    }
}

const handleAddUser = async () => {
    isSubmitting.value = true
    try {
        // Your API call here
        // await $fetch('/api/users', { method: 'POST', body: addUserForm.value })

        const newUser: User = {
            id: users.value.length + 1,
            name: `${addUserForm.value.firstName} ${addUserForm.value.lastName}`,
            email: addUserForm.value.email,
            location: addUserForm.value.location,
            role: addUserForm.value.role,
            phone: addUserForm.value.phone
        }
        users.value.push(newUser)
        closeAddUserModal()
        alert('User created successfully!')
    } catch (error) {
        console.error('Error creating user:', error)
        alert('Failed to create user')
    } finally {
        isSubmitting.value = false
    }
}
const openEditUserModal = (user: User) => {
    currentEditUserId.value = user.id
    const nameParts = user.name.split(' ')
    editUserForm.value = {
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email: user.email,
        phone: user.phone || '',
        location: user.location,
        role: user.role
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
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        role: ''
    }
}
const handleEditUser = async () => {
    if (!currentEditUserId.value) return
    isSubmitting.value = true
    try {
        // Your API call here
        // await $fetch(/api/users/${currentEditUserId.value}, { method: 'PUT', body: editUserForm.value })
        const userIndex = users.value.findIndex(u => u.id === currentEditUserId.value)
        if (userIndex !== -1) {
            users.value[userIndex] = {
                ...users.value[userIndex],
                name: `${editUserForm.value.firstName} ${editUserForm.value.lastName}`,
                email: editUserForm.value.email,
                location: editUserForm.value.location,
                role: editUserForm.value.role,
                phone: editUserForm.value.phone
            }
        }

        closeEditUserModal()
        alert('User updated successfully!')
    } catch (error) {
        console.error('Error updating user:', error)
        alert('Failed to update user')
    } finally {
        isSubmitting.value = false
    }
}
const blockUser = async (user: User) => {
    if (confirm(`Are you sure you want to block ${user.name}?`)) {
        try {
            // Your API call here
            // await $fetch(/api/users/${user.id}/block, { method: 'POST' })
            alert(`${user.name} has been blocked`)
        } catch (error) {
            console.error('Error blocking user:', error)
            alert('Failed to block user')
        }
    }
}
const unblockUser = async (user: User) => {
    try {
        // Your API call here
        // await $fetch(/api/users/${user.id}/unblock, { method: 'POST' })
        alert(`${user.name} has been unblocked`)
    } catch (error) {
        console.error('Error unblocking user:', error)
        alert('Failed to unblock user')
    }
}
const activateUser = async (user: User) => {
    try {
        // Your API call here
        // await $fetch(/api/users/${user.id}/activate, { method: 'POST' })
        alert(`${user.name} has been activated`)
    } catch (error) {
        console.error('Error activating user:', error)
        alert('Failed to activate user')
    }
}
const exportUsers = () => {
    const csv = [
        ['SN', 'Name', 'Email', 'Location', 'Role', 'Phone'],
        ...filteredUsers.value.map((u, i) => [
            i + 1,
            u.name,
            u.email,
            u.location,
            u.role,
            u.phone || ''
        ])
    ].map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'users.csv'
    a.click()
    window.URL.revokeObjectURL(url)
}
const applyFilters = () => {
    showFilterModal.value = false
}
const resetFilters = () => {
    filters.value = {
        role: '',
        location: ''
    }
    showFilterModal.value = false
}

const userStats = {
  total: 24500,
  active: 18200,
  inactive: 5100,
  pending: 1200
}
</script>