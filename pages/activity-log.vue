<template>
  <NuxtLayout name="dashboard">
    <div class="min-h-screen">
      <div class="flex">
        <!-- Main Content -->
        <main class="flex-1 p-4 md:p-6 lg:p-8">
          <div class="container mx-auto">
            <!-- Page Title -->
            <div class="mb-6 flex justify-between items-center">
              <div>
                <h1 class="text-xl font-bold text-gray-900">Audit & Activity Log</h1>
                <p class="text-sm text-gray-600 mt-1">Track system activities, chain of custody, and generate compliance reports.</p>
              </div>
              <div class="flex gap-2">
                <button
                    @click="openExportModal"
                    class="px-4 py-2 bg-[#005B8F] text-white rounded-lg hover:bg-[#004a73] transition text-sm font-medium shadow-sm flex items-center gap-2"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export Logs
                </button>
              </div>
            </div>

            <!-- Tabs -->
            <div class="mb-6 border-b border-gray-200">
              <nav class="-mb-px flex space-x-8">
                <button
                    v-for="tab in tabs"
                    :key="tab.id"
                    @click="activeTab = tab.id"
                    :class="[
                    'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                    activeTab === tab.id
                      ? 'border-[#005B8F] text-[#005B8F]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  ]"
                >
                  {{ tab.name }}
                </button>
              </nav>
            </div>

            <!-- Audit Logs Tab -->
            <div v-if="activeTab === 'audit'" class="space-y-6">
              <!-- Filters Section -->
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
                <h3 class="text-sm font-semibold text-gray-900 mb-4">Filter Audit Logs</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">User ID</label>
                    <UiAnimatedInput
                        v-model="auditFilters.userID"
                        type="text"
                        label="User ID"
                    />
                  </div>

                  <div>
                    <UiSelectInput label="Action Type" :options="['', 'CREATE', 'UPDATE', 'DELETE', 'LOGIN']" v-model="auditFilters.actionType" />
                  </div>

                  <div>
                    <UiAnimatedInput
                        v-model="auditFilters.keyword"
                        type="text"
                        label="Keyword"
                    />
                  </div>

                  <div>
                    <UiAnimatedInput
                        v-model="auditFilters.startDate"
                        type="date"
                        label="Start Date"
                    />
                  </div>

                  <div>
                    <UiAnimatedInput
                        v-model="auditFilters.endDate"
                        type="date"
                        label="End Date"
                    />
                  </div>

                  <div class="flex items-end">
                    <button
                        @click="loadAuditLogs"
                        class="w-full px-4 py-2.5 bg-[#005B8F] text-white rounded-lg hover:bg-[#004a73] transition text-sm font-medium"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>

              <!-- Audit Logs Table -->
              <div class="bg-white rounded-xl shadow-sm border border-gray-50 overflow-hidden">
                <div v-if="auditLoading" class="flex items-center justify-center py-12">
                  <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005B8F]"></div>
                </div>

                <div v-else class="overflow-x-auto">
                  <table class="w-full">
                    <thead class="bg-gray-25 border-b border-gray-50">
                    <tr>
                      <th class="px-6 py-6 text-left text-xs font-semibold text-gray-600 uppercase">SN</th>
                      <th class="px-6 py-6 text-left text-xs font-semibold text-gray-600 uppercase">Log ID</th>
                      <th class="px-6 py-6 text-left text-xs font-semibold text-gray-600 uppercase">User ID</th>
                      <th class="px-6 py-6 text-left text-xs font-semibold text-gray-600 uppercase">Action</th>
                      <th class="px-6 py-6 text-left text-xs font-semibold text-gray-600 uppercase">Entity</th>
                      <th class="px-6 py-6 text-left text-xs font-semibold text-gray-600 uppercase">Timestamp</th>
                      <th class="px-6 py-6 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                    </tr>
                    </thead>
                    <tbody class="divide-y-[0.5px] divide-gray-50 bg-white">
                    <tr
                        v-for="(log, index) in auditLogs?.data || []"
                        :key="log.logID"
                        class="hover:bg-gray-50 transition"
                    >
                      <td class="px-6 py-4 text-sm text-gray-900">{{ index + 1 }}</td>
                      <td class="px-6 py-4 text-sm text-gray-700 font-mono">{{ log.logID }}</td>
                      <td class="px-6 py-4 text-sm text-gray-700">{{ log.userID }}</td>
                      <td class="px-6 py-4 text-sm">
                          <span :class="getActionClass(log.actionType)" class="inline-flex px-3 py-1 rounded-full text-xs font-medium">
                            {{ log.actionType }}
                          </span>
                      </td>
                      <td class="px-6 py-4 text-sm text-gray-700">{{ log.affectedEntity }}</td>
                      <td class="px-6 py-4 text-sm text-gray-700">{{ formatDateTime(log.timestamp) }}</td>
                      <td class="px-6 py-4 text-sm">
                        <button
                            @click="viewDetails(log)"
                            class="text-blue-600 hover:text-blue-800"
                            title="View Details"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                      </td>
                    </tr>

                    <tr v-if="!auditLogs?.data || auditLogs.data.length === 0">
                      <td colspan="7" class="px-6 py-12 text-center">
                        <p class="text-sm text-gray-500">No audit logs found</p>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>

                <!-- Pagination -->
                <div v-if="auditLogs?.total && auditLogs.total > 0" class="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                  <p class="text-sm text-gray-700">
                    Showing {{ auditLogs.data.length }} of {{ auditLogs.total }} entries
                  </p>
                  <div class="flex gap-2">
                    <button
                        @click="previousPage"
                        :disabled="currentPage === 1"
                        class="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                        @click="nextPage"
                        :disabled="!hasMorePages"
                        class="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Chain of Custody Tab -->
            <div v-if="activeTab === 'custody'" class="space-y-6">
              <!-- Add Custody Event Button -->
              <div class="flex justify-end">
                <button
                    @click="openCustodyModal"
                    class="px-4 py-2 bg-[#005B8F] text-white rounded-lg hover:bg-[#004a73] transition text-sm font-medium flex items-center gap-2"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Record Custody Event
                </button>
              </div>

              <!-- Custody Filters -->
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
                <h3 class="text-sm font-semibold text-gray-900 mb-4">Filter Custody Events</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <UiAnimatedInput
                        v-model="custodyFilters.sampleID"
                        type="text"
                        label="Sample ID"
                    />
                  </div>

                  <div>
                    <UiAnimatedInput
                        v-model="custodyFilters.userID"
                        type="text"
                        label="User ID"
                    />
                  </div>

                  <div>
                    <UiSelectInput label="Event Type" :options="['', 'RECEIVED', 'TRANSFERRED', 'ANALYZED', 'STORED', 'DISPOSED']"  v-model="custodyFilters.eventType" />
                  </div>

                  <div class="flex items-end">
                    <button
                        @click="loadCustodyEvents"
                        class="w-full px-4 py-2.5 bg-[#005B8F] text-white rounded-lg hover:bg-[#004a73] transition text-sm font-medium"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>

              <!-- Custody Events Table -->
              <div class="bg-white rounded-xl shadow-sm border border-gray-50 overflow-hidden">
                <div v-if="custodyLoading" class="flex items-center justify-center py-12">
                  <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005B8F]"></div>
                </div>

                <div v-else class="overflow-x-auto">
                  <table class="w-full">
                    <thead class="bg-gray-25 border-b border-gray-50">
                    <tr>
                      <th class="px-6 py-6 text-left text-xs font-semibold text-gray-600 uppercase">SN</th>
                      <th class="px-6 py-6 text-left text-xs font-semibold text-gray-600 uppercase">Event ID</th>
                      <th class="px-6 py-6 text-left text-xs font-semibold text-gray-600 uppercase">Sample ID</th>
                      <th class="px-6 py-6 text-left text-xs font-semibold text-gray-600 uppercase">User ID</th>
                      <th class="px-6 py-6 text-left text-xs font-semibold text-gray-600 uppercase">Event Type</th>
                      <th class="px-6 py-6 text-left text-xs font-semibold text-gray-600 uppercase">Notes</th>
                      <th class="px-6 py-6 text-left text-xs font-semibold text-gray-600 uppercase">Timestamp</th>
                      <th class="px-6 py-6 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                    </tr>
                    </thead>
                    <tbody class="divide-y-[0.5px] divide-gray-50 bg-white">
                    <tr
                        v-for="(event, index) in custodyEvents"
                        :key="event.eventID"
                        class="hover:bg-gray-50 transition"
                    >
                      <td class="px-6 py-4 text-sm text-gray-900">{{ index + 1 }}</td>
                      <td class="px-6 py-4 text-sm text-gray-700 font-mono">{{ event.eventID }}</td>
                      <td class="px-6 py-4 text-sm text-gray-700">{{ event.sampleID }}</td>
                      <td class="px-6 py-4 text-sm text-gray-700">{{ event.userID }}</td>
                      <td class="px-6 py-4 text-sm">
                          <span :class="getEventTypeClass(event.eventType)" class="inline-flex px-3 py-1 rounded-full text-xs font-medium">
                            {{ event.eventType }}
                          </span>
                      </td>
                      <td class="px-6 py-4 text-sm text-gray-700">{{ event.notes || '-' }}</td>
                      <td class="px-6 py-4 text-sm text-gray-700">{{ formatDateTime(event.timestamp) }}</td>
                      <td class="px-6 py-4 text-sm">
                        <button
                            @click="openReportModal(event.sampleID)"
                            class="text-blue-600 hover:text-blue-800"
                            title="Generate Report"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </button>
                      </td>
                    </tr>

                    <tr v-if="custodyEvents.length === 0">
                      <td colspan="8" class="px-6 py-12 text-center">
                        <p class="text-sm text-gray-500">No custody events found</p>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>

    <!-- Export Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
            v-if="showExportModal"
            class="fixed inset-0 z-50 overflow-y-auto"
            @click.self="closeExportModal"
        >
          <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
            <div class="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75" @click="closeExportModal"></div>

            <div class="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
              <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900">Export Audit Logs</h3>
                <button @click="closeExportModal" class="text-gray-400 hover:text-gray-600">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div class="px-6 py-6 space-y-4">
                <div>
                  <UiSelectInput label="Export Format" :options="['CSV', 'PDF', 'JSON']" v-model="exportFormat" />
                </div>
              </div>

              <div class="flex justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-200">
                <button
                    @click="closeExportModal"
                    class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                    @click="handleExport"
                    :disabled="exportLoading"
                    class="px-4 py-2 text-sm font-medium text-white bg-[#005B8F] rounded-md hover:bg-[#004a73] disabled:opacity-50"
                >
                  {{ exportLoading ? 'Exporting...' : 'Export' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Add Custody Event Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
            v-if="showCustodyModal"
            class="fixed inset-0 z-50 overflow-y-auto"
            @click.self="closeCustodyModal"
        >
          <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
            <div class="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75" @click="closeCustodyModal"></div>

            <div class="inline-block w-full max-w-lg my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
              <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900">Record Custody Event</h3>
                <button @click="closeCustodyModal" class="text-gray-400 hover:text-gray-600">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div class="px-6 py-6 space-y-4">
                <div>
                  <UiAnimatedInput
                      v-model="custodyForm.sampleID"
                      type="text"
                      label="Sample ID"
                      required
                  />
                </div>

                <div>
                  <UiAnimatedInput
                      v-model="custodyForm.userID"
                      type="text"
                      label="User ID"
                      required
                  />
                </div>

                <div>
                  <UiSelectInput label="Event Type" :options="['', 'RECEIVED', 'TRANSFERRED', 'ANALYZED', 'STORED', 'DISPOSED']" v-model="custodyForm.eventType" />
                </div>

                <div>
                  <UiAnimatedInput
                      v-model="custodyForm.notes"
                      label="Notes (Optional)"
                      :rows="6"
                  />
                </div>
              </div>

              <div class="flex justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-200">
                <button
                    @click="closeCustodyModal"
                    class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                    @click="handleRecordCustody"
                    :disabled="custodySubmitting"
                    class="px-4 py-2 text-sm font-medium text-white bg-[#005B8F] rounded-md hover:bg-[#004a73] disabled:opacity-50"
                >
                  {{ custodySubmitting ? 'Recording...' : 'Record Event' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Generate Report Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
            v-if="showReportModal"
            class="fixed inset-0 z-50 overflow-y-auto"
            @click.self="closeReportModal"
        >
          <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
            <div class="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75" @click="closeReportModal"></div>

            <div class="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
              <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900">Generate Custody Report</h3>
                <button @click="closeReportModal" class="text-gray-400 hover:text-gray-600">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div class="px-6 py-6 space-y-4">
                <p class="text-sm text-gray-600">Sample ID: <span class="font-semibold">{{ selectedSampleID }}</span></p>

                <div>
                  <UiSelectInput label="Report Format" :options="['CSV', 'PDF', 'JSON']" v-model="reportFormat" />
                </div>
              </div>

              <div class="flex justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-200">
                <button
                    @click="closeReportModal"
                    class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                    @click="handleGenerateReport"
                    :disabled="reportLoading"
                    class="px-4 py-2 text-sm font-medium text-white bg-[#005B8F] rounded-md hover:bg-[#004a73] disabled:opacity-50"
                >
                  {{ reportLoading ? 'Generating...' : 'Generate Report' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- View Details Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
            v-if="showDetailsModal"
            class="fixed inset-0 z-50 overflow-y-auto"
            @click.self="closeDetailsModal"
        >
          <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
            <div class="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75" @click="closeDetailsModal"></div>

            <div class="inline-block w-full max-w-2xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
              <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900">Audit Log Details</h3>
                <button @click="closeDetailsModal" class="text-gray-400 hover:text-gray-600">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div v-if="selectedLog" class="px-6 py-6 space-y-4">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="text-sm font-medium text-gray-500">Action Type</label>
                    <p class="text-sm text-gray-900">
                      <span :class="getActionClass(selectedLog.actionType)" class="inline-flex px-3 py-1 rounded-full text-xs font-medium">
                        {{ selectedLog.actionType }}
                      </span>
                    </p>
                  </div>
                  <div>
                    <label class="text-sm font-medium text-gray-500">Timestamp</label>
                    <p class="text-sm text-gray-900">{{ formatDateTime(selectedLog.timestamp) }}</p>
                  </div>
                </div>

                <div>
                  <label class="text-sm font-medium text-gray-500">Affected Entity</label>
                  <p class="text-sm text-gray-900">{{ selectedLog.affectedEntity }}</p>
                </div>

                <div>
                  <label class="text-sm font-medium text-gray-500">Details</label>
                  <pre class="text-sm text-gray-900 bg-gray-50 p-4 rounded-lg overflow-x-auto">{{ JSON.stringify(selectedLog.details, null, 2) }}</pre>
                </div>
              </div>

              <div class="flex justify-end px-6 py-4 bg-gray-50 border-t border-gray-200">
                <button
                    @click="closeDetailsModal"
                    class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useGetAuditLogs, type AuditLogsFilters } from "@/composables/modules/audit/useGetAuditLogs"
import { useCreateAuditLog } from "@/composables/modules/audit/useCreateAuditLog"
import { useCustodyEvents, type CustodyEventsFilters } from "@/composables/modules/audit/useCustodyEvents"
import { useExportAuditLogs } from "@/composables/modules/audit/useExportAuditLogs"
import { useCustodyReport } from "@/composables/modules/audit/useCustodyReport"
import type { AuditLogEntry, RecordCustodyEventPayload } from "@/api_factory/modules/audit"

// Composables
const { loading: auditLoading, auditLogs, getAuditLogs } = useGetAuditLogs()
const { loading: custodyLoading, custodyEvents, recordCustodyEvent, getCustodyEvents } = useCustodyEvents()
const { loading: exportLoading, exportAuditLogs } = useExportAuditLogs()
const { loading: reportLoading, generateCustodyReport } = useCustodyReport()

// State
const activeTab = ref('audit')
const currentPage = ref(1)
const pageSize = ref(50)

const tabs = [
  { id: 'audit', name: 'Audit Logs' },
  { id: 'custody', name: 'Chain of Custody' }
]

// Audit Filters
const auditFilters = ref<AuditLogsFilters>({
  userID: '',
  actionType: '',
  keyword: '',
  startDate: '',
  endDate: '',
  limit: pageSize.value,
  offset: 0
})

// Custody Filters
const custodyFilters = ref<CustodyEventsFilters>({
  sampleID: '',
  userID: '',
  eventType: '',
  limit: 100,
  offset: 0
})

// Modals
const showExportModal = ref(false)
const showCustodyModal = ref(false)
const showReportModal = ref(false)
const showDetailsModal = ref(false)

// Export state
const exportFormat = ref<'CSV' | 'PDF' | 'JSON'>('CSV')

// Custody form
const custodySubmitting = ref(false)
const custodyForm = ref<RecordCustodyEventPayload>({
  sampleID: '',
  userID: '',
  eventType: 'RECEIVED',
  notes: ''
})

// Report state
const selectedSampleID = ref('')
const reportFormat = ref<'PDF' | 'CSV' | 'JSON'>('PDF')

// Selected log for details
const selectedLog = ref<AuditLogEntry | null>(null)

// Computed
const hasMorePages = computed(() => {
  if (!auditLogs.value) return false
  return (auditLogs.value.offset + auditLogs.value.data.length) < auditLogs.value.total
})

// Lifecycle
onMounted(async () => {
  await loadAuditLogs()
  await loadCustodyEvents()
})

// Methods
const loadAuditLogs = async () => {
  await getAuditLogs(auditFilters.value)
}

const loadCustodyEvents = async () => {
  await getCustodyEvents(custodyFilters.value)
}

const previousPage = async () => {
  if (currentPage.value > 1) {
    currentPage.value--
    auditFilters.value.offset = (currentPage.value - 1) * pageSize.value
    await loadAuditLogs()
  }
}

const nextPage = async () => {
  if (hasMorePages.value) {
    currentPage.value++
    auditFilters.value.offset = (currentPage.value - 1) * pageSize.value
    await loadAuditLogs()
  }
}

// Export Modal
const openExportModal = () => {
  showExportModal.value = true
}

const closeExportModal = () => {
  showExportModal.value = false
  exportFormat.value = 'CSV'
}

const handleExport = async () => {
  const result = await exportAuditLogs({
    format: exportFormat.value,
    filters: {
      startDate: auditFilters.value.startDate,
      endDate: auditFilters.value.endDate,
      userID: auditFilters.value.userID,
      actionType: auditFilters.value.actionType,
      keyword: auditFilters.value.keyword
    }
  })

  if (result) {
    closeExportModal()
  }
}

// Custody Modal
const openCustodyModal = () => {
  showCustodyModal.value = true
}

const closeCustodyModal = () => {
  showCustodyModal.value = false
  custodyForm.value = {
    sampleID: '',
    userID: '',
    eventType: 'RECEIVED',
    notes: ''
  }
}

const handleRecordCustody = async () => {
  if (!custodyForm.value.sampleID || !custodyForm.value.userID || !custodyForm.value.eventType) {
    alert('Please fill in all required fields')
    return
  }

  custodySubmitting.value = true
  const result = await recordCustodyEvent(custodyForm.value)
  custodySubmitting.value = false

  if (result) {
    closeCustodyModal()
    await loadCustodyEvents()
  }
}

// Report Modal
const openReportModal = (sampleID: string) => {
  selectedSampleID.value = sampleID
  showReportModal.value = true
}

const closeReportModal = () => {
  showReportModal.value = false
  selectedSampleID.value = ''
  reportFormat.value = 'PDF'
}

const handleGenerateReport = async () => {
  const result = await generateCustodyReport(selectedSampleID.value, reportFormat.value)

  if (result) {
    closeReportModal()
  }
}

// Details Modal
const viewDetails = (log: AuditLogEntry) => {
  selectedLog.value = log
  showDetailsModal.value = true
}

const closeDetailsModal = () => {
  showDetailsModal.value = false
  selectedLog.value = null
}

// Utility functions
const getActionClass = (actionType: string): string => {
  const classes: Record<string, string> = {
    'CREATE': 'bg-green-100 text-green-700',
    'UPDATE': 'bg-blue-100 text-blue-700',
    'DELETE': 'bg-red-100 text-red-700',
    'LOGIN': 'bg-purple-100 text-purple-700',
  }
  return classes[actionType] || 'bg-gray-100 text-gray-700'
}

const getEventTypeClass = (eventType: string): string => {
  const classes: Record<string, string> = {
    'RECEIVED': 'bg-blue-100 text-blue-700',
    'TRANSFERRED': 'bg-yellow-100 text-yellow-700',
    'ANALYZED': 'bg-purple-100 text-purple-700',
    'STORED': 'bg-green-100 text-green-700',
    'DISPOSED': 'bg-red-100 text-red-700',
  }
  return classes[eventType] || 'bg-gray-100 text-gray-700'
}

const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
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
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  @apply bg-gray-100 rounded-lg;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  @apply bg-gray-300 rounded-lg;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400;
}

/* Button disabled state */
button:disabled {
  @apply opacity-50 cursor-not-allowed;
}

/* Pre tag styling */
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
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

  table {
    @apply text-sm;
  }
}
</style>