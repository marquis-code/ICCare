<template>
    <NuxtLayout name="dashboard">
        <div class="space-y-6">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <h1 class="text-3xl font-bold text-gray-900">User Management</h1>
                <button @click="openAddUserModal"
                    class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span class="font-medium">Add New User</span>
                </button>
            </div>

            <!-- Stats Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <!-- Total Users -->
                <div class="bg-white rounded-xl shadow-sm p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-sm font-medium text-gray-600">Total Users</h3>
                        <div class="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                    </div>
                    <p class="text-3xl font-bold text-gray-900">{{ stats.total.toLocaleString() }}</p>
                </div>

                <!-- Active Users -->
                <div class="bg-white rounded-xl shadow-sm p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-sm font-medium text-gray-600">Active Users</h3>
                        <div class="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <p class="text-3xl font-bold text-gray-900">{{ stats.active.toLocaleString() }}</p>
                </div>

                <!-- Inactive Users -->
                <div class="bg-white rounded-xl shadow-sm p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-sm font-medium text-gray-600">Inactive Users</h3>
                        <div class="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                        </div>
                    </div>
                    <p class="text-3xl font-bold text-gray-900">{{ stats.inactive.toLocaleString() }}</p>
                </div>

                <!-- Pending Users -->
                <div class="bg-white rounded-xl shadow-sm p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-sm font-medium text-gray-600">Pending Users</h3>
                        <div class="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                            <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <p class="text-3xl font-bold text-gray-900">{{ stats.pending.toLocaleString() }}</p>
                </div>
            </div>

            <!-- User Management Table -->
            <div class="bg-white rounded-xl shadow-sm p-6">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-lg font-semibold text-gray-900">User Management</h3>
                    <div class="flex items-center gap-3">
                        <button @click="showFilterModal = true"
                            class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                            <span class="text-sm font-medium">Filter</span>
                        </button>
                        <button @click="exportUsers"
                            class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            <span class="text-sm font-medium">Export</span>
                        </button>
                    </div>
                </div>

                <!-- Table -->
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class="border-b border-gray-200">
                                <th class="text-left py-4 px-4 text-sm font-semibold text-gray-700">SN</th>
                                <th class="text-left py-4 px-4 text-sm font-semibold text-gray-700">Name</th>
                                <th class="text-left py-4 px-4 text-sm font-semibold text-gray-700">Email</th>
                                <th class="text-left py-4 px-4 text-sm font-semibold text-gray-700">Location</th>
                                <th class="text-left py-4 px-4 text-sm font-semibold text-gray-700">Role</th>
                                <th class="text-left py-4 px-4 text-sm font-semibold text-gray-700">Actions</th>
                                <th class="text-left py-4 px-4 text-sm font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(user, index) in filteredUsers" :key="user.id"
                                class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <td class="py-4 px-4 text-sm text-gray-900">{{ index + 1 }}</td>
                                <td class="py-4 px-4 text-sm text-gray-900">{{ user.name }}</td>
                                <td class="py-4 px-4 text-sm text-gray-700">{{ user.email }}</td>
                                <td class="py-4 px-4">
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
                                <td class="py-4 px-4">
                                    <span class="px-3 py-1 rounded-full text-xs font-medium"
                                        :class="getRoleBadgeClass(user.role)">
                                        {{ user.role }}
                                    </span>
                                </td>
                                <td class="py-4 px-4">
                                    <div class="flex items-center gap-2">
                                        <button @click="unblockUser(user)"
                                            class="px-3 py-1 bg-green-50 text-green-700 rounded text-xs font-medium hover:bg-green-100 transition-colors">
                                            Unblock
                                        </button>
                                        <button @click="blockUser(user)"
                                            class="px-3 py-1 bg-red-50 text-red-700 rounded text-xs font-medium hover:bg-red-100 transition-colors">
                                            Block
                                        </button>
                                    </div>
                                </td>
                                <td class="py-4 px-4">
                                    <div class="flex items-center gap-3">
                                        <button @click="openEditUserModal(user)"
                                            class="text-gray-600 hover:text-blue-600 transition-colors" title="Edit">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <button @click="activateUser(user)"
                                            class="px-3 py-1 bg-green-50 text-green-700 rounded text-xs font-medium hover:bg-green-100 transition-colors">
                                            Activate
                                        </button>
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
                    <h2 class="text-2xl font-bold text-gray-900 mb-6">Add New User</h2>

                    <form @submit.prevent="handleAddUser" class="space-y-5">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">First name</label>
                                <input v-model="addUserForm.firstName" type="text" placeholder="Joe"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required />
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Last name</label>
                                <input v-model="addUserForm.lastName" type="text" placeholder="Joe"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required />
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input v-model="addUserForm.email" type="email" placeholder="Joe"
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required />
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                <input v-model="addUserForm.phone" type="tel" placeholder="Joe"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required />
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Site Location</label>
                                <select v-model="addUserForm.location"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required>
                                    <option value="">Ikeja medical Center</option>
                                    <option value="Ikeja medical Centre">Ikeja medical Centre</option>
                                    <option value="Lagos General Hospital">Lagos General Hospital</option>
                                    <option value="Yaba Medical Center">Yaba Medical Center</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Roles</label>
                            <select v-model="addUserForm.role"
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required>
                                <option value="">Supervisor</option>
                                <option value="Admin">Admin</option>
                                <option value="Auditor">Auditor</option>
                                <option value="Site Manager">Site Manager</option>
                                <option value="Lab Technician">Lab Technician</option>
                                <option value="Supervisor">Supervisor</option>
                            </select>
                        </div>

                        <div class="flex gap-3 pt-4">
                            <button type="button" @click="closeAddUserModal"
                                class="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                                Cancel
                            </button>
                            <button type="submit" :disabled="isSubmitting"
                                class="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50">
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
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required />
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Last name</label>
                                <input v-model="editUserForm.lastName" type="text" placeholder="Joe"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required />
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input v-model="editUserForm.email" type="email" placeholder="Joe"
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required />
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                <input v-model="editUserForm.phone" type="tel" placeholder="Joe"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required />
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Site Location</label>
                                <select v-model="editUserForm.location"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required>
                                    <option value="Ikeja medical Centre">Ikeja medical Centre</option>
                                    <option value="Lagos General Hospital">Lagos General Hospital</option>
                                    <option value="Yaba Medical Center">Yaba Medical Center</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Roles</label>
                            <select v-model="editUserForm.role"
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required>
                                <option value="Admin">Admin</option>
                                <option value="Auditor">Auditor</option>
                                <option value="Site Manager">Site Manager</option>
                                <option value="Lab Technician">Lab Technician</option>
                                <option value="Supervisor">Supervisor</option>
                            </select>
                        </div>

                        <div class="flex gap-3 pt-4">
                            <button type="button" @click="closeEditUserModal"
                                class="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                                Cancel
                            </button>
                            <button type="submit" :disabled="isSubmitting"
                                class="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50">
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
                                class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
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

const getRoleBadgeClass = (role: string) => {
    const classes: Record<string, string> = {
        'Admin': 'bg-green-100 text-green-700',
        'Auditor': 'bg-green-100 text-green-700',
        'Site Manager': 'bg-blue-100 text-blue-700',
        'Lab Technician': 'bg-orange-100 text-orange-700'
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
</script>