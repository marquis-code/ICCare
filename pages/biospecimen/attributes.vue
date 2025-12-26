<template>
    <div class="min-h-screen">
        <!-- Header -->
        <div class="bg-white">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <h1 class="text-2xl font-bold text-gray-900">Attributes Management</h1>
                <p class="mt-2 text-sm text-gray-600">Manage categories, sites, freezers, racks, boxes, templates, and
                    custom fields</p>
            </div>
        </div>

        <!-- Main Content -->
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Tabs -->
            <div class="border-b border-gray-200">
                <nav class="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
                    <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
                        activeTab === tab.id
                            ? 'border-[#005B8F] text-[#005B8F]'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                        'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-base transition-colors'
                    ]">
                        {{ tab.name }}
                    </button>
                </nav>
            </div>

            <!-- Tab Content -->
            <div class="mt-8">
                <!-- Categories Tab -->
                <div v-if="activeTab === 'categories'" class="space-y-6">
                    <div class="flex justify-between items-center">
                        <h2 class="text-xl font-semibold text-gray-900">Categories</h2>
                        <button @click="openCreateModal('category')"
                            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#005B8F] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005B8F]">
                            <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4v16m8-8H4" />
                            </svg>
                            Add Category
                        </button>
                    </div>

                    <div v-if="loadingCategories" class="text-center py-12">
                        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#005B8F]"></div>
                    </div>

                    <div v-else-if="categories.length === 0"
                        class="text-center py-12 bg-white rounded-lg border border-gray-200">
                        <p class="text-gray-500">No categories found. Create your first category!</p>
                    </div>

                    <div v-else class="bg-white shadow overflow-hidden sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ID</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Abbreviation</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Description</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Created At</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="category in categories" :key="category.cat_id" class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{
                                        category.cat_id }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ category.cat_name
                                        }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{
                                        category.abbreviation }}</td>
                                    <td class="px-6 py-4 text-sm text-gray-500">{{ category.description }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{
                                        formatDate(category.created_at) }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                                        <button @click="viewDetails('category', category)"
                                            class="text-[#005B8F] hover:text-blue-900 font-medium">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Sites Tab -->
                <div v-if="activeTab === 'sites'" class="space-y-6">
                    <div class="flex justify-between items-center">
                        <h2 class="text-xl font-semibold text-gray-900">Sites</h2>
                        <button @click="openCreateModal('site')"
                            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#005B8F] hover:bg-blue-700">
                            <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4v16m8-8H4" />
                            </svg>
                            Add Site
                        </button>
                    </div>

                    <div v-if="loadingSites" class="text-center py-12">
                        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#005B8F]"></div>
                    </div>

                    <div v-else-if="sites.length === 0"
                        class="text-center py-12 bg-white rounded-lg border border-gray-200">
                        <p class="text-gray-500">No sites found. Create your first site!</p>
                    </div>

                    <div v-else class="bg-white shadow overflow-hidden sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ID</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Location</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Description</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Created At</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="site in sites" :key="site.site_id" class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{
                                        site.site_id }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ site.site_name }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ site.location }}
                                    </td>
                                    <td class="px-6 py-4 text-sm text-gray-500">{{ site.description }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{
                                        formatDate(site.created_at) }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                                        <button @click="viewDetails('site', site)"
                                            class="text-[#005B8F] hover:text-blue-900 font-medium">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Freezers Tab -->
                <div v-if="activeTab === 'freezers'" class="space-y-6">
                    <div class="flex justify-between items-center">
                        <h2 class="text-xl font-semibold text-gray-900">Freezers</h2>
                        <button @click="openCreateModal('freezer')"
                            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#005B8F] hover:bg-blue-700">
                            <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4v16m8-8H4" />
                            </svg>
                            Add Freezer
                        </button>
                    </div>

                    <div v-if="loadingFreezers" class="text-center py-12">
                        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#005B8F]"></div>
                    </div>

                    <div v-else-if="freezers.length === 0"
                        class="text-center py-12 bg-white rounded-lg border border-gray-200">
                        <p class="text-gray-500">No freezers found. Create your first freezer!</p>
                    </div>

                    <div v-else class="bg-white shadow overflow-hidden sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ID</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Site</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Temperature</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Capacity</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="freezer in freezers" :key="freezer.freezer_id" class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{
                                        freezer.freezer_id }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{
                                        freezer.freezer_name }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ freezer.site_id }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ freezer.temperature
                                        }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ freezer.capacity }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                                        <button @click="viewDetails('freezer', freezer)"
                                            class="text-[#005B8F] hover:text-blue-900 font-medium">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Racks Tab -->
                <div v-if="activeTab === 'racks'" class="space-y-6">
                    <div class="flex justify-between items-center">
                        <h2 class="text-xl font-semibold text-gray-900">Racks</h2>
                        <button @click="openCreateModal('rack')"
                            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#005B8F] hover:bg-blue-700">
                            <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4v16m8-8H4" />
                            </svg>
                            Add Rack
                        </button>
                    </div>

                    <div v-if="loadingRacks" class="text-center py-12">
                        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#005B8F]"></div>
                    </div>

                    <div v-else-if="racks.length === 0"
                        class="text-center py-12 bg-white rounded-lg border border-gray-200">
                        <p class="text-gray-500">No racks found. Create your first rack!</p>
                    </div>

                    <div v-else class="bg-white shadow overflow-hidden sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ID</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Freezer</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Site</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Description</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="rack in racks" :key="rack.rack_id" class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{
                                        rack.rack_id }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ rack.rack_name }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ rack.freezer_id }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ rack.site_id }}
                                    </td>
                                    <td class="px-6 py-4 text-sm text-gray-500">{{ rack.description }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                                        <button @click="viewDetails('rack', rack)"
                                            class="text-[#005B8F] hover:text-blue-900 font-medium">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Boxes Tab -->
                <div v-if="activeTab === 'boxes'" class="space-y-6">
                    <div class="flex justify-between items-center">
                        <h2 class="text-xl font-semibold text-gray-900">Boxes</h2>
                        <button @click="openCreateModal('box')"
                            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#005B8F] hover:bg-blue-700">
                            <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4v16m8-8H4" />
                            </svg>
                            Add Box
                        </button>
                    </div>

                    <div v-if="loadingBoxes" class="text-center py-12">
                        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#005B8F]"></div>
                    </div>

                    <div v-else-if="boxes.length === 0"
                        class="text-center py-12 bg-white rounded-lg border border-gray-200">
                        <p class="text-gray-500">No boxes found. Create your first box!</p>
                    </div>

                    <div v-else class="bg-white shadow overflow-hidden sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ID</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Rack</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Freezer</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Template</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="box in boxes" :key="box.box_id" class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{
                                        box.box_id }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ box.box_name }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ box.rack_id }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ box.freezer_id }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{
                                        box.position_template_id }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                                        <button @click="viewDetails('box', box)"
                                            class="text-[#005B8F] hover:text-blue-900 font-medium">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Templates Tab -->
                <div v-if="activeTab === 'templates'" class="space-y-6">
                    <div class="flex justify-between items-center">
                        <h2 class="text-xl font-semibold text-gray-900">Position Templates</h2>
                        <button @click="openCreateModal('template')"
                            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#005B8F] hover:bg-blue-700">
                            <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4v16m8-8H4" />
                            </svg>
                            Add Template
                        </button>
                    </div>

                    <div v-if="loadingTemplates" class="text-center py-12">
                        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#005B8F]"></div>
                    </div>

                    <div v-else-if="templates.length === 0"
                        class="text-center py-12 bg-white rounded-lg border border-gray-200">
                        <p class="text-gray-500">No templates found. Create your first template!</p>
                    </div>

                    <div v-else class="bg-white shadow overflow-hidden sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ID</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Rows</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Columns</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Total Positions</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="template in templates" :key="template.template_id" class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{
                                        template.template_id }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{
                                        template.template_name }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ template.rows }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ template.columns }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{
                                        template.total_positions }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                                        <button @click="viewDetails('template', template)"
                                            class="text-[#005B8F] hover:text-blue-900 font-medium">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Custom Fields Tab -->
                <div v-if="activeTab === 'custom-fields'" class="space-y-6">
                    <div class="flex justify-between items-center">
                        <h2 class="text-xl font-semibold text-gray-900">Custom Attributes</h2>
                        <button @click="openCreateModal('custom-field')"
                            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#005B8F] hover:bg-blue-700">
                            <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4v16m8-8H4" />
                            </svg>
                            Add Custom Field
                        </button>
                    </div>

                    <div v-if="loadingCustomFields" class="text-center py-12">
                        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#005B8F]"></div>
                    </div>

                    <div v-else-if="customFields.length === 0"
                        class="text-center py-12 bg-white rounded-lg border border-gray-200">
                        <p class="text-gray-500">No custom fields found. Create your first custom field!</p>
                    </div>

                    <div v-else class="bg-white shadow overflow-hidden sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ID</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Type</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Required</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Description</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="field in customFields" :key="field.attribute_id" class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{
                                        field.attribute_id }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{
                                        field.attribute_name }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{
                                        field.attribute_type }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                                        <span :class="field.is_required ? 'text-green-600' : 'text-gray-500'">
                                            {{ field.is_required ? 'Yes' : 'No' }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 text-sm text-gray-500">{{ field.description }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                                        <button @click="viewDetails('custom-field', field)"
                                            class="text-[#005B8F] hover:text-blue-900 font-medium">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- Create Modal (Teleport) -->
        <Teleport to="body">
            <div v-if="showCreateModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title"
                role="dialog" aria-modal="true">
                <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeCreateModal">
                    </div>

                    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                    <div
                        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div class="sm:flex sm:items-start">
                                <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                    <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-title">
                                        {{ getModalTitle() }}
                                    </h3>

                                    <!-- Category Form -->
                                    <form v-if="modalType === 'category'" @submit.prevent="submitCategory"
                                        class="space-y-4">
                                        <div>
                                            <UiAnimatedInput v-model="categoryForm.cat_id" type="text"
                                                label="Category ID" />
                                        </div>
                                        <div>
                                            <UiAnimatedInput v-model="categoryForm.cat_name" type="text"
                                                label="Category Name" />
                                        </div>
                                        <div>
                                            <UiAnimatedInput v-model="categoryForm.abbreviation" type="text"
                                                label="Abbreviation" />
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700">Description *</label>
                                            <textarea v-model="categoryForm.description" rows="3" required
                                                class="custom-input"></textarea>
                                        </div>
                                    </form>

                                    <!-- Site Form -->
                                    <form v-if="modalType === 'site'" @submit.prevent="submitSite" class="space-y-4">
                                        <div>
                                            <UiAnimatedInput v-model="siteForm.site_id" type="text" label="Site ID" />
                                        </div>
                                        <div>
                                            <UiAnimatedInput v-model="siteForm.site_name" type="text"
                                                label="Site Name" />
                                        </div>
                                        <div>
                                            <UiAnimatedInput v-model="siteForm.location" type="text" label="Location" />
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700">Description *</label>
                                            <textarea v-model="siteForm.description" rows="3"
                                                class="custom-input"></textarea>
                                        </div>
                                    </form>

                                    <!-- Freezer Form -->
                                    <form v-if="modalType === 'freezer'" @submit.prevent="submitFreezer"
                                        class="space-y-4">
                                        <div>
                                            <UiAnimatedInput v-model="freezerForm.freezer_id" type="text"
                                                label="Freezer ID" />
                                        </div>
                                        <div>
                                            <UiAnimatedInput v-model="freezerForm.freezer_name" type="text"
                                                label="Freezer Name" />
                                        </div>
                                        <div>
                                            <UiSelectInput v-model="freezerForm.site_id" :options="sites"
                                                label="Site" />
                                        </div>
                                        <div>
                                            <UiAnimatedInput v-model="freezerForm.temperature" type="text"
                                                label="Temperature" />
                                        </div>
                                        <div>
                                            <UiAnimatedInput v-model.number="freezerForm.capacity" type="number"
                                                label="Capacity" />
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700">Description *</label>
                                            <textarea v-model="freezerForm.description" rows="3" required
                                                class="custom-input"></textarea>
                                        </div>
                                    </form>

                                    <!-- Rack Form -->
                                    <form v-if="modalType === 'rack'" @submit.prevent="submitRack" class="space-y-4">
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700">Rack ID *</label>
                                            <UiAnimatedInput v-model="rackForm.rack_id" type="text" label="Rack ID" />
                                        </div>
                                        <div>
                                            <UiAnimatedInput v-model="rackForm.rack_name" type="text"
                                                label="Rack Name" />
                                        </div>
                                        <div>

                                            <UiSelectInput v-model="rackForm.site_id" :options="sites" label="Site"
                                                @change="loadFreezersForRack" />


                                        </div>
                                        <div>
                                            <UiSelectInput label="Freezer" :options="filteredFreezersForRack"
                                                v-model="rackForm.freezer_id" />
                                            <!-- <label class="block text-sm font-medium text-gray-700">Freezer *</label>
                      <select
                        v-model="rackForm.freezer_id"
                        required
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#005B8F] focus:border-[#005B8F] sm:text-sm"
                      >
                        <option value="">Select a freezer</option>
                        <option v-for="freezer in filteredFreezersForRack" :key="freezer.freezer_id" :value="freezer.freezer_id">
                          {{ freezer.freezer_name }}
                        </option>
                      </select> -->
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700">Description *</label>
                                            <textarea v-model="rackForm.description" rows="3" required
                                                class="custom-input"></textarea>
                                        </div>
                                    </form>

                                    <!-- Box Form -->
                                    <form v-if="modalType === 'box'" @submit.prevent="submitBox" class="space-y-4">
                                        <div>
                                            <UiAnimatedInput v-model="boxForm.box_id" type="text" label="Box ID"
                                                required />
                                        </div>
                                        <div>
                                            <UiAnimatedInput v-model="boxForm.box_name" type="text" label="Box Name"
                                                required />
                                        </div>
                                        <div>
                                            <UiSelectInput v-model="boxForm.site_id" :options="sites" label="Site"
                                                @change="loadFreezersForBox" />
                                            <!-- <label class="block text-sm font-medium text-gray-700">Site *</label>
                      <select
                        v-model="boxForm.site_id"
                        required
                        @change="loadFreezersForBox"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#005B8F] focus:border-[#005B8F] sm:text-sm"
                      >
                        <option value="">Select a site</option>
                        <option v-for="site in sites" :key="site.site_id" :value="site.site_id">
                          {{ site.site_name }}
                        </option>
                      </select> -->
                                        </div>
                                        <div>
                                            <UiSelectInput v-model="boxForm.freezer_id"
                                                :options="filteredFreezersForBox" label="Freezer"
                                                @change="loadRacksForBox" />
                                            <!-- <label class="block text-sm font-medium text-gray-700">Freezer *</label>
                      <select
                        v-model="boxForm.freezer_id"
                        required
                        @change="loadRacksForBox"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#005B8F] focus:border-[#005B8F] sm:text-sm"
                      >
                        <option value="">Select a freezer</option>
                        <option v-for="freezer in filteredFreezersForBox" :key="freezer.freezer_id" :value="freezer.freezer_id">
                          {{ freezer.freezer_name }}
                        </option>
                      </select> -->
                                        </div>
                                        <div>
                                            <UiSelectInput v-model="boxForm.rack_id" :options="filteredRacksForBox"
                                                label="Rack" />
                                            <!-- <label class="block text-sm font-medium text-gray-700">Rack *</label>
                      <select
                        v-model="boxForm.rack_id"
                        required
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#005B8F] focus:border-[#005B8F] sm:text-sm"
                      >
                        <option value="">Select a rack</option>
                        <option v-for="rack in filteredRacksForBox" :key="rack.rack_id" :value="rack.rack_id">
                          {{ rack.rack_name }}
                        </option>
                      </select> -->
                                        </div>
                                        <div>
                                            <UiSelectInput v-model="boxForm.position_template_id"
                                                label="Position Template" :options="templates">
                                                <!-- Custom option rendering in dropdown -->
                                                <template #default="{ option }">
                                                    {{ option.template_name }} ({{ option.rows }}x{{ option.columns }})
                                                </template>

                                                <!-- Custom selected value display -->
                                                <template #selected-label="{ option }">
                                                    {{ option.template_name }} ({{ option.rows }}x{{ option.columns }})
                                                </template>
                                            </UiSelectInput>
                                            <!-- <label class="block text-sm font-medium text-gray-700">Position Template *</label>
                      <select
                        v-model="boxForm.position_template_id"
                        required
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#005B8F] focus:border-[#005B8F] sm:text-sm"
                      >
                        <option value="">Select a template</option>
                        <option v-for="template in templates" :key="template.template_id" :value="template.template_id">
                          {{ template.template_name }} ({{ template.rows }}x{{ template.columns }})
                        </option>
                      </select> -->
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700">Description *</label>
                                            <textarea v-model="boxForm.description" rows="3" required
                                                class="custom-input"></textarea>
                                        </div>
                                    </form>

                                    <!-- Template Form -->
                                    <form v-if="modalType === 'template'" @submit.prevent="submitTemplate"
                                        class="space-y-4">
                                        <div>
                                            <UiAnimatedInput v-model="templateForm.template_id" type="text"
                                                label="Template ID" />
                                        </div>
                                        <div>
                                            <UiAnimatedInput v-model="templateForm.template_name" type="text"
                                                label="Template Name" />
                                        </div>
                                        <div class="grid grid-cols-2 gap-4">
                                            <div>
                                                <UiAnimatedInput v-model.number="templateForm.rows" type="number"
                                                    label="Rows" required min="1" @input="calculateTotalPositions" />

                                            </div>

                                            <div>
                                                <UiAnimatedInput v-model.number="templateForm.columns" type="number"
                                                    label="Columns" required min="1" @input="calculateTotalPositions" />
                                            </div>

                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700">Total
                                                Positions</label>
                                            <UiAnimatedInput v-model.number="templateForm.total_positions" type="number"
                                                label="Total Positions" readonly />
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700">Description *</label>
                                            <textarea v-model="templateForm.description" rows="3" required
                                                class="custom-input"></textarea>
                                        </div>
                                    </form>

                                    <!-- Custom Field Form -->
                                    <form v-if="modalType === 'custom-field'" @submit.prevent="submitCustomField"
                                        class="space-y-4">
                                        <div>
                                            <UiAnimatedInput v-model="customFieldForm.attribute_id" type="text"
                                                label="Attribute ID" />
                                        </div>
                                        <div>
                                            <UiAnimatedInput v-model="customFieldForm.attribute_name"
                                                label="Attribute Name" type="text" />
                                        </div>
                                        <div>
                                            <UiSelectInput v-model="customFieldForm.attribute_type"
                                                label="Attribute Type" :options="customFieldsDropdown" />
                                        </div>
                                        <div>
                                            <UiAnimatedInput v-model="customFieldForm.allowed_values_string" type="text"
                                                label="Allowed Values (comma-separated)" />
                                        </div>
                                        <div class="flex items-center">
                                            <input v-model="customFieldForm.is_required" type="checkbox"
                                                class="custom-checkbox" />
                                            <label class="ml-2 block text-sm text-gray-700">Required field</label>
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700">Description *</label>
                                            <textarea v-model="customFieldForm.description" rows="3" required
                                                class="custom-input"></textarea>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button type="button" @click="handleSubmit" :disabled="isSubmitting"
                                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#005B8F] text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005B8F] sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                                <span v-if="isSubmitting" class="flex items-center">
                                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none"
                                        viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                        </path>
                                    </svg>
                                    Creating...
                                </span>
                                <span v-else>Create</span>
                            </button>
                            <button type="button" @click="closeCreateModal" :disabled="isSubmitting"
                                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005B8F] sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Teleport>

        <!-- Details Modal (Teleport) -->
        <Teleport to="body">
            <div v-if="showDetailsModal" class="fixed inset-0 z-50 overflow-y-auto"
                aria-labelledby="details-modal-title" role="dialog" aria-modal="true">
                <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeDetailsModal">
                    </div>

                    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                    <div
                        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div class="sm:flex sm:items-start">
                                <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                    <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4"
                                        id="details-modal-title">
                                        {{ getDetailsTitle() }}
                                    </h3>

                                    <div v-if="selectedItem" class="space-y-3">
                                        <div v-for="(value, key) in selectedItem" :key="key"
                                            class="grid grid-cols-3 gap-4 py-2 border-b border-gray-200">
                                            <dt class="text-sm font-medium text-gray-500 capitalize">{{ formatKey(key)
                                                }}</dt>
                                            <dd class="text-sm text-gray-900 col-span-2">{{ formatValue(value) }}</dd>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button type="button" @click="closeDetailsModal"
                                class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005B8F] sm:w-auto sm:text-sm">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useCreateCategory } from '@/composables/modules/category/useCreateCategory'
