<template>
    <div class="min-h-screen">
        <div class="">
            <!-- Header -->
            <div class="mb-8 rounded-xl bg-[#DCF1FF] text-[#005B8F] py-4 px-6">
                <h1 class="text-xl font-bold bg-[#DCF1FF] text-[#005B8F]">Biospecimen Bulk Upload</h1>
            </div>

            <!-- Stepper -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div class="flex items-center justify-between">
                    <!-- Step 1 -->
                    <div class="flex items-center flex-1">
                        <div :class="[
                            'w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm',
                            currentStep >= 1 ? 'bg-[#005B8F] text-white' : 'bg-gray-200 text-gray-600'
                        ]">
                            1
                        </div>
                        <div class="ml-3">
                            <div class="text-sm font-medium text-gray-900">Upload File</div>
                        </div>
                    </div>

                    <!-- Connector 1 -->
                    <div :class="[
                        'flex-1 h-0.5 mx-4',
                        currentStep >= 2 ? 'bg-[#005B8F]' : 'bg-gray-300'
                    ]"></div>

                    <!-- Step 2 -->
                    <div class="flex items-center flex-1">
                        <div :class="[
                            'w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm',
                            currentStep >= 2 ? 'bg-[#005B8F] text-white' : 'bg-gray-200 text-gray-600'
                        ]">
                            2
                        </div>
                        <div class="ml-3">
                            <div class="text-sm font-medium text-gray-900">Validate Data</div>
                        </div>
                    </div>

                    <!-- Connector 2 -->
                    <div :class="[
                        'flex-1 h-0.5 mx-4',
                        currentStep >= 3 ? 'bg-[#005B8F]' : 'bg-gray-300'
                    ]"></div>

                    <!-- Step 3 -->
                    <div class="flex items-center flex-1">
                        <div :class="[
                            'w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm',
                            currentStep >= 3 ? 'bg-[#005B8F] text-white' : 'bg-gray-200 text-gray-600'
                        ]">
                            3
                        </div>
                        <div class="ml-3">
                            <div class="text-sm font-medium text-gray-900">Confirm Data</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Step 1: Upload File -->
            <div v-if="currentStep === 1" class="bg-white rounded-lg shadow-sm p-8">
                <!-- Download Template Section -->
                <div class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <svg class="w-6 h-6 text-[#005B8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <div>
                                <div class="font-medium text-gray-900">Download CSV Template</div>
                                <div class="text-sm text-gray-600">Use this template to format your data correctly</div>
                            </div>
                        </div>
                        <button @click="downloadTemplate"
                            class="px-4 py-2 bg-[#005B8F] text-white rounded-lg hover:bg-[#005B8F] transition text-sm font-medium">
                            Download Template
                        </button>
                    </div>
                </div>

                <!-- Upload Area -->
                <div @drop.prevent="handleFileDrop" @dragover.prevent @dragenter.prevent="isDragging = true"
                    @dragleave.prevent="isDragging = false" :class="[
                        'border border-dashed border-[#005B8F] rounded-3xl p-12 text-center transition',
                        isDragging ? 'border-[#005B8F] bg-blue-25' : 'border-gray-100 bg-gray-25'
                    ]">
                    <div class="flex flex-col items-center">
                        <svg class="w-16 h-16 text-[#005B8F] mb-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                            <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
                        </svg>

                        <div v-if="!uploadedFile">
                            <p class="text-lg font-medium text-gray-700 mb-2">Drop and drag files</p>
                            <p class="text-sm text-gray-500 mb-4">Drop and drag your CVS files here</p>
                        </div>
                        <div v-else class="mb-4">
                            <div class="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded">
                                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span class="text-sm font-medium text-gray-900">{{ uploadedFile.name }}</span>
                                <button @click="removeFile" class="ml-2 text-red-600 hover:text-red-800">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <input ref="fileInput" type="file" accept=".csv" @change="handleFileSelect" class="hidden" />
                        <button @click="$refs.fileInput.click()"
                            class="px-6 py-2 bg-[#005B8F] text-white rounded hover:bg-[#005B8F] transition font-medium">
                            Browse Files
                        </button>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex justify-end gap-3 mt-6">
                    <button @click="$emit('cancel')"
                        class="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition">
                        Cancel
                    </button>
                    <button @click="processFile" :disabled="!uploadedFile" :class="[
                        'px-6 py-2 rounded transition font-medium flex items-center gap-2',
                        uploadedFile
                            ? 'bg-[#005B8F] text-white hover:bg-[#005B8F]'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    ]">
                        Next Step
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Step 2: Validate Data -->
            <div v-if="currentStep === 2" class="bg-white rounded-lg shadow-sm p-6">
                <!-- Statistics -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div class="border-l-4 border-[#005B8F] bg-blue-50 p-4 rounded">
                        <div class="text-2xl font-bold text-[#005B8F]">{{ statistics.totalProcessed }}</div>
                        <div class="text-sm text-gray-600">Total Rows Processed</div>
                    </div>
                    <div class="border-l-4 border-green-500 bg-green-50 p-4 rounded">
                        <div class="text-2xl font-bold text-green-600">{{ statistics.validRecords }}</div>
                        <div class="text-sm text-gray-600">Valid Records</div>
                    </div>
                    <div class="border-l-4 border-red-500 bg-red-50 p-4 rounded">
                        <div class="text-2xl font-bold text-red-600">{{ statistics.errorsFound }}</div>
                        <div class="text-sm text-gray-600">Errors Found</div>
                    </div>
                </div>

                <!-- Data Table -->
                <div class="overflow-x-auto">
                    <table class="w-full min-w-max">
                        <thead class="bg-gray-25 border-b-[0.5px]">
                            <tr>
                                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase">SN</th>
                                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase">Sample ID
                                </th>
                                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase">Location
                                </th>
                                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase">Type</th>
                                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase">Collection
                                    Date/Time</th>
                                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase">Collector
                                    Info</th>
                                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase">Action</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y-[0.5px] divide-gray-100">
                            <tr v-for="(row, index) in uploadedData" :key="index" class="hover:bg-gray-25">
                                <td class="px-4 py-6 text-sm text-gray-900">{{ index + 1 }}</td>

                                <!-- Sample ID -->
                                <td class="px-4 py-6 text-sm">
                                    <input v-if="editingRow === index" v-model="row.sampleId" type="text"
                                        class="custom-input" />
                                    <span v-else>{{ row.sampleId }}</span>
                                </td>

                                <!-- Location -->
                                <td class="px-4 py-6 text-sm">
                                    <div class="flex items-center gap-1">
                                        <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd"
                                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                clip-rule="evenodd" />
                                        </svg>
                                        <input v-if="editingRow === index" v-model="row.location" type="text"
                                            class="custom-input" />
                                        <span v-else>{{ row.location }}</span>
                                    </div>
                                </td>

                                <!-- Type -->
                                <td class="px-4 py-3 text-sm">
                                    <div class="w-full" v-if="editingRow === index">
                                        <UiSelectInput label="" :options="sampleTypes" position="standalone"
                                            v-model="row.type" placeholder="Select Type" />
                                    </div>
                                    <span v-else :class="[/* badge styling */]">
                                        {{ row.type }}
                                    </span>
                                </td>

                                <!-- Collection Date/Time -->
                                <td class="px-4 py-3 text-sm">
                                    <input type="date" v-if="editingRow === index" v-model="row.collectionDateTime" class="custom-input" placeholder="Select date and time" />

                                    <span v-else>{{ row.collectionDateTime }}</span>
                                </td>

                                <!-- Collector Info -->
                                <td class="px-4 py-6 text-sm">
                                    <input v-if="editingRow === index" v-model="row.collectorInfo" type="text"
                                        class="custom-input" />
                                    <span v-else>{{ row.collectorInfo }}</span>
                                </td>

                                <!-- Status -->
                                <td class="px-4 py-6 text-sm">
                                    <span :class="[
                                        'px-2 py-1 rounded text-xs font-medium',
                                        row.status === 'Valid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    ]">
                                        {{ row.status }}
                                    </span>
                                </td>

                                <!-- Action -->
                                <td class="px-4 py-6 text-sm">
                                    <button v-if="editingRow !== index" @click="editRow(index)"
                                        class="text-[#005B8F] hover:text-blue-800">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                    <button v-else @click="saveRow(index)"
                                        class="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition">
                                        Save
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Error Messages -->
                <div v-if="statistics.errorsFound > 0" class="mt-4 p-4 bg-red-50 border border-red-200 rounded">
                    <p class="text-sm text-red-700 font-medium">
                        {{ statistics.errorsFound }} errors: Invalid ID format, Missing location, Collector not in
                        system
                    </p>
                </div>

                <!-- Action Buttons -->
                <div class="flex justify-between mt-6">
                    <button @click="goBack"
                        class="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                    </button>
                    <button @click="showConfirmModal = true"
                        class="px-6 py-2 bg-[#005B8F] text-white rounded hover:bg-[#005B8F] transition font-medium flex items-center gap-2">
                        Next Step
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Confirmation Modal -->
        <Teleport to="body">
            <div v-if="showConfirmModal"
                class="fixed inset-0 bg-black bg-black/50 backdrop-blur-lg bg-opacity-50 flex items-center justify-center p-4 z-[9999]"
                @click.self="showConfirmModal = false">
                <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
                    <div class="p-6">
                        <div class="flex items-center gap-3 mb-6">
                            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-[#005B8F]" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                </svg>
                            </div>
                            <h2 class="text-lg font-bold text-gray-900">Batch Import Biospecimen</h2>
                        </div>

                        <!-- Progress Stepper -->
                        <div class="flex items-center justify-between mb-6">
                            <div class="flex items-center">
                                <div
                                    class="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-semibold">
                                    1
                                </div>
                                <span class="ml-2 text-sm text-green-600 font-medium">Upload File</span>
                            </div>
                            <div class="flex-1 h-0.5 bg-green-500 mx-2"></div>
                            <div class="flex items-center">
                                <div
                                    class="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-semibold">
                                    2
                                </div>
                                <span class="ml-2 text-sm text-green-600 font-medium">Validate Data</span>
                            </div>
                            <div class="flex-1 h-0.5 bg-green-500 mx-2"></div>
                            <div class="flex items-center">
                                <div
                                    class="w-8 h-8 rounded-full bg-[#005B8F] text-white flex items-center justify-center text-sm font-semibold">
                                    3
                                </div>
                                <span class="ml-2 text-sm text-[#005B8F] font-medium">Confirm Data</span>
                            </div>
                        </div>

                        <!-- Notice -->
                        <div class="bg-orange-50 border-l-4 border-orange-400 p-4 mb-6">
                            <div class="flex">
                                <svg class="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                        clip-rule="evenodd" />
                                </svg>
                                <div class="ml-3">
                                    <h3 class="text-sm font-medium text-orange-800">Important Notice</h3>
                                    <div class="mt-1 text-sm text-orange-700">
                                        This action will create {{ statistics.validRecords }} new biospecimen record.
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Import Summary -->
                        <div class="bg-gray-50 rounded-lg p-6 mb-6">
                            <div class="flex items-center gap-2 mb-4">
                                <div
                                    class="w-8 h-8 rounded-full bg-blue-100 text-[#005B8F] flex items-center justify-center font-semibold">
                                    1
                                </div>
                                <h3 class="text-base font-semibold text-gray-900">Import Summary</h3>
                            </div>

                            <div class="grid grid-cols-3 gap-4">
                                <div class="text-center">
                                    <div class="text-2xl font-bold text-[#005B8F]">{{ statistics.totalProcessed }}</div>
                                    <div class="text-xs text-gray-600 mt-1">Rows Processed</div>
                                </div>
                                <div class="text-center">
                                    <div class="text-2xl font-bold text-gray-600">0</div>
                                    <div class="text-xs text-gray-600 mt-1">Duplicates</div>
                                </div>
                                <div class="text-center">
                                    <div class="text-2xl font-bold text-red-600">{{ statistics.errorsFound }}</div>
                                    <div class="text-xs text-gray-600 mt-1">Skipped rows</div>
                                </div>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex justify-end gap-3">
                            <button @click="showConfirmModal = false"
                                class="px-6 py-2 border border-gray-100 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 19l-7-7 7-7" />
                                </svg>
                                Back
                            </button>
                            <button @click="submitData" :disabled="isSubmitting"
                                class="px-6 py-2 bg-[#005B8F] text-white rounded-lg hover:bg-[#005B8F] transition font-medium flex items-center gap-2 disabled:opacity-50">
                                {{ isSubmitting ? 'Submitting...' : 'Next Step' }}
                                <svg v-if="!isSubmitting" class="w-4 h-4" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Teleport>

        <!-- Success Modal -->
        <Teleport to="body">
            <div v-if="showSuccessModal"
                class="fixed inset-0 bg-black/50 backdrop-blur-lg bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]">
                <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-6 text-center">
                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">Upload Successful!</h3>
                    <p class="text-gray-600 mb-6">
                        {{ statistics.validRecords }} biospecimen records have been successfully imported.
                    </p>
                    <button @click="resetFlow"
                        class="px-6 py-2 bg-[#005B8F] text-white rounded hover:bg-[#005B8F] transition font-medium">
                        Done
                    </button>
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import DatePickerInput from '../../components/DatePickerInput.vue'

interface UploadedRow {
    sampleId: string
    location: string
    type: string
    collectionDateTime: string
    collectorInfo: string
    status: string
}

// State
const currentStep = ref(1)
const uploadedFile = ref<File | null>(null)
const isDragging = ref(false)
const uploadedData = ref<UploadedRow[]>([])
const editingRow = ref<number | null>(null)
const showConfirmModal = ref(false)
const showSuccessModal = ref(false)
const isSubmitting = ref(false)

// Statistics
const statistics = computed(() => ({
    totalProcessed: uploadedData.value.length,
    validRecords: uploadedData.value.filter(row => row.status === 'Valid').length,
    errorsFound: uploadedData.value.filter(row => row.status === 'Error').length
}))

// CSV Template
const csvTemplate = `Sample ID,Location,Type,Collection Date/Time,Collector Info
MH-2024-0023,Ikeja medical centre,Serum,Jan 15 2024 09:30 AM,John Romans
MH-2024-0024,Ikeja medical centre,Plasma,Jan 15 2024 09:30 AM,John Romans
MH-2024-0025,Ikeja medical centre,Tissue,Jan 15 2024 09:30 AM,John Romans`

// Methods
const downloadTemplate = () => {
    const blob = new Blob([csvTemplate], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'biospecimen_template.csv'
    link.click()
    window.URL.revokeObjectURL(url)
}

const handleFileSelect = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files && target.files[0]) {
        uploadedFile.value = target.files[0]
    }
}

