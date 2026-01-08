<template>
  <div class="min-h-screen">
    <!-- Header -->
    <div class="rounded-xl bg-[#DCF1FF] py-4">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <h1 class="text-xl font-semibold bg-[#DCF1FF] text-[#005B8F]">Create Attributes</h1>
        <p class="mt-2 text-base bg-[#DCF1FF] text-[#005B8F]">Manage categories, sites, freezers, racks, boxes, templates, and
          custom fields</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="">
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Category
            </button>
          </div>

          <div v-if="loadingCategories" class="text-center py-12">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#005B8F]"></div>
          </div>

          <div v-else-if="categories.length === 0" class="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p class="text-gray-500">No categories found. Create your first category!</p>
          </div>

          <div v-else>
            <div class="bg-white shadow overflow-hidden sm:rounded-lg">
              <table class="min-w-full divide-y-[0.5px] divide-gray-100">
                <thead class="bg-gray-25">
                  <tr>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiration Days</th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y-[0.5px] divide-gray-100">
                  <tr v-for="category in paginatedCategories" :key="category.cat_id" class="hover:bg-gray-25">
                    <td class="px-6 py-6 whitespace-nowrap text-sm font-medium text-gray-900">{{ category.cat_id }}</td>
                    <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-900">{{ category.cat_name }}</td>
                    <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-500">
                      {{ category.days_to_expiration || 'N/A' }}
                    </td>
                    <td class="px-6 py-6 text-sm text-gray-500">{{ category.description }}</td>
                    <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-500">{{ formatDate(category.created_at) }}</td>
                    <td class="px-6 py-6 whitespace-nowrap text-sm">
                      <button @click="viewDetails('category', category)" class="text-[#005B8F] hover:text-blue-900 font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- Pagination -->
          <Pagination 
  :currentPage="categoryPagination.currentPage" 
  :totalItems="categories?.length || 0" 
  :pageSize="categoryPagination.itemsPerPage"
  @update:currentPage="(page) => categoryPagination.currentPage = page"
  @update:pageSize="(size) => categoryPagination.itemsPerPage = size"
/>
          </div>
        </div>

        <!-- Sites Tab -->
        <div v-if="activeTab === 'sites'" class="space-y-6">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold text-gray-900">Sites</h2>
            <button @click="openCreateModal('site')"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#005B8F] hover:bg-blue-700">
              <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Site
            </button>
          </div>

          <div v-if="loadingSites" class="text-center py-12">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#005B8F]"></div>
          </div>

          <div v-else-if="sites.length === 0" class="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p class="text-gray-500">No sites found. Create your first site!</p>
          </div>

          <div v-else>
            <div class="bg-white shadow overflow-hidden sm:rounded-lg">
              <table class="min-w-full divide-y-[0.5px] divide-gray-100">
                <thead class="bg-gray-25">
                  <tr>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y-[0.5px] divide-gray-100">
                  <tr v-for="site in paginatedSites" :key="site.site_id" class="hover:bg-gray-25">
                    <td class="px-6 py-6 whitespace-nowrap text-sm font-medium text-gray-900">{{ site.site_id }}</td>
                    <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-900">{{ site.site_name }}</td>
                    <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-500">{{ site.location }}</td>
                    <td class="px-6 py-6 text-sm text-gray-500">{{ site.description }}</td>
                    <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-500">{{ formatDate(site.created_at) }}</td>
                    <td class="px-6 py-6 whitespace-nowrap text-sm">
                      <button @click="viewDetails('site', site)" class="text-[#005B8F] hover:text-blue-900 font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
         <Pagination 
  :currentPage="sitePagination.currentPage" 
  :totalItems="sites?.length || 0" 
  :pageSize="sitePagination.itemsPerPage"
  @update:currentPage="(page) => sitePagination.currentPage = page"
  @update:pageSize="(size) => sitePagination.itemsPerPage = size"