import { useGetCategories } from '@/composables/modules/category/useGetCategories'
import { useCreateSite } from '@/composables/modules/sites/useCreateSite'
import { useGetSites } from '@/composables/modules/sites/useGetSites'
import { useCreateFreezer } from '@/composables/modules/freezer/useCreateFreezer'
import { useGetFreezers } from '@/composables/modules/freezer/useGetFreezers'
import { useCreateRack } from '@/composables/modules/racks/useCreateRack'
import { useGetRacks } from '@/composables/modules/racks/useGetRacks'
import { useCreateBox } from '@/composables/modules/box/useCreateBox'
import { useGetBoxes } from '@/composables/modules/box/useGetBoxes'
import { useCreateTemplate } from '@/composables/modules/template/useCreateTemplate'
import { useGetTemplates } from '@/composables/modules/template/useGetTemplates'
import { useCreateCustomField } from '@/composables/modules/custom-fields/useCreateCustomField'
import { useGetCustomFields } from '@/composables/modules/custom-fields/useGetCustomFields'

// Tabs
const tabs = [
    { id: 'categories', name: 'Categories' },
    { id: 'sites', name: 'Sites' },
    { id: 'freezers', name: 'Freezers' },
    { id: 'racks', name: 'Racks' },
    { id: 'boxes', name: 'Boxes' },
    { id: 'templates', name: 'Templates' },
    { id: 'custom-fields', name: 'Custom Fields' }
]