const handleFileDrop = (event: DragEvent) => {
    isDragging.value = false
    if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
        const file = event.dataTransfer.files[0]
        if (file.name.endsWith('.csv')) {
            uploadedFile.value = file
        }
    }
}

const removeFile = () => {
    uploadedFile.value = null
}

const parseCSV = (text: string): UploadedRow[] => {
    const lines = text.split('\n').filter(line => line.trim())
    const headers = lines[0].split(',').map(h => h.trim())

    return lines.slice(1).map((line, index) => {
        const values = line.split(',').map(v => v.trim())
        const isError = index === 3 // Make 4th row have an error for demo

        return {
            sampleId: values[0] || '',
            location: values[1] || '',
            type: values[2] || '',
            collectionDateTime: values[3] || '',
            collectorInfo: values[4] || '',
            status: isError ? 'Error' : 'Valid'
        }
    })
}

const processFile = () => {
    if (!uploadedFile.value) return

    const reader = new FileReader()
    reader.onload = (e) => {
        const text = e.target?.result as string
        uploadedData.value = parseCSV(text)
        currentStep.value = 2
    }
    reader.readAsText(uploadedFile.value)
}

const editRow = (index: number) => {
    editingRow.value = index
}

const saveRow = (index: number) => {
    // Validate the row
    const row = uploadedData.value[index]
    if (row.sampleId && row.location && row.collectorInfo) {
        row.status = 'Valid'
    }
    editingRow.value = null
}

const goBack = () => {
    currentStep.value = 1
    editingRow.value = null
}

const submitData = async () => {
    isSubmitting.value = true

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    isSubmitting.value = false
    showConfirmModal.value = false
    showSuccessModal.value = true

    console.log('Submitting data:', uploadedData.value.filter(row => row.status === 'Valid'))
}

const resetFlow = () => {
    currentStep.value = 1
    uploadedFile.value = null
    uploadedData.value = []
    editingRow.value = null
    showConfirmModal.value = false
    showSuccessModal.value = false
}

definePageMeta({
    layout: 'dashboard'
})

const sampleTypes = ref([
    'Serum',
    'Plasma',
    'Tissue',
    'DNA',
    'RNA',
    'Urine',
    'Saliva',
    'Blood'
])
</script>