/>
          </div>
        </div>

        <!-- Freezers Tab -->
        <div v-if="activeTab === 'freezers'" class="space-y-6">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold text-gray-900">Freezers</h2>
            <button @click="openCreateModal('freezer')"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#005B8F] hover:bg-blue-700">
              <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Freezer
            </button>
          </div>

          <div v-if="loadingFreezers" class="text-center py-12">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#005B8F]"></div>
          </div>

          <div v-else-if="freezers.length === 0" class="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p class="text-gray-500">No freezers found. Create your first freezer!</p>
          </div>

          <div v-else>
            <div class="bg-white shadow overflow-hidden sm:rounded-lg">
              <table class="min-w-full divide-y-[0.5px] divide-gray-100">
                <thead class="bg-gray-25">
                  <tr>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Site</th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temperature</th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y-[0.5px] divide-gray-100">
                  <tr v-for="freezer in paginatedFreezers" :key="freezer.freezer_id" class="hover:bg-gray-25">
                    <td class="px-6 py-6 whitespace-nowrap text-sm font-medium text-gray-900">{{ freezer.freezer_id }}</td>
                    <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-900">{{ freezer.freezer_name }}</td>
                    <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-500">{{ freezer.site_id }}</td>
                    <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-500">{{ freezer.temperature }}</td>
                    <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-500">{{ freezer.description }}</td>
                    <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-500">{{ freezer.capacity }}</td>
                    <td class="px-6 py-6 whitespace-nowrap text-sm">
                      <button @click="viewDetails('freezer', freezer)" class="text-[#005B8F] hover:text-blue-900 font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
         <Pagination 
  :currentPage="freezerPagination.currentPage" 
  :totalItems="freezers?.length || 0" 
  :pageSize="freezerPagination.itemsPerPage"
  @update:currentPage="(page) => freezerPagination.currentPage = page"
  @update:pageSize="(size) => freezerPagination.itemsPerPage = size"
/>
          </div>
        </div>

        <!-- Racks Tab -->
        <div v-if="activeTab === 'racks'" class="space-y-6">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold text-gray-900">Racks</h2>
            <button @click="openCreateModal('rack')"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#005B8F] hover:bg-blue-700">
              <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Rack
            </button>
          </div>

          <div v-if="loadingRacks" class="text-center py-12">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#005B8F]"></div>
          </div>

          <div v-else-if="racks.length === 0" class="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p class="text-gray-500">No racks found. Create your first rack!</p>
          </div>

          <div v-else>
            <div class="bg-white shadow overflow-hidden sm:rounded-lg">
              <table class="min-w-full divide-y-[0.5px] divide-gray-100">
                <thead class="bg-gray-25">
                  <tr>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Freezer</th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Site</th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y-[0.5px] divide-gray-100">
                  <tr v-for="rack in paginatedRacks" :key="rack.rack_id" class="hover:bg-gray-25">
                    <td class="px-6 py-6 whitespace-nowrap text-sm font-medium text-gray-900">{{ rack.rack_id }}</td>
                    <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-900">{{ rack.rack_name }}</td>
                    <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-500">{{ rack.freezer_id }}</td>
                    <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-500">{{ rack.site_id }}</td>
                    <td class="px-6 py-6 text-sm text-gray-500">{{ rack.description }}</td>
                    <td class="px-6 py-6 whitespace-nowrap text-sm">
                      <button @click="viewDetails('rack', rack)" class="text-[#005B8F] hover:text-blue-900 font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
         <Pagination 
  :currentPage="rackPagination.currentPage" 
  :totalItems="racks?.length || 0" 
  :pageSize="rackPagination.itemsPerPage"
  @update:currentPage="(page) => rackPagination.currentPage = page"
  @update:pageSize="(size) => rackPagination.itemsPerPage = size"
/>
          </div>
        </div>

        <!-- Boxes Tab -->
        <div v-if="activeTab === 'boxes'" class="space-y-6">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold text-gray-900">Boxes</h2>
            <button @click="openCreateModal('box')"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#005B8F] hover:bg-blue-700">
              <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Box
            </button>
          </div>

          <div v-if="loadingBoxes" class="text-center py-12">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#005B8F]"></div>
          </div>

          <div v-else-if="boxes.length === 0" class="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p class="text-gray-500">No boxes found. Create your first box!</p>
          </div>

          <div v-else>
            <div class="bg-white shadow overflow-hidden sm:rounded-lg">
              <table class="min-w-full divide-y-[0.5px] divide-gray-100">
                <thead class="bg-gray-25">
                  <tr>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rack</th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Freezer</th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Template</th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y-[0.5px] divide-gray-100">
                  <tr v-for="box in paginatedBoxes" :key="box.box_id" class="hover:bg-gray-25">
                    <td class="px-6 py-6 whitespace-nowrap text-sm font-medium text-gray-900">{{ box.box_id }}</td>
                    <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-900">{{ box.box_name }}</td>
                    <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-500">{{ box.rack_id }}</td>
                    <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-500">{{ box.freezer_id }}</td>
                    <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-500">{{ box.position_template_id }}</td>
                    <td class="px-6 py-6 whitespace-nowrap text-sm">
                      <button @click="viewDetails('box', box)" class="text-[#005B8F] hover:text-blue-900 font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
      <Pagination 
  :currentPage="boxPagination.currentPage" 
  :totalItems="boxes?.length || 0" 
  :pageSize="boxPagination.itemsPerPage"
  @update:currentPage="(page) => boxPagination.currentPage = page"
  @update:pageSize="(size) => boxPagination.itemsPerPage = size"