const activeTab = ref('categories')

// Composables
const { loading: loadingCategories, categories, getCategories } = useGetCategories()
const { loading: createCategoryLoading, createCategory } = useCreateCategory()
const { loading: loadingSites, sites, getSites } = useGetSites()
const { loading: createSiteLoading, createSite } = useCreateSite()
const { loading: loadingFreezers, freezers, getFreezers } = useGetFreezers()
const { loading: createFreezerLoading, createFreezer } = useCreateFreezer()
const { loading: loadingRacks, racks, getRacks } = useGetRacks()
const { loading: createRackLoading, createRack } = useCreateRack()
const { loading: loadingBoxes, boxes, getBoxes } = useGetBoxes()
const { loading: createBoxLoading, createBox } = useCreateBox()
const { loading: loadingTemplates, templates, getTemplates } = useGetTemplates()
const { loading: createTemplateLoading, createTemplate } = useCreateTemplate()
const { loading: loadingCustomFields, customFields, getCustomFields } = useGetCustomFields()
const { loading: createCustomFieldLoading, createCustomField } = useCreateCustomField()

// Modal states
const showCreateModal = ref(false)
const showDetailsModal = ref(false)
const modalType = ref('')
const isSubmitting = ref(false)
const selectedItem = ref<any>(null)

