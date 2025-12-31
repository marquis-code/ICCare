<template>
  <NuxtLayout name="dashboard">
    <div class="min-h-screen">
      <!-- Main Content -->
      <div class="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <!-- Page Header -->
        <div class="sm:mb-8 rounded-xl bg-[#005B8F] px-6 md:px-8 py-4 mb-6">
          <h1 class="text-2xl font-semibold text-white">Reports & Analytics</h1>
          <p class="mt-2 text-base text-white">
            Generate, export, and schedule biosample reports. Monitor dashboard metrics and set up automated alerts.
          </p>
        </div>

        <!-- Dashboard Metrics Card -->
       <!-- Dashboard Metrics Card -->
<div v-if="dashboardData" class="mb-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
  <h2 class="text-lg font-medium text-gray-900 mb-4">Dashboard Overview</h2>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="text-center p-6 bg-blue-50 rounded-lg">
      <p class="text-3xl font-bold text-blue-900">{{ dashboardData.metrics?.total_records || 0 }}</p>
      <p class="text-sm text-gray-600 mt-2">Total Records</p>
    </div>
    <div class="text-center p-6 bg-green-50 rounded-lg">
      <p class="text-3xl font-bold text-green-900">{{ dashboardData.metrics?.new_records_last_24h || 0 }}</p>
      <p class="text-sm text-gray-600 mt-2">New Records (24h)</p>
    </div>
    <div class="text-center p-6 bg-purple-50 rounded-lg">
      <p class="text-3xl font-bold text-purple-900">{{ ((dashboardData.metrics?.data_quality_score || 0) * 100).toFixed(1) }}%</p>
      <p class="text-sm text-gray-600 mt-2">Data Quality Score</p>
    </div>
  </div>
  <div class="mt-4 flex items-center justify-between text-xs text-gray-500">
    <span>Scope: {{ dashboardData.metrics?.scope || 'N/A' }}</span>
    <span>Last Updated: {{ formatDateTime(dashboardData.timestamp) }}</span>
  </div>