/>
          </div>
        </div>

        <!-- Templates Tab -->
        <div v-if="activeTab === 'templates'" class="space-y-6">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold text-gray-900">Position Templates</h2>
            <button @click="openCreateModal('template')"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#005B8F] hover:bg-blue-700">
              <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Template
            </button>
          </div>

          <div v-if="loadingTemplates" class="text-center py-12">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#005B8F]"></div>
          </div>

          <div v-else-if="templates.length === 0" class="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p class="text-gray-500">No templates found. Create your first template!</p>
          </div>

          <div v-else>
            <div class="bg-white shadow overflow-hidden sm:rounded-lg">
              <table class="min-w-full divide-y-[0.5px] divide-gray-100">
                <thead class="bg-gray-25">
                  <tr>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rows</th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Columns</th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Positions</th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y-[0.5px] divide-gray-100">
                  <tr v-for="template in paginatedTemplates" :key="template.template_id" class="hover:bg-gray-25">
                    <td class="px-6 py-6 whitespace-nowrap text-sm font-medium text-gray-900">{{ template.template_id }}</td>
                    <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-900">{{ template.template_name }}</td>
                    <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-500">{{ template.rows }}</td>
                    <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-500">{{ template.columns }}</td>
                    <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-500">{{ template.total_positions }}</td>
                    <td class="px-6 py-6 whitespace-nowrap text-sm">
                      <button @click="viewDetails('template', template)" class="text-[#005B8F] hover:text-blue-900 font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
           <Pagination 
  :currentPage="templatePagination.currentPage" 
  :totalItems="templatePagination.totalItems" 
  :pageSize="templatePagination.itemsPerPage"
  @update:currentPage="(page) => templatePagination.currentPage = page"
  @update:pageSize="(size) => templatePagination.itemsPerPage = size"
/>
          </div>
        </div>

        <!-- Custom Fields Tab -->
        <div v-if="activeTab === 'custom-fields'" class="space-y-6">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold text-gray-900">Custom Attributes</h2>
            <button @click="openCreateModal('custom-field')"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#005B8F] hover:bg-blue-700">
              <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Custom Field
            </button>
          </div>

          <div v-if="loadingCustomFields" class="text-center py-12">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#005B8F]"></div>
          </div>

          <div v-else-if="customFields.length === 0" class="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p class="text-gray-500">No custom fields found. Create your first custom field!</p>
          </div>

          <div v-else>
            <div class="bg-white shadow overflow-hidden sm:rounded-lg">
              <table class="min-w-full divide-y-[0.5px] divide-gray-100">
                <thead class="bg-gray-25">
                  <tr>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y-[0.5px] divide-gray-100">
                  <tr v-for="field in paginatedCustomFields" :key="field.attribute_id" class="hover:bg-gray-25">
                    <td class="px-6 py-6 whitespace-nowrap text-sm font-medium text-gray-900">{{ field.attribute_id }}</td>
                    <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-900">{{ field.attribute_name }}</td>
                    <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-500">{{ field.attribute_type }}</td>
                    <td class="px-6 py-6 whitespace-nowrap text-sm">
                      <span :class="field.is_required ? 'text-green-600' : 'text-gray-500'">
                        {{ field.is_required ? 'Yes' : 'No' }}
                      </span>
                    </td>
                    <td class="px-6 py-6 text-sm text-gray-500">{{ field.description }}</td>
                    <td class="px-6 py-6 whitespace-nowrap text-sm">
                      <button @click="viewDetails('custom-field', field)" class="text-[#005B8F] hover:text-blue-900 font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
        <Pagination 
  :currentPage="customFieldPagination.currentPage" 
  :totalItems="customFieldPagination.totalItems" 
  :pageSize="customFieldPagination.itemsPerPage"
  @update:currentPage="(page) => customFieldPagination.currentPage = page"
  @update:pageSize="(size) => customFieldPagination.itemsPerPage = size"