// Form data
const categoryForm = ref({
    cat_id: '',
    cat_name: '',
    abbreviation: '',
    description: ''
})

const customFieldsDropdown = ref([
    'string', 'number', 'boolean', 'date'
])

const siteForm = ref({
    site_id: '',
    site_name: '',
    location: '',
    description: ''
})

const freezerForm = ref({
    freezer_id: '',
    freezer_name: '',
    site_id: '',
    temperature: '',
    capacity: 0,
    description: ''
})

const rackForm = ref({
    rack_id: '',
    rack_name: '',
    freezer_id: '',
    site_id: '',
    description: ''
})

const boxForm = ref({
    box_id: '',
    box_name: '',
    rack_id: '',
    freezer_id: '',
    site_id: '',
    position_template_id: '',
    description: ''
})

const templateForm = ref({
    template_id: '',
    template_name: '',
    rows: 0,
    columns: 0,
    total_positions: 0,
    additional_props: {},
    description: ''
})

const customFieldForm = ref({
    attribute_id: '',
    attribute_name: '',
    attribute_type: '',
    allowed_values: [] as string[],
    allowed_values_string: '',
    is_required: false,
    description: ''
})

// Filtered data for cascading dropdowns
const filteredFreezersForRack = ref<any[]>([])
const filteredFreezersForBox = ref<any[]>([])
const filteredRacksForBox = ref<any[]>([])