</div>

        <!-- Filter & Dataset Selection Card -->
        <div class="mb-6">
          <div class="flex justify-between items-center pb-6">
            <h2 class="text-lg font-medium text-gray-900">
              Filter & Export Data
            </h2>
            <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-end">
              <button 
                @click="resetFilters"
                class="w-full sm:w-auto outline-none px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
                Reset Filters
              </button>
              <button 
                @click="refreshDashboard"
                :disabled="loading"
                class="w-full sm:w-auto outline-none px-6 py-2.5 bg-[#005B8F] text-white rounded-xl hover:bg-[#004a73] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                <span v-if="!loading">Refresh Dashboard</span>
                <span v-else class="flex items-center justify-center gap-2">
                  <LoadingSpinner size="sm" />
                  Loading...
                </span>
              </button>
            </div>
          </div>

          <!-- Filter Section -->
          <section class="bg-white rounded-xl p-6 space-y-4 shadow-sm border border-gray-100">
            <div>
              <DateRangePicker 
                v-model="dateRange" 
                label="Date Range" 
                placeholder="Select date range" 
              />
            </div>
            
            <div class="my-6">
              <MultiSelect 
                v-model="selectedDatasets" 
                :options="datasetOptions" 
                label="Select Datasets to Export"
                placeholder="Choose one or more datasets" 
                :searchable="true" 
                :select-all="true" 
              />
            </div>

            <!-- Filter Row -->
             <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <!-- Site ID Filter -->
              <div>
                                                            <UiSelectInput v-model="filters.site_id" :options="siteOptions" label="Site"
                                                 />
 
              </div>

              <!-- Freezer ID Filter -->
              <div>
                  <UiSelectInput v-model="filters.freezer_id"
                                                :options="freezerOptions" label="Freezer"
                                                />

              </div>
            </div>

            <!-- Action Buttons Row -->
            <div class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
              <button 
                @click="openExportModal"
                :disabled="selectedDatasets.length === 0"
                class="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export Data
              </button>

              <button 
                @click="openScheduleModal"
                class="flex items-center justify-center gap-2 px-4 py-3 bg-[#005b8f] text-white rounded-lg transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Schedule Report
              </button>
              
              <button 
                @click="openAlertsModal"
                class="flex items-center justify-center gap-2 px-4 py-3 bg-[#005B8F] text-white rounded-lg  transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                Check & Notify Alerts
              </button>

              <button 
                v-if="filters.freezer_id"
                @click="checkUtilization"
                :disabled="utilizationLoading"
                class="flex items-center justify-center gap-2 px-4 py-3 bg-[#005B8F] text-white rounded-lg  transition-colors disabled:opacity-50">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Check Utilization
              </button>
            </div>
          </section>

          <!-- Freezer Utilization Display -->
          <div v-if="utilizationData" class="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 shadow-sm border border-purple-100">
            <h3 class="text-lg font-medium text-gray-900 mb-4">
              Freezer Utilization: {{ utilizationData.freezer_id }}
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="bg-white rounded-lg p-4 shadow-sm">
                <p class="text-sm text-gray-600">Total Capacity</p>
                <p class="text-2xl font-bold text-gray-900">{{ utilizationData.capacity_total_units }} units</p>
              </div>
              <div class="bg-white rounded-lg p-4 shadow-sm">
                <p class="text-sm text-gray-600">Units Used</p>
                <p class="text-2xl font-bold text-blue-900">{{ utilizationData.units_used }} units</p>
              </div>
              <div class="bg-white rounded-lg p-4 shadow-sm">
                <p class="text-sm text-gray-600">Utilization</p>
                <p class="text-2xl font-bold" :class="getUtilizationColor(utilizationData.utilization_percentage)">
                  {{ utilizationData.utilization_percentage }}%
                </p>
              </div>
            </div>
          </div>

          <!-- Export Success Message -->
          <div v-if="exportData" class="mt-6 bg-green-50 border border-green-200 rounded-xl p-6">
            <div class="flex items-start gap-3">
              <svg class="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div class="flex-1">
                <h4 class="text-sm font-medium text-green-900">Export Completed Successfully</h4>
                <div class="mt-2 text-sm text-green-700 space-y-1">
                  <p><strong>Export ID:</strong> {{ exportData.export_id }}</p>
                  <p><strong>File Name:</strong> {{ exportData.file_name }}</p>
                  <p><strong>Format:</strong> {{ exportData.format?.toUpperCase() }}</p>
                  <p><strong>Total Records:</strong> {{ exportData.preview?.total_records || 0 }}</p>
                  <p><strong>File Size:</strong> {{ exportData.preview?.file_size_kb || 0 }} KB</p>
                  <p><strong>Requested By:</strong> {{ exportData.requested_by }}</p>
                  <p><strong>Timestamp:</strong> {{ formatDateTime(exportData.timestamp) }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Schedule Success Message -->
          <div v-if="scheduleData" class="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div class="flex items-start gap-3">
              <svg class="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div class="flex-1">
                <h4 class="text-sm font-medium text-blue-900">Report Scheduled Successfully</h4>
                <div class="mt-2 text-sm text-blue-700 space-y-1">
                  <p><strong>Schedule ID:</strong> {{ scheduleData.schedule_id }}</p>
                  <p><strong>Report Name:</strong> {{ scheduleData.report_name }}</p>
                  <p><strong>Frequency:</strong> {{ scheduleData.scheduled_period }}</p>
                  <p><strong>Next Run:</strong> {{ formatDateTime(scheduleData.next_run) }}</p>
                  <p><strong>Status:</strong> <span class="text-green-600 font-medium">Active</span></p>
                </div>
              </div>
            </div>
          </div>

          <!-- Alert Response Message -->
          <div v-if="alertResponse" class="mt-6 rounded-xl p-6" :class="alertResponse.alert_triggered ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'">
            <div class="flex items-start gap-3">
              <svg class="w-6 h-6 flex-shrink-0" :class="alertResponse.alert_triggered ? 'text-red-600' : 'text-green-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="alertResponse.alert_triggered" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div class="flex-1">
                <h4 class="text-sm font-medium" :class="alertResponse.alert_triggered ? 'text-red-900' : 'text-green-900'">
                  {{ alertResponse.alert_triggered ? 'Alert Triggered!' : 'All Clear' }}
                </h4>
                <div class="mt-2 text-sm space-y-1" :class="alertResponse.alert_triggered ? 'text-red-700' : 'text-green-700'">
                  <p><strong>Item:</strong> {{ alertResponse.item }}</p>
                  <p><strong>Current Value:</strong> {{ alertResponse.current_value }}</p>
                  <p><strong>Threshold:</strong> {{ alertResponse.threshold_value }}</p>
                  <p>{{ alertResponse.message }}</p>
                  <div v-if="alertResponse.alert_triggered && alertResponse.notification_sent">
                    <p class="mt-2"><strong>Alert ID:</strong> {{ alertResponse.alert_id }}</p>
                    <p><strong>Notification Sent:</strong> {{ formatDateTime(alertResponse.notification_details?.sent_at) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Export Modal -->
      <Teleport to="body">
        <div v-if="isExportModalOpen" class="fixed backdrop-blur-lg inset-0 z-[9999] overflow-y-auto">
          <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" @click="closeExportModal"></div>

            <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">Export Data</h3>
                    <div class="mt-4">
                      <p class="text-sm text-gray-500 mb-4">
                        Selected datasets: {{ selectedDatasets.join(', ') }}
                      </p>
                      <UiSelectInput :options="['excel', 'csv', 'json']" v-model="exportFormat" label="Select Export Format" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2">
                <button 
                  @click="handleExport"
                  :disabled="exportLoading"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50">
                  <span v-if="!exportLoading">Export</span>
                  <span v-else class="flex items-center gap-2">
                    <LoadingSpinner size="sm" />
                    Exporting...
                  </span>
                </button>
                <button 
                  @click="closeExportModal"
                  type="button"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </Teleport>

      <!-- Schedule Report Modal -->
      <Teleport to="body">
        <div v-if="isScheduleModalOpen" class="fixed backdrop-blur-lg inset-0 z-[9999] overflow-y-auto">
          <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" @click="closeScheduleModal"></div>

            <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">Schedule Report</h3>
                    <div class="mt-4 space-y-4">
                      <div>
                        <UiAnimatedInput
                          v-model="scheduleForm.report_name" 
                          type="text"
                          label="Report Name"
                          position="standalone"
                        />
                      </div>
                      
                      <div>
                        <UiSelectInput :options="['daily', 'weekly', 'monthly']" v-model="scheduleForm.scheduled_period" label="Frequency" />
                      </div>

                      <div>
                        <!-- <label class="block text-sm font-medium text-gray-700 mb-2">Recipient Emails (comma-separated)</label> -->
                        <UiAnimatedInput
                          v-model="scheduleForm.recipient_emails_text" 
                          :rows="2"
                          type="textarea"
                          label="Recipient Emails (comma-separated)"
                        />
                      </div>

                      <div>
                        <UiAnimatedInput
                          v-model="scheduleForm.recipient_roles_text" 
                          type="text"
                          label="Recipient Roles (comma-separated)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:px-6 w-full sm:flex sm:flex-row-reverse gap-2">
                <button 
                  @click="handleScheduleReport"
                  :disabled="scheduleLoading || !scheduleForm.report_name"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-3 bg-[#005B8F] text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2  sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50">
                  <span v-if="!scheduleLoading">Schedule</span>
                  <span v-else class="flex items-center gap-2">
                    <LoadingSpinner size="sm" />
                    Scheduling...
                  </span>
                </button>
                <button 
                  @click="closeScheduleModal"
                  type="button"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-3 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2  sm:mt-0 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </Teleport>

      <!-- Check & Notify Alerts Modal -->
      <Teleport to="body">
        <div v-if="isAlertsModalOpen" class="fixed backdrop-blur-lg inset-0 z-[9999] overflow-y-auto">
          <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" @click="closeAlertsModal"></div>

            <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg class="h-6 w-6 text-[#005b8f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">Check & Notify Alerts</h3>
                    <div class="mt-4 space-y-4">
                      <div>
                        <!-- <label class="block text-sm font-medium text-gray-700 mb-2">Item Name</label> -->
                        <UiAnimatedInput 
                          v-model="alertForm.item" 
                          type="text"
                          label="Item Name"
                        />
                      </div>
                      
                      <div>
                        <!-- <label class="block text-sm font-medium text-gray-700 mb-2">Units</label> -->
                        <UiAnimatedInput 
                          v-model="alertForm.units" 
                          type="text"
                          label="Units"
                        />
                      </div>

                      <div class="grid grid-cols-2 gap-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">Threshold Value</label>
                          <UiAnimatedInput 
                            v-model.number="alertForm.threshold_value" 
                            type="number"
                            label="Threshold Value"
                          />
                        </div>

                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">Current Value</label>
                          <UiAnimatedInput 
                            v-model.number="alertForm.current_value" 
                            type="number"
                            label="Current Value"
                          />
                        </div>
                      </div>

                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Admin Notes (optional)</label>
                        <UiAnimatedInput 
                          v-model="alertForm.admin_notes" 
                          label="Admin Notes (optional)"
                          :rows="2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2">
                <button 
                  @click="handleCheckAlerts"
                  :disabled="alertLoading || !alertForm.item || !alertForm.units"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#005B8F] text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2  sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50">
                  <span v-if="!alertLoading">Check & Notify</span>
                  <span v-else class="flex items-center gap-2">
                    <LoadingSpinner size="sm" />
                    Checking...
                  </span>
                </button>
                <button 
                  @click="closeAlertsModal"
                  type="button"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import MultiSelect, { type MultiSelectOption } from '~/components/MultiSelect.vue'
import { useGetDashboardData } from "@/composables/modules/reporting/useGetDashboardData"
import { useGetUtilizationLevel } from "@/composables/modules/reporting/useGetUtilizationLevel"
import { useScheduleReport } from "@/composables/modules/reporting/useScheduleReport"
import { useExportData } from "@/composables/modules/reporting/useExportData"
import { useCheckAndNotifyAlerts } from "@/composables/modules/reporting/useCheckAndNotifyAlerts"
import DateRangePicker, { type DateRange } from '~/components/DateRangePicker.vue'
import LoadingSpinner from '~/components/LoadingSpinner.vue'
import { useGetFreezers } from '@/composables/modules/freezer/useGetFreezers'
import { useGetSites } from "@/composables/modules/sites/useGetSites"

interface Filters {
  site_id: string
  freezer_id: string
}

// Composables
const { 
  loading, 
  dashboardData, 
  getDashboardData 
} = useGetDashboardData()

const { loading: loadingSites, sites, getSites } = useGetSites()
const { loading: loadingFreezers, freezers, getFreezers } = useGetFreezers()

const { 
  loading: utilizationLoading,
  utilizationData,
  getUtilizationLevel 
} = useGetUtilizationLevel()

const { 
  scheduleReport,
  loading: scheduleLoading,
  scheduleData
} = useScheduleReport()

const {
  exportData: exportDataFunc,
  loading: exportLoading,
  exportData
} = useExportData()

const {
  checkAndNotifyAlerts,
  loading: alertLoading,
  alertResponse
} = useCheckAndNotifyAlerts()

// State
const dateRange = ref<DateRange>({ from: '', to: '' })
const selectedDatasets = ref<string[]>([])
const filters = ref<Filters>({
  site_id: '',
  freezer_id: ''
})

const isExportModalOpen = ref(false)
const isScheduleModalOpen = ref(false)
const isAlertsModalOpen = ref(false)
const exportFormat = ref<'excel' | 'csv' | 'json'>('excel')

// Schedule Form
const scheduleForm = ref({
  report_name: '',
  scheduled_period: 'weekly' as 'daily' | 'weekly' | 'monthly',
  recipient_emails_text: '',
  recipient_roles_text: ''
})

// Alert Form
const alertForm = ref({
  item: '',
  units: '',
  threshold_value: 0,
  current_value: 0,
  admin_notes: ''
})

// Dataset Options
const datasetOptions: MultiSelectOption[] = [
  { value: 'samples', label: 'Samples' },
  { value: 'workflows', label: 'Workflows' },
  { value: 'freezer_inventory', label: 'Freezer Inventory' },
  { value: 'alerts', label: 'Alerts' },
  { value: 'audit_logs', label: 'Audit Logs' },
  { value: 'utilization_metrics', label: 'Utilization Metrics' },
  { value: 'chain_of_custody', label: 'Chain of Custody' }
]

// Methods
const formatDateTime = (dateString: string | undefined): string => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getUtilizationColor = (percentage: number): string => {
  if (percentage >= 90) return 'text-red-600'
  if (percentage >= 75) return 'text-orange-600'
  if (percentage >= 50) return 'text-yellow-600'
  return 'text-green-600'
}

const resetFilters = () => {
  filters.value = {
    site_id: '',
    freezer_id: ''
  }
  selectedDatasets.value = []
  dateRange.value = { from: '', to: '' }
  exportData.value = null
  scheduleData.value = null
  alertResponse.value = null
  utilizationData.value = null
  
  // Refetch global dashboard data
  getDashboardData()
}

const refreshDashboard = async () => {
  if (filters.value.site_id && filters.value.site_id !== 'All Sites') {
    const selectedSite = sites.value?.find((site: any) => site.site_name === filters.value.site_id)
    if (selectedSite) {
      await getDashboardData(selectedSite.site_id)
      return
    }
  }
  
  await getDashboardData()
}

// const checkUtilization = async () => {
//   if (!filters.value.freezer_id) {
//     alert('Please enter a Freezer ID')
//     return
//   }
  
//   await getUtilizationLevel(filters.value.freezer_id)
// }

const checkUtilization = async () => {
  if (!filters.value.freezer_id) {
    alert('Please select a Freezer')
    return
  }
  
  // Find the actual freezer_id from the freezers array
  const selectedFreezer = freezers.value?.find((freezer: any) => freezer.freezer_name === filters.value.freezer_id)
  if (selectedFreezer) {
    await getUtilizationLevel(selectedFreezer.freezer_id)
  }
}

// Export Modal Methods
const openExportModal = () => {
  if (selectedDatasets.value.length === 0) {
    alert('Please select at least one dataset to export')
    return
  }
  isExportModalOpen.value = true
}

const closeExportModal = () => {
  isExportModalOpen.value = false
  exportFormat.value = 'excel'
}

const handleExport = async () => {
  try {
    await exportDataFunc({
      items_to_export: selectedDatasets.value,
      format: exportFormat.value
    })
    
    closeExportModal()
  } catch (error) {
    console.error('Export error:', error)
  }
}

// Schedule Modal Methods
const openScheduleModal = () => {
  isScheduleModalOpen.value = true
}

const closeScheduleModal = () => {
  isScheduleModalOpen.value = false
  scheduleForm.value = {
    report_name: '',
    scheduled_period: 'weekly',
    recipient_emails_text: '',
    recipient_roles_text: ''
  }
}

const handleScheduleReport = async () => {
  try {
    const recipient_emails = scheduleForm.value.recipient_emails_text
      .split(',')
      .map(email => email.trim())
      .filter(email => email.length > 0)
    
    const recipient_roles = scheduleForm.value.recipient_roles_text
      .split(',')
      .map(role => role.trim())
      .filter(role => role.length > 0)
    
    await scheduleReport({
      report_name: scheduleForm.value.report_name,
      scheduled_period: scheduleForm.value.scheduled_period,
      recipient_emails: recipient_emails.length > 0 ? recipient_emails : undefined,
      recipient_roles: recipient_roles.length > 0 ? recipient_roles : undefined
    })
    
    closeScheduleModal()
  } catch (error) {
    console.error('Schedule error:', error)
  }
}

// Right after Dataset Options and before watchers
// Computed properties for options
const siteOptions = computed(() => {
  if (!sites.value || sites.value.length === 0) return ['All Sites']
  return ['All Sites', ...sites.value.map((site: any) => site.site_name)]
})

const freezerOptions = computed(() => {
  if (!freezers.value || freezers.value.length === 0) return []
  return freezers.value.map((freezer: any) => freezer.freezer_name)
})

// Watch for site_id changes and refetch dashboard data
watch(() => filters.value.site_id, async (newSiteId, oldSiteId) => {
  // Only refetch if the value actually changed and is not the initial load
  if (newSiteId !== oldSiteId) {
    if (newSiteId && newSiteId !== 'All Sites') {
      // Find the actual site_id from the sites array
      const selectedSite = sites.value?.find((site: any) => site.site_name === newSiteId)
      if (selectedSite) {
        await getDashboardData(selectedSite.site_id)
      }
    } else {
      // If "All Sites" or empty, fetch global data
      await getDashboardData()
    }
  }
})

// Watch for freezer_id changes to auto-fetch freezers for selected site
watch(() => filters.value.site_id, async (newSiteId) => {
  if (newSiteId && newSiteId !== 'All Sites') {
    const selectedSite = sites.value?.find((site: any) => site.site_name === newSiteId)
    if (selectedSite) {
      // Refetch freezers for the selected site if your API supports it
      await getFreezers(selectedSite.site_id)
    }
  } else {
    // Load all freezers
    await getFreezers()
  }
  // Reset freezer selection when site changes
  filters.value.freezer_id = ''
})

// Alerts Modal Methods
const openAlertsModal = () => {
  isAlertsModalOpen.value = true
}

const closeAlertsModal = () => {
  isAlertsModalOpen.value = false
  alertForm.value = {
    item: '',
    units: '',
    threshold_value: 0,
    current_value: 0,
    admin_notes: ''
  }
}

const handleCheckAlerts = async () => {
  try {
    await checkAndNotifyAlerts({
      threshold_data: {
        item: alertForm.value.item,
        units: alertForm.value.units,
        number: alertForm.value.threshold_value,  // Changed from threshold to number
        admin_notes: alertForm.value.admin_notes || undefined
      },
      current_value: alertForm.value.current_value
    })
    
    closeAlertsModal()
  } catch (error) {
    console.error('Alert check error:', error)
  }
}




// Load initial data
onMounted(async () => {
  await getDashboardData()
  await getSites();
  await getFreezers();
});
</script>

<style scoped>
.bg-gray-25 {
  background-color: #fafafa;
}
</style>