/>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Modal (Teleport) -->
    <Teleport to="body">
      <div v-if="showCreateModal" class="fixed bg-black/50 backdrop-blur-lg inset-0 z-[9999] overflow-y-auto"
        aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-250 bg-opacity-75 transition-opacity" @click="closeCreateModal"></div>

          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div
            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <h3 class="text-lg leading-6 font-semibold text-gray-900 mb-4" id="modal-title">
                    {{ getModalTitle() }}
                  </h3>

                  <!-- Category Form -->
                  <form v-if="modalType === 'category'" @submit.prevent="submitCategory" class="space-y-4">
                    <div>
                      <UiAnimatedInput v-model="categoryForm.cat_id" type="text" label="Category ID" required />
                    </div>
                    <div>
                      <UiAnimatedInput v-model="categoryForm.cat_name" type="text" label="Category Name" required />
                    </div>
                    <div>
                      <UiAnimatedInput v-model="categoryForm.expiration_days" type="number"
                        label="Expiration Days (Optional)" />
                    </div>
                    <div>
                      <UiAnimatedInput v-model="categoryForm.description" :rows="3" required type="textarea"
                        label="Description" />
                    </div>
                  </form>

                  <!-- Site Form -->
                  <form v-if="modalType === 'site'" @submit.prevent="submitSite" class="space-y-4">
                    <div>
                      <UiAnimatedInput v-model="siteForm.site_id" type="text" label="Site ID" required />
                    </div>
                    <div>
                      <UiAnimatedInput v-model="siteForm.site_name" type="text" label="Site Name" required />
                    </div>
                    <div>
                      <UiAnimatedInput v-model="siteForm.location" type="text" label="Location" required />
                    </div>
                    <div>
                      <UiAnimatedInput v-model="siteForm.contact_person" type="text" label="Contact Name" />
                    </div>
                    <div>
                      <UiAnimatedInput v-model="siteForm.contact_email" type="email" label="Contact Email" />
                    </div>
                    <div>
                      <UiAnimatedInput v-model="siteForm.contact_phone" type="tel" label="Contact Phone" />
                    </div>
                  </form>

                  <!-- Freezer Form -->
                  <form v-if="modalType === 'freezer'" @submit.prevent="submitFreezer" class="space-y-4">
                    <div>
                      <UiAnimatedInput v-model="freezerForm.freezer_id" type="text" label="Freezer ID" required />
                    </div>
                    <div>
                      <UiAnimatedInput v-model="freezerForm.freezer_name" type="text" label="Freezer Name" required />
                    </div>
                    <div>
                      <UiSelectInput v-model="freezerForm.site_id" :options="siteOptions" label="Site" required />
                    </div>
                    <div>
                      <UiAnimatedInput v-model="freezerForm.temperature" type="text" label="Temperature" required />
                    </div>
                    <div>
                      <UiAnimatedInput v-model="freezerForm.manufacturer" type="text" label="Manufacturer" />
                    </div>
                    <div>
                      <UiAnimatedInput v-model="freezerForm.model" type="text" label="Model" />
                    </div>
                    <div>
                      <UiAnimatedInput v-model="freezerForm.serial_number" type="text" label="Serial Number" />
                    </div>
                  </form>

                  <!-- Rack Form -->
                  <form v-if="modalType === 'rack'" @submit.prevent="submitRack" class="space-y-4">
                    <div>
                      <UiAnimatedInput v-model="rackForm.rack_id" type="text" label="Rack ID" required />
                    </div>
                    <div>
                      <UiAnimatedInput v-model="rackForm.rack_name" type="text" label="Rack Name" required />
                    </div>
                    <div>
                      <UiSelectInput v-model="rackForm.site_id" :options="siteOptions" label="Site" required />
                    </div>
                    <div>
                      <UiSelectInput label="Freezer" :options="freezerOptionsForRack" v-model="rackForm.freezer_id"
                        required :disabled="!rackForm.site_id || freezerOptionsForRack.length === 0" />
                    </div>
                    <div>
                      <UiAnimatedInput v-model="rackForm.capacity" type="number" label="Capacity" required />
                    </div>
                    <div>
                      <UiAnimatedInput v-model="rackForm.description" :rows="3" label="Description" type="textarea" />
                    </div>
                  </form>

                  <!-- Box Form -->
                  <form v-if="modalType === 'box'" @submit.prevent="submitBox" class="space-y-4">
                    <div>
                      <UiAnimatedInput v-model="boxForm.box_id" type="text" label="Box ID" required />
                    </div>
                    <div>
                      <UiAnimatedInput v-model="boxForm.box_name" type="text" label="Box Name" required />
                    </div>
                    <div>
                      <UiSelectInput v-model="boxForm.site_id" :options="siteOptions" label="Site" required />
                    </div>
                    <div>
                      <UiSelectInput v-model="boxForm.freezer_id" :options="freezerOptionsForBox" label="Freezer"
                        required :disabled="!boxForm.site_id || freezerOptionsForBox.length === 0" />
                    </div>
                    <div>
                      <UiSelectInput v-model="boxForm.rack_id" :options="rackOptionsForBox" label="Rack" required
                        :disabled="!boxForm.freezer_id || rackOptionsForBox.length === 0" />
                    </div>
                    <div>
                      <UiSelectInput v-model="boxForm.position_template_id" label="Position Template"
                        :options="templateOptions" required />
                    </div>
                    <div>
                      <UiAnimatedInput v-model="boxForm.box_type" type="text" label="Box Type" />
                    </div>
                    <div>
                      <UiAnimatedInput v-model="boxForm.manufacturer" type="text" label="Manufacturer" />
                    </div>
                    <div>
                      <UiAnimatedInput v-model="boxForm.model" type="text" label="Model" />
                    </div>
                  </form>

                  <!-- Template Form -->
                  <form v-if="modalType === 'template'" @submit.prevent="submitTemplate" class="space-y-4">
                    <div>
                      <UiAnimatedInput v-model="templateForm.template_id" type="text" label="Template ID" required />
                    </div>
                    <div>
                      <UiAnimatedInput v-model="templateForm.template_name" type="text" label="Template Name" required />
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <UiAnimatedInput v-model.number="templateForm.rows" type="number" label="Rows" required min="1" />
                      </div>
                      <div>
                        <UiAnimatedInput v-model.number="templateForm.columns" type="number" label="Columns" required
                          min="1" />
                      </div>
                    </div>
                    <div>
                      <UiAnimatedInput v-model.number="templateForm.total_positions" type="number"
                        label="Total Positions" readonly />
                    </div>
                    <div>
                      <UiAnimatedInput v-model="templateForm.description" :rows="3" label="Description" type="textarea" />
                    </div>
                  </form>

                  <!-- Custom Field Form -->
                  <form v-if="modalType === 'custom-field'" @submit.prevent="submitCustomField" class="space-y-4">
                    <div>
                      <UiAnimatedInput v-model="customFieldForm.attribute_id" type="text" label="Attribute ID" required />
                    </div>
                    <div>
                      <UiAnimatedInput v-model="customFieldForm.attribute_name" label="Attribute Name" type="text"
                        required />
                    </div>
                    <div>
                      <UiSelectInput v-model="customFieldForm.attribute_type" label="Attribute Type"
                        :options="customFieldTypeOptions" required />
                    </div>
                    <div>
                      <UiAnimatedInput v-model="customFieldForm.default_value" type="text"
                        label="Allowed Values (comma-separated)" />
                    </div>
                    <div class="flex items-center">
                      <input v-model="customFieldForm.is_required" type="checkbox"
                        class="h-4 w-4 text-[#005B8F] focus:ring-[#005B8F] border-gray-300 rounded" />
                      <label class="ml-2 block text-sm text-gray-700">Required field</label>
                    </div>
                    <div>
                      <UiAnimatedInput v-model="customFieldForm.description" :rows="3" required label="Description"
                        type="textarea" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
               <div class="bg-gray-25 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
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
                      class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-25 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005B8F] sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

        <Teleport to="body">
      <div v-if="showDetailsModal" class="fixed backdrop-blur-lg inset-0 z-[9999] overflow-y-auto"
           aria-labelledby="details-modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-250 bg-opacity-75 transition-opacity" @click="closeDetailsModal">
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
            <div class="bg-gray-25 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="button" @click="closeDetailsModal"
                      class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-25 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005B8F] sm:w-auto sm:text-sm">
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
import { ref, onMounted, computed, watch } from 'vue'
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
import { usePagination } from '@/composables/core/usePagination'

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