// Load all data on mount
onMounted(async () => {
    await Promise.all([
        getCategories(),
        getSites(),
        getFreezers(),
        getRacks(),
        getBoxes(),
        getTemplates(),
        getCustomFields()
    ])
})

// Modal functions
const openCreateModal = (type: string) => {
    modalType.value = type
    showCreateModal.value = true
    resetForms()
}

const closeCreateModal = () => {
    showCreateModal.value = false
    modalType.value = ''
    resetForms()
}

const viewDetails = (type: string, item: any) => {
    modalType.value = type
    selectedItem.value = item
    showDetailsModal.value = true
}

const closeDetailsModal = () => {
    showDetailsModal.value = false
    selectedItem.value = null
}

const resetForms = () => {
    categoryForm.value = { cat_id: '', cat_name: '', abbreviation: '', description: '' }
    siteForm.value = { site_id: '', site_name: '', location: '', description: '' }
    freezerForm.value = { freezer_id: '', freezer_name: '', site_id: '', temperature: '', capacity: 0, description: '' }
    rackForm.value = { rack_id: '', rack_name: '', freezer_id: '', site_id: '', description: '' }
    boxForm.value = { box_id: '', box_name: '', rack_id: '', freezer_id: '', site_id: '', position_template_id: '', description: '' }
    templateForm.value = { template_id: '', template_name: '', rows: 0, columns: 0, total_positions: 0, additional_props: {}, description: '' }
    customFieldForm.value = { attribute_id: '', attribute_name: '', attribute_type: '', allowed_values: [], allowed_values_string: '', is_required: false, description: '' }
}

// Submit handlers
const handleSubmit = () => {
    switch (modalType.value) {
        case 'category':
            submitCategory()
            break
        case 'site':
            submitSite()
            break
        case 'freezer':
            submitFreezer()
            break
        case 'rack':
            submitRack()
            break
        case 'box':
            submitBox()
            break
        case 'template':
            submitTemplate()
            break
        case 'custom-field':
            submitCustomField()
            break
    }
}

const submitCategory = async () => {
    isSubmitting.value = true
    const result = await createCategory(categoryForm.value)
    if (result) {
        closeCreateModal()
        await getCategories()
    }
    isSubmitting.value = false
}

const submitSite = async () => {
    isSubmitting.value = true
    const result = await createSite(siteForm.value)
    if (result) {
        closeCreateModal()
        await getSites()
    }
    isSubmitting.value = false
}

const submitFreezer = async () => {
    isSubmitting.value = true
    const result = await createFreezer(freezerForm.value)
    if (result) {
        closeCreateModal()
        await getFreezers()
    }
    isSubmitting.value = false
}

const submitRack = async () => {
    isSubmitting.value = true
    const result = await createRack(rackForm.value)
    if (result) {
        closeCreateModal()
        await getRacks()
    }
    isSubmitting.value = false
}

const submitBox = async () => {
    isSubmitting.value = true
    const result = await createBox(boxForm.value)
    if (result) {
        closeCreateModal()
        await getBoxes()
    }
    isSubmitting.value = false
}