// Pagination states

// Pagination states


// Pagination - just simple reactive objects, NO computed inside
const categoryPagination = ref({
  currentPage: 1,
  itemsPerPage: 10
})

const sitePagination = ref({
  currentPage: 1,
  itemsPerPage: 10
})

const freezerPagination = ref({
  currentPage: 1,
  itemsPerPage: 10
})

const rackPagination = ref({
  currentPage: 1,
  itemsPerPage: 10
})

const boxPagination = ref({
  currentPage: 1,
  itemsPerPage: 10
})

const templatePagination = ref({
  currentPage: 1,
  itemsPerPage: 10
})

const customFieldPagination = ref({
  currentPage: 1,
  itemsPerPage: 10
})

// Paginated data computed properties
const paginatedCategories = computed(() => {
  const start = (categoryPagination.value.currentPage - 1) * categoryPagination.value.itemsPerPage
  const end = start + categoryPagination.value.itemsPerPage
  return categories.value?.slice(start, end) || []
})

const paginatedSites = computed(() => {
  const start = (sitePagination.value.currentPage - 1) * sitePagination.value.itemsPerPage
  const end = start + sitePagination.value.itemsPerPage
  return sites.value?.slice(start, end) || []
})

const paginatedFreezers = computed(() => {
  const start = (freezerPagination.value.currentPage - 1) * freezerPagination.value.itemsPerPage
  const end = start + freezerPagination.value.itemsPerPage
  return freezers.value?.slice(start, end) || []
})

const paginatedRacks = computed(() => {
  const start = (rackPagination.value.currentPage - 1) * rackPagination.value.itemsPerPage
  const end = start + rackPagination.value.itemsPerPage
  return racks.value?.slice(start, end) || []
})

const paginatedBoxes = computed(() => {
  const start = (boxPagination.value.currentPage - 1) * boxPagination.value.itemsPerPage
  const end = start + boxPagination.value.itemsPerPage
  return boxes.value?.slice(start, end) || []
})

const paginatedTemplates = computed(() => {
  const start = (templatePagination.value.currentPage - 1) * templatePagination.value.itemsPerPage
  const end = start + templatePagination.value.itemsPerPage
  return templates.value?.slice(start, end) || []
})

const paginatedCustomFields = computed(() => {
  const start = (customFieldPagination.value.currentPage - 1) * customFieldPagination.value.itemsPerPage
  const end = start + customFieldPagination.value.itemsPerPage
  return customFields.value?.slice(start, end) || []
})

// Form data
const categoryForm = ref({
  cat_id: '',
  cat_name: '',
  expiration_days: null as number | null,
  description: ''
})

const siteForm = ref({
  site_id: '',
  site_name: '',
  location: '',
  contact_person: '',
  contact_email: '',
  contact_phone: ''
})

const freezerForm = ref({
  freezer_id: '',
  freezer_name: '',
  site_id: '',
  temperature: '',
  manufacturer: '',
  model: '',
  serial_number: '',
})

const rackForm = ref({
  rack_id: '',
  rack_name: '',
  freezer_id: '',
  site_id: '',
  capacity: 0,
  description: ''
})

const boxForm = ref({
  box_id: '',
  box_name: '',
  rack_id: '',
  freezer_id: '',
  site_id: '',
  position_template_id: '',
  box_type: '',
  manufacturer: '',
  model: ''
})

const templateForm = ref({
  template_id: '',
  template_name: '',
  rows: 0,
  columns: 0,
  total_positions: 0,
  description: ''
})

const customFieldForm = ref({
  attribute_id: '',
  attribute_name: '',
  attribute_type: '',
  default_value: '',
  is_required: false,
  description: ''
})

// Computed options for dropdowns
const siteOptions = computed(() => {
  if (!sites.value || sites.value.length === 0) return []
  return sites.value.map((site: any) => ({
    value: site.site_id,
    label: site.site_name
  }))
})

const freezerOptionsForRack = computed(() => {
  if (!rackForm.value.site_id || !freezers.value) return []
  return freezers.value
    .filter((freezer: any) => freezer.site_id === rackForm.value.site_id)
    .map((freezer: any) => ({
      value: freezer.freezer_id,
      label: freezer.freezer_name
    }))
})

const freezerOptionsForBox = computed(() => {
  if (!boxForm.value.site_id || !freezers.value) return []
  return freezers.value
    .filter((freezer: any) => freezer.site_id === boxForm.value.site_id)
    .map((freezer: any) => ({
      value: freezer.freezer_id,
      label: freezer.freezer_name
    }))
})

const rackOptionsForBox = computed(() => {
  if (!boxForm.value.freezer_id || !boxForm.value.site_id || !racks.value) return []
  return racks.value
    .filter((rack: any) => rack.freezer_id === boxForm.value.freezer_id && rack.site_id === boxForm.value.site_id)
    .map((rack: any) => ({
      value: rack.rack_id,
      label: rack.rack_name
    }))
})

const templateOptions = computed(() => {
  if (!templates.value || templates.value.length === 0) return []
  return templates.value.map((template: any) => ({
    value: template.template_id,
    label: `${template.template_name} (${template.rows}x${template.columns})`
  }))
})

const customFieldTypeOptions = computed(() => {
  return [
    { value: 'string', label: 'String' },
    { value: 'number', label: 'Number' },
    { value: 'boolean', label: 'Boolean' },
    { value: 'date', label: 'Date' }
  ]
})

// Watchers for cascading dropdowns
watch(() => rackForm.value.site_id, (newSiteId) => {
  if (newSiteId) {
    // Reset freezer when site changes
    rackForm.value.freezer_id = ''
  }
})

watch(() => boxForm.value.site_id, (newSiteId) => {
  if (newSiteId) {
    // Reset dependent fields when site changes
    boxForm.value.freezer_id = ''
    boxForm.value.rack_id = ''
  }
})

watch(() => boxForm.value.freezer_id, (newFreezerId) => {
  if (newFreezerId) {
    // Reset rack when freezer changes
    boxForm.value.rack_id = ''
  }
})

// Watch template rows and columns for auto-calculation
watch([() => templateForm.value.rows, () => templateForm.value.columns], ([rows, columns]) => {
  templateForm.value.total_positions = rows * columns
})

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
  categoryForm.value = { cat_id: '', cat_name: '', expiration_days: null, description: '' }
  siteForm.value = { site_id: '', site_name: '', location: '', contact_person: '', contact_email: '', contact_phone: '' }
  freezerForm.value = { freezer_id: '', freezer_name: '', site_id: '', temperature: '', manufacturer: '', model: '', serial_number: '' }
  rackForm.value = { rack_id: '', rack_name: '', freezer_id: '', site_id: '', description: '', capacity: 0 }
  boxForm.value = { box_id: '', box_name: '', rack_id: '', freezer_id: '', site_id: '', position_template_id: '', box_type: '', manufacturer: '', model: '' }
  templateForm.value = { template_id: '', template_name: '', rows: 0, columns: 0, total_positions: 0, description: '' }
  customFieldForm.value = { attribute_id: '', attribute_name: '', attribute_type: '', default_value: '', is_required: false, description: '' }
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
  
  // Build payload - only include expiration_days if it has a value
  const payload: any = {
    cat_id: categoryForm.value.cat_id,
    cat_name: categoryForm.value.cat_name,
    description: categoryForm.value.description
  }
  
  // Only add expiration_days if it's not null/empty
  if (categoryForm.value.expiration_days !== null && categoryForm.value.expiration_days !== '') {
    payload.days_to_expiration = categoryForm.value.expiration_days
  }
  
  const result = await createCategory(payload)
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
  const allowed = customFieldForm.value.default_value
    .split(',')
    .map(v => v.trim())
    .filter(v => v)

  const payload = {
    ...customFieldForm.value,
    default_value: allowed
  }

  const result = await createCustomField(payload)
  if (result) {
    closeCreateModal()
    await getCustomFields()
  }
  isSubmitting.value = false
}

// Helper functions
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