const submitTemplate = async () => {
    isSubmitting.value = true
    const result = await createTemplate(templateForm.value)
    if (result) {
        closeCreateModal()
        await getTemplates()
    }
    isSubmitting.value = false
}

const submitCustomField = async () => {
    isSubmitting.value = true
    const allowed = customFieldForm.value.allowed_values_string
        .split(',')
        .map(v => v.trim())
        .filter(v => v)

    const payload = {
        ...customFieldForm.value,
        allowed_values: allowed
    }

    const result = await createCustomField(payload)
    if (result) {
        closeCreateModal()
        await getCustomFields()
    }
    isSubmitting.value = false
}

// Helper functions
const loadFreezersForRack = () => {
    if (rackForm.value.site_id) {
        filteredFreezersForRack.value = freezers.value.filter(
            f => f.site_id === rackForm.value.site_id
        )
    } else {
        filteredFreezersForRack.value = []
    }
    rackForm.value.freezer_id = ''
}

const loadFreezersForBox = () => {
    if (boxForm.value.site_id) {
        filteredFreezersForBox.value = freezers.value.filter(
            f => f.site_id === boxForm.value.site_id
        )
    } else {
        filteredFreezersForBox.value = []
    }
    boxForm.value.freezer_id = ''
    boxForm.value.rack_id = ''
}

const loadRacksForBox = () => {
    if (boxForm.value.freezer_id && boxForm.value.site_id) {
        filteredRacksForBox.value = racks.value.filter(
            r => r.freezer_id === boxForm.value.freezer_id && r.site_id === boxForm.value.site_id
        )
    } else {
        filteredRacksForBox.value = []
    }
    boxForm.value.rack_id = ''
}

const calculateTotalPositions = () => {
    templateForm.value.total_positions = templateForm.value.rows * templateForm.value.columns
}

const getModalTitle = () => {
    const titles: Record<string, string> = {
        'category': 'Create New Category',
        'site': 'Create New Site',
        'freezer': 'Create New Freezer',
        'rack': 'Create New Rack',
        'box': 'Create New Box',
        'template': 'Create New Position Template',
        'custom-field': 'Create New Custom Attribute'
    }
    return titles[modalType.value] || 'Create'
}

const getDetailsTitle = () => {
    const titles: Record<string, string> = {
        'category': 'Category Details',
        'site': 'Site Details',
        'freezer': 'Freezer Details',
        'rack': 'Rack Details',
        'box': 'Box Details',
        'template': 'Template Details',
        'custom-field': 'Custom Field Details'
    }
    return titles[modalType.value] || 'Details'
}

const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

const formatKey = (key: string) => {
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

const formatValue = (value: any) => {
    if (value === null || value === undefined) return 'N/A'
    if (typeof value === 'boolean') return value ? 'Yes' : 'No'
    if (Array.isArray(value)) return value.join(', ')
    if (typeof value === 'object') return JSON.stringify(value, null, 2)
    if (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}T/)) {
        return formatDate(value)
    }
    return value
}

definePageMeta({
    layout: 'dashboard'
})
</script>