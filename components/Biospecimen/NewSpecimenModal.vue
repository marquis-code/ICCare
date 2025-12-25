<template>
  <Teleport to="body">
    <Transition name="modal">
      <div 
        v-if="modelValue" 
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4"
        @click.self="close"
      >
        <div class="bg-white rounded-xl w-full max-w-2xl shadow-2xl transform transition-all flex flex-col max-h-[95vh] sm:max-h-[90vh]">
          <!-- Fixed Header -->
          <div class="flex-shrink-0 p-4 sm:p-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.75 20.25V15.75H15.75L12 11.25L8.25 15.75H11.25V20.25H7.5V20.2125C7.374 20.22 7.254 20.25 7.125 20.25C5.63316 20.25 4.20242 19.6574 3.14752 18.6025C2.09263 17.5476 1.5 16.1168 1.5 14.625C1.5 11.739 3.6825 9.387 6.483 9.0645C6.72854 7.78094 7.41368 6.62306 8.42057 5.79001C9.42746 4.95696 10.6932 4.5008 12 4.5C13.307 4.50072 14.5729 4.95682 15.5801 5.78985C16.5872 6.62289 17.2727 7.78081 17.5185 9.0645C20.319 9.387 22.4985 11.739 22.4985 14.625C22.4985 16.1168 21.9059 17.5476 20.851 18.6025C19.7961 19.6574 18.3653 20.25 16.8735 20.25C16.7475 20.25 16.626 20.22 16.4985 20.2125V20.25H12.75Z" fill="#005B8F"/>
                </svg>
                </div>
                <h2 class="text-lg sm:text-xl font-medium text-[#033958]">Register New Biospecimen</h2>
              </div>
              <button 
                @click="close" 
                class="text-gray-400 hover:text-gray-600 transition p-2 hover:bg-gray-100 rounded-lg flex-shrink-0"
                :disabled="loading"
              >
                <Icon name="heroicons:x-mark" class="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          <!-- Scrollable Content Area -->
          <div class="flex-1 overflow-y-auto custom-scrollbar">
            <div class="p-4 sm:p-6 md:p-8">
              <!-- Progress Steps -->
              <div class="mb-6 sm:mb-10">
                <div class="flex items-center justify-between relative">
                  <!-- Step 1 -->
                  <div class="flex flex-col items-center flex-1 relative z-10">
                    <div 
                      :class="[
                        'w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-sm sm:text-base md:text-lg transition-all duration-300',
                        currentStep >= 1 ? 'bg-[#005B8F] text-white shadow-lg scale-110' : 'bg-gray-200 text-gray-600'
                      ]"
                    >
                      <Icon v-if="currentStep > 1" name="heroicons:check" class="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7" />
                      <span v-else>1</span>
                    </div>
                    <span class="mt-1 sm:mt-2 text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 text-center">Basic</span>
                  </div>
                  
                  <!-- Connector 1 -->
                  <div class="flex-1 h-[0.5px] mx-1 sm:mx-2 md:mx-4 relative" style="top: -16px;">
                    <div 
                      :class="[
                        'h-full rounded-full transition-all duration-500',
                        currentStep >= 2 ? 'bg-[#005B8F]' : 'bg-gray-200'
                      ]"
                    ></div>
                  </div>
                  
                  <!-- Step 2 -->
                  <div class="flex flex-col items-center flex-1 relative z-10">
                    <div 
                      :class="[
                        'w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-sm sm:text-base md:text-lg transition-all duration-300',
                        currentStep >= 2 ? 'bg-[#005B8F] text-white shadow-lg scale-110' : 'bg-gray-200 text-gray-600'
                      ]"
                    >
                      <Icon v-if="currentStep > 2" name="heroicons:check" class="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7" />
                      <span v-else>2</span>
                    </div>
                    <span class="mt-1 sm:mt-2 text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 text-center">Storage</span>
                  </div>
                  
                  <!-- Connector 2 -->
                  <div class="flex-1 h-[0.5px] mx-1 sm:mx-2 md:mx-4 relative" style="top: -16px;">
                    <div 
                      :class="[
                        'h-full rounded-full transition-all duration-500',
                        currentStep >= 3 ? 'bg-[#005B8F]' : 'bg-gray-200'
                      ]"
                    ></div>
                  </div>
                  
                  <!-- Step 3 -->
                  <div class="flex flex-col items-center flex-1 relative z-10">
                    <div 
                      :class="[
                        'w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-sm sm:text-base md:text-lg transition-all duration-300',
                        currentStep >= 3 ? 'bg-[#005B8F] text-white shadow-lg scale-110' : 'bg-gray-200 text-gray-600'
                      ]"
                    >
                      <Icon v-if="currentStep > 3" name="heroicons:check" class="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7" />
                      <span v-else>3</span>
                    </div>
                    <span class="mt-1 sm:mt-2 text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 text-center">MetaData</span>
                  </div>

                  <!-- Connector 3 -->
                  <div class="flex-1 h-[0.5px] mx-1 sm:mx-2 md:mx-4 relative" style="top: -16px;">
                    <div 
                      :class="[
                        'h-full rounded-full transition-all duration-500',
                        currentStep >= 4 ? 'bg-[#005B8F]' : 'bg-gray-200'
                      ]"
                    ></div>
                  </div>

                  <!-- Step 4 -->
                  <div class="flex flex-col items-center flex-1 relative z-10">
                    <div 
                      :class="[
                        'w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-sm sm:text-base md:text-lg transition-all duration-300',
                        currentStep >= 4 ? 'bg-[#005B8F] text-white shadow-lg scale-110' : 'bg-gray-200 text-gray-600'
                      ]"
                    >
                      4
                    </div>
                    <span class="mt-1 sm:mt-2 text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 text-center">Sample Files</span>
                  </div>
                </div>
              </div>

              <!-- Step 1: Basic Info -->
              <Transition name="fade" mode="out-in">
                <div v-if="currentStep === 1" key="step1" class="space-y-4 sm:space-y-6">
                  <h3 class="text-base sm:text-lg font-medium text-[#033958] border-b-[0.5px] pb-2 sm:pb-3">Basic Information</h3>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5">
                    <div>
                      <label class="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                        Sample Serial No <span class="text-red-500">*</span>
                      </label>
                      <input 
                        v-model="formData.sample_serial_no"
                        type="text" 
                        placeholder="e.g. MH-2024-0001"
                        class="custom-input"
                        :disabled="loading"
                      />
                    </div>
                    
                    <div>
                      <UiSelectInput 
                        label="Sample Type" 
                        :options="sampleTypes" 
                        position="standalone" 
                        v-model="formData.sample_category_id"
                        :disabled="loading"
                      />
                    </div>
                    
                    <div>
                      <label class="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                        Sample Label <span class="text-red-500">*</span>
                      </label>
                      <input 
                        v-model="formData.sample_label"
                        type="text" 
                        placeholder="e.g. Patient Sample A"
                        class="custom-input"
                        :disabled="loading"
                      />
                    </div>
                    
                    <div>
                      <label class="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                        Collection Date <span class="text-red-500">*</span>
                      </label>
                      <input 
                        v-model="formData.collection_date"
                        type="date" 
                        class="custom-input"
                        :disabled="loading"
                      />
                    </div>
                    
                    <div>
                      <label class="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                        Collection Time <span class="text-red-500">*</span>
                      </label>
                      <input 
                        v-model="formData.collection_time"
                        type="time" 
                        class="custom-input"
                        :disabled="loading"
                      />
                    </div>
                    
                    <div>
                      <label class="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                        Researcher Information <span class="text-red-500">*</span>
                      </label>
                      <input 
                        v-model="formData.researcher_info"
                        type="text" 
                        placeholder="e.g. Dr. John Smith"
                        class="custom-input"
                        :disabled="loading"
                      />
                    </div>
                    
                    <div>
                      <label class="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                        Field Collector Information <span class="text-red-500">*</span>
                      </label>
                      <input 
                        v-model="formData.field_collector_info"
                        type="text" 
                        placeholder="e.g. Lab Technician Jane Doe"
                        class="custom-input"
                        :disabled="loading"
                      />
                    </div>
                  </div>
                </div>
              </Transition>

              <!-- Step 2: Storage Location -->
              <Transition name="fade" mode="out-in">
                <div v-if="currentStep === 2" key="step2" class="space-y-4 sm:space-y-6">
                  <h3 class="text-base sm:text-lg font-medium text-[#033958] border-b-[0.5px] pb-2 sm:pb-3">Storage Location</h3>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5">
                    <div>
                      <UiSelectInput 
                        label="Site" 
                        :options="siteList" 
                        position="standalone" 
                        v-model="formData.site_id"
                        :disabled="loading"
                      />
                    </div>
                    
                    <div>
                      <UiSelectInput 
                        label="Freezer" 
                        :options="freezerList" 
                        position="standalone" 
                        v-model="formData.storage_location.freezer"
                        :disabled="loading"
                      />
                    </div>
                    
                    <div>
                      <UiSelectInput 
                        label="Rack" 
                        :options="rackList" 
                        position="standalone" 
                        v-model="formData.storage_location.rack"
                        :disabled="loading"
                      />
                    </div>
                    
                    <div>
                      <UiSelectInput 
                        label="Box" 
                        :options="boxList" 
                        position="standalone" 
                        v-model="formData.storage_location.box"
                        :disabled="loading"
                      />
                    </div>
                  </div>

                  <!-- Storage Grid -->
                  <div>
                    <label class="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                      Select Position <span class="text-red-500">*</span>
                    </label>
                    
                    <div class="bg-gray-25 p-2 sm:p-3 md:p-4 rounded-lg border border-gray-50 mb-3 sm:mb-4">
                      <div class="text-[10px] sm:text-xs text-gray-600 flex items-center gap-1 flex-wrap">
                        <span>{{ formData?.site_id || 'Select Site' }}</span>
                        <Icon name="heroicons:chevron-right" class="w-2 h-2 sm:w-3 sm:h-3" />
                        <span>{{ formData?.storage_location?.freezer || 'Select Freezer' }}</span>
                        <Icon name="heroicons:chevron-right" class="w-2 h-2 sm:w-3 sm:h-3" />
                        <span>{{ formData?.storage_location?.rack || 'Select Rack' }}</span>
                        <Icon name="heroicons:chevron-right" class="w-2 h-2 sm:w-3 sm:h-3" />
                        <span>{{ formData?.storage_location?.box || 'Select Box' }}</span>
                        <Icon name="heroicons:chevron-right" class="w-2 h-2 sm:w-3 sm:h-3" />
                        <span class="font-semibold text-blue-600">{{ getPositionLabel(formData.storage_location.position) }}</span>
                      </div>
                    </div>
                    
                    <div class="overflow-x-auto rounded-lg pb-2 sm:pb-4 bg-gray-25 p-2 sm:p-3">
                      <div class="inline-block min-w-full">
                        <div class="grid gap-1 sm:gap-2 mb-4 sm:mb-6">
                          <div v-for="row in ['A', 'B', 'C', 'D', 'E']" :key="row" class="flex gap-1 sm:gap-2">
                            <button
                              v-for="col in 10"
                              :key="`${row}${col}`"
                              type="button"
                              @click="selectPosition(row, col)"
                              :class="[
                                'w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[10px] sm:text-xs font-semibold rounded-lg border-[0.5px] transition-all duration-200 transform hover:scale-105',
                                formData.storage_location.position === getPositionNumber(row, col)
                                  ? 'bg-[#005B8F] text-white border-blue-700 shadow-lg scale-110'
                                  : isPositionOccupied(row, col)
                                  ? 'bg-gray-300 text-gray-500 border-gray-100 cursor-not-allowed opacity-60'
                                  : 'bg-white text-gray-700 border-gray-100 hover:border-blue-400 hover:shadow-md'
                              ]"
                              :disabled="isPositionOccupied(row, col) || loading"
                            >
                              {{ row }}{{ col }}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Legend -->
                    <div class="flex flex-wrap gap-3 sm:gap-6 text-xs sm:text-sm bg-white p-3 sm:p-4 rounded-lg border-[0.5px] border-gray-50">
                      <div class="flex items-center gap-2">
                        <div class="w-6 h-6 sm:w-8 sm:h-8 bg-white border-[0.5px] border-gray-300 rounded-lg flex-shrink-0"></div>
                        <span class="text-gray-700">Available</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <div class="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 border-[0.5px] border-gray-400 rounded-lg flex-shrink-0"></div>
                        <span class="text-gray-700">Occupied</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <div class="w-6 h-6 sm:w-8 sm:h-8 bg-[#005B8F] border-[0.5px] border-blue-700 rounded-lg flex-shrink-0"></div>
                        <span class="text-gray-700">Selected</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>

              <!-- Step 3: Metadata -->
              <Transition name="fade" mode="out-in">
                <div v-if="currentStep === 3" key="step3" class="space-y-6 sm:space-y-8">
                  <!-- Clinical Data -->
                  <div>
                    <h3 class="text-xs sm:text-sm font-medium text-[#033958] border-b-[0.5px] pb-2 sm:pb-3 mb-3 sm:mb-5">Clinical Data</h3>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5">
                      <div>
                        <label class="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Diagnosis</label>
                        <input 
                          v-model="formData.free_fields.diagnosis"
                          type="text" 
                          placeholder="e.g. Type 2 Diabetes"
                          class="custom-input"
                          :disabled="loading"
                        />
                      </div>
                      
                      <div>
                        <label class="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Treatment Status</label>
                        <input 
                          v-model="formData.free_fields.treatmentStatus"
                          type="text" 
                          placeholder="e.g. Ongoing"
                          class="custom-input"
                          :disabled="loading"
                        />
                      </div>
                      
                      <div class="md:col-span-2">
                        <label class="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Outcomes</label>
                        <textarea 
                          v-model="formData.free_fields.outcomes"
                          placeholder="Enter clinical outcomes and observations..."
                          rows="3"
                          class="custom-input resize-none"
                          :disabled="loading"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <!-- Demographic Data -->
                  <div>
                    <h3 class="text-xs sm:text-sm font-medium text-[#033958] border-b-[0.5px] pb-2 sm:pb-3 mb-3 sm:mb-5">Demographic Data</h3>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5">
                      <div>
                        <label class="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Date of Birth</label>
                        <input 
                          v-model="formData.free_fields.dateOfBirth"
                          type="date" 
                          class="custom-input"
                          :disabled="loading"
                          @change="calculateAge"
                        />
                      </div>
                      
                      <div>
                        <label class="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Age</label>
                        <input 
                          v-model="formData.free_fields.age"
                          type="number" 
                          placeholder="Auto-calculated"
                          class="custom-input bg-gray-50"
                          :disabled="true"
                          readonly
                        />
                      </div>
                      
                      <div>
                        <UiSelectInput 
                          label="Gender" 
                          :options="genderList" 
                          position="standalone" 
                          v-model="formData.free_fields.sex"
                          :disabled="loading"
                        />
                      </div>
                      
                      <div>
                        <UiSelectInput 
                          label="Ethnicity" 
                          :options="ethnicityList" 
                          position="standalone" 
                          v-model="formData.free_fields.ethnicity"
                          :disabled="loading"
                        />
                      </div>
                      
                      <div class="md:col-span-2">
                        <label class="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Nationality</label>
                        <input 
                          v-model="formData.free_fields.nationality"
                          type="text" 
                          placeholder="e.g. Nigerian"
                          class="custom-input"
                          :disabled="loading"
                        />
                      </div>
                    </div>
                  </div>

                  <!-- Epidemiological Data -->
                  <div>
                    <h3 class="text-xs sm:text-sm font-medium text-[#033958] border-b-[0.5px] pb-2 sm:pb-3 mb-3 sm:mb-5">Epidemiological Data</h3>
                    
                    <div class="grid grid-cols-1 gap-3 sm:gap-5">
                      <div>
                        <label class="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">History</label>
                        <textarea 
                          v-model="formData.free_fields.history"
                          placeholder="Enter medical history, family history, or relevant background..."
                          rows="3"
                          class="custom-input resize-none"
                          :disabled="loading"
                        ></textarea>
                      </div>
                      
                      <div>
                        <label class="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Risk Factors</label>
                        <textarea 
                          v-model="formData.free_fields.riskFactors"
                          placeholder="Enter known risk factors (e.g., smoking, obesity, exposure)..."
                          rows="3"
                          class="custom-input resize-none"
                          :disabled="loading"
                        ></textarea>
                      </div>
                      
                      <!-- Geolocation Section -->
                      <div>
                        <h4 class="text-xs sm:text-sm font-semibold text-gray-700 mb-3">Geolocation</h4>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                          <div>
                            <UiSelectInput 
                              label="Country" 
                              :options="countryList" 
                              position="standalone" 
                              v-model="formData.free_fields.geolocation.country"
                              :disabled="loading"
                              @update:modelValue="onCountryChange"
                            />
                          </div>
                          
                          <div>
                            <UiSelectInput 
                              label="State/Province" 
                              :options="stateList" 
                              position="standalone" 
                              v-model="formData.free_fields.geolocation.state"
                              :disabled="loading || !formData.free_fields.geolocation.country"
                              @update:modelValue="onStateChange"
                            />
                          </div>
                          
                          <div>
                            <UiSelectInput 
                              label="LGA/District" 
                              :options="lgaList" 
                              position="standalone" 
                              v-model="formData.free_fields.geolocation.lga"
                              :disabled="loading || !formData.free_fields.geolocation.state"
                            />
                          </div>
                          
                          <div>
                            <label class="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">City</label>
                            <input 
                              v-model="formData.free_fields.geolocation.city"
                              type="text" 
                              placeholder="e.g. Ikeja"
                              class="custom-input"
                              :disabled="loading"
                            />
                          </div>
                          
                          <div class="md:col-span-2">
                            <label class="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Address</label>
                            <textarea 
                              v-model="formData.free_fields.geolocation.address"
                              placeholder="Enter full address..."
                              rows="2"
                              class="custom-input resize-none"
                              :disabled="loading"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>

              <!-- Step 4: File Upload -->
              <Transition name="fade" mode="out-in">
                <div v-if="currentStep === 4" key="step4" class="space-y-4 sm:space-y-6">
                  <h3 class="text-base sm:text-lg font-medium text-[#033958] border-b-[0.5px] pb-2 sm:pb-3">Sample Files & Documents</h3>
                  
                  <div class="space-y-3 sm:space-y-4">
                    <p class="text-xs sm:text-sm text-gray-600">
                      Upload any relevant files such as images, PDFs, CSV data files, or other documents related to this biospecimen.
                    </p>

                    <!-- Tab Selection -->
                    <div class="flex gap-2 border-b border-gray-200">
                      <button
                        type="button"
                        @click="uploadMethod = 'file'"
                        :class="[
                          'px-4 py-2 text-sm font-medium transition-colors relative',
                          uploadMethod === 'file' 
                            ? 'text-[#005B8F] border-b-2 border-[#005B8F]' 
                            : 'text-gray-500 hover:text-gray-700'
                        ]"
                      >
                        Upload Files
                      </button>
                      <button
                        type="button"
                        @click="uploadMethod = 'url'"
                        :class="[
                          'px-4 py-2 text-sm font-medium transition-colors relative',
                          uploadMethod === 'url' 
                            ? 'text-[#005B8F] border-b-2 border-[#005B8F]' 
                            : 'text-gray-500 hover:text-gray-700'
                        ]"
                      >
                        Add from URL
                      </button>
                    </div>

                    <!-- File Upload Area -->
                    <div 
                      v-show="uploadMethod === 'file'"
                      @click="triggerFileInput"
                      @dragover.prevent="isDragging = true"
                      @dragleave.prevent="isDragging = false"
                      @drop.prevent="handleFileDrop"
                      :class="[
                        'border-2 border-dashed rounded-xl p-4 sm:p-6 md:p-8 text-center cursor-pointer transition-all duration-300',
                        isDragging ? 'border-[#005B8F] bg-blue-50' : 'border-gray-300 hover:border-[#005B8F] hover:bg-gray-50'
                      ]"
                    >
                      <div class="flex flex-col items-center gap-2 sm:gap-4">
                        <div class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-blue-100 flex items-center justify-center">
                          <Icon name="heroicons:cloud-arrow-up" class="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#005B8F]" />
                        </div>
                        <div>
                          <p class="text-sm sm:text-base md:text-lg font-medium text-gray-700 mb-1">
                            Click to upload or drag and drop
                          </p>
                          <p class="text-xs sm:text-sm text-gray-500">
                            Images, PDFs, CSV, Excel, Documents (Max 10MB per file)
                          </p>
                        </div>
                        <input 
                          ref="fileInput"
                          type="file"
                          multiple
                          accept="image/*,.pdf,.csv,.xlsx,.xls,.doc,.docx,.txt"
                          @change="handleFileSelect"
                          class="hidden"
                          :disabled="loading"
                        />
                      </div>
                    </div>

                    <!-- URL Input Area -->
                    <div v-show="uploadMethod === 'url'" class="space-y-3">
                      <div>
                        <label class="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                          Image URL
                        </label>
                        <input 
                          v-model="imageUrl"
                          type="url" 
                          placeholder="https://example.com/image.jpg"
                          class="custom-input"
                          :disabled="loading"
                          @keyup.enter="addImageFromUrl"
                        />
                      </div>
                      <button
                        @click="addImageFromUrl"
                        type="button"
                        :disabled="!imageUrl || loading"
                        class="px-4 py-2 bg-[#005B8F] text-white rounded-lg hover:bg-[#004670] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all text-sm font-medium"
                      >
                        Add Image
                      </button>
                    </div>

                    <!-- File List -->
                    <div v-if="uploadedFiles.length > 0" class="space-y-2 sm:space-y-3">
                      <h4 class="text-xs sm:text-sm font-semibold text-gray-700">
                        Uploaded Files ({{ uploadedFiles.length }})
                      </h4>
                      
                      <div class="grid grid-cols-1 gap-2 sm:gap-3">
                        <div 
                          v-for="(file, index) in uploadedFiles" 
                          :key="index"
                          class="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
                        >
                          <div class="flex items-start gap-2 sm:gap-3 md:gap-4">
                            <!-- File Preview -->
                            <div class="flex-shrink-0">
                              <div v-if="file.preview && (file.type.startsWith('image/') || file.isUrl)" class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border border-gray-200">
                                <img :src="file.preview" :alt="file.name" class="w-full h-full object-cover" />
                              </div>
                              <div v-else class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200">
                                <Icon 
                                  :name="getFileIcon(file.type)" 
                                  class="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-gray-500" 
                                />
                              </div>
                            </div>

                            <!-- File Info -->
                            <div class="flex-1 min-w-0">
                              <p class="text-xs sm:text-sm font-medium text-gray-900 truncate" :title="file.name">
                                {{ file.name }}
                              </p>
                              <p class="text-[10px] sm:text-xs text-gray-500 mt-1">
                                {{ file.isUrl ? 'From URL' : formatFileSize(file.size) }} • {{ getFileTypeLabel(file.type) }}
                              </p>
                              <div v-if="file.preview && file.type === 'application/pdf'" class="mt-1 sm:mt-2">
                                <button 
                                  @click="openPreview(file)"
                                  type="button"
                                  class="text-[10px] sm:text-xs text-[#005B8F] hover:underline flex items-center gap-1"
                                >
                                  <Icon name="heroicons:eye" class="w-3 h-3" />
                                  Preview PDF
                                </button>
                              </div>
                            </div>

                            <!-- Remove Button -->
                            <button
                              @click="removeFile(index)"
                              type="button"
                              class="flex-shrink-0 p-1 sm:p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              :disabled="loading"
                            >
                              <Icon name="heroicons:trash" class="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- No Files Message -->
                    <div v-else class="text-center py-6 sm:py-8">
                      <Icon name="heroicons:document" class="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-2" />
                      <p class="text-xs sm:text-sm text-gray-500">No files uploaded yet</p>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Fixed Footer with Navigation Buttons -->
          <div class="flex-shrink-0 border-t border-gray-200 p-4 sm:p-6 bg-gray-50">
            <div class="flex justify-end space-x-2 sm:space-x-4">
              <button 
                v-if="currentStep > 1"
                type="button"
                @click="previousStep"
                class="px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 border-[0.5px] border-gray-50 bg-white rounded-lg hover:bg-gray-50 transition-all font-medium flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                :disabled="loading"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 sm:w-5 sm:h-5">
                  <path d="M13.9796 6L15.3896 7.41L10.8096 12L15.3896 16.59L13.9796 18L7.97965 12L13.9796 6Z" fill="#005B8F"/>
                </svg>
                <span class="hidden sm:inline">Back</span>
              </button>
              <button 
                v-else
                type="button"
                @click="close"
                class="px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 border-[0.5px] border-gray-50 rounded-lg hover:bg-gray-50 transition-all font-medium text-xs sm:text-sm"
                :disabled="loading"
              >
                Cancel
              </button>
              
              <button 
                v-if="currentStep < 4"
                type="button"
                @click="nextStep"
                class="px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 bg-[#005B8F] text-white rounded-lg transition-all font-medium flex items-center gap-1 sm:gap-2 shadow-lg hover:shadow-xl text-xs sm:text-sm"
                :disabled="loading"
              >
                <span>Next</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 sm:w-5 sm:h-5">
                  <path d="M10.0204 6L8.61035 7.41L13.1904 12L8.61035 16.59L10.0204 18L16.0204 12L10.0204 6Z" fill="white"/>
                </svg>
              </button>
              <button 
                v-else
                type="button"
                @click="save"
                class="px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 bg-[#005B8F] text-white rounded-lg transition-all font-medium flex items-center gap-1 sm:gap-2 shadow-lg hover:shadow-xl text-xs sm:text-sm"
                :disabled="loading"
              >
                <Icon v-if="!loading" name="heroicons:check" class="w-4 h-4 sm:w-5 sm:h-5" />
                <svg v-else class="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span class="hidden sm:inline">{{ loading ? 'Saving...' : 'Save' }}</span>
                <span class="sm:hidden">{{ loading ? '...' : 'Save' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useRegisterSample } from "@/composables/modules/biosample/useRegisterSample"

// Props
const props = defineProps<{
  modelValue: boolean;
}>();

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'saved': [data: any];
}>();

// Composables
const { loading, sample, registerSample } = useRegisterSample()

// State
const currentStep = ref(1);
const isDragging = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const uploadMethod = ref<'file' | 'url'>('file');
const imageUrl = ref('');
const uploadedFiles = ref<Array<{
  file: File | null;
  name: string;
  size: number;
  type: string;
  preview?: string;
  isUrl?: boolean;
  url?: string;
}>>([]);

const formData = ref({
  site_id: '',
  sample_category_id: '',
  sample_serial_no: '',
  sample_label: '',
  collection_date: '',
  collection_time: '',
  researcher_info: '',
  field_collector_info: '',
  storage_location: {
    site: '',
    freezer: '',
    rack: '',
    box: '',
    position: 0
  },
  free_fields: {
    diagnosis: '',
    treatmentStatus: '',
    outcomes: '',
    dateOfBirth: '',
    age: '',
    sex: '',
    ethnicity: '',
    nationality: '',
    history: '',
    riskFactors: '',
    geolocation: {
      country: '',
      state: '',
      lga: '',
      city: '',
      address: ''
    }
  }
});

// Simulated occupied positions (replace with actual data from API)
const occupiedPositions = ref(new Set(['A3', 'B5', 'C7', 'D2', 'E9', 'A8', 'C2', 'D7', 'E3']));

// Options
const sampleTypes = ref(['Serum', 'Plasma', 'Tissue', 'Blood', 'Urine'])
const genderList = ref(['Male', 'Female', 'Other'])
const ethnicityList = ref([
  'Yoruba',
  'Igbo',
  'Hausa',
  'Fulani',
  'Ijaw',
  'Kanuri',
  'Ibibio',
  'Tiv',
  'Edo',
  'Nupe',
  'Other'
])
const siteList = ref(['Memorial Hospital', 'Central Lab', 'Research Facility'])
const freezerList = ref(['Freezer A-301', 'Freezer B-105', 'Freezer C-202'])
const rackList = ref(['Rack 1-A', 'Rack 2-B', 'Rack 3-C'])
const boxList = ref(['Box 01', 'Box 02', 'Box 03'])

// Geolocation options
const countryList = ref(['Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Other'])
const stateList = ref<string[]>([])
const lgaList = ref<string[]>([])

// Nigerian states
const nigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
  'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
  'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
]

// LGAs by state (example for Lagos)
const lagosLGAs = [
  'Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa', 'Badagry',
  'Epe', 'Eti-Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye', 'Ikeja', 'Ikorodu',
  'Kosofe', 'Lagos Island', 'Lagos Mainland', 'Mushin', 'Ojo', 'Oshodi-Isolo',
  'Shomolu', 'Surulere'
]

// Methods
const getPositionNumber = (row: string, col: number): number => {
  const rowIndex = row.charCodeAt(0) - 65 // A=0, B=1, etc.
  return rowIndex * 10 + col
}

const getPositionLabel = (position: number): string => {
  if (!position) return 'Select Position'
  const row = String.fromCharCode(65 + Math.floor((position - 1) / 10))
  const col = ((position - 1) % 10) + 1
  return `${row}${col}`
}

const isPositionOccupied = (row: string, col: number): boolean => {
  return occupiedPositions.value.has(`${row}${col}`)
}

const selectPosition = (row: string, col: number) => {
  formData.value.storage_location.position = getPositionNumber(row, col)
}

// Age calculation
const calculateAge = () => {
  if (!formData.value.free_fields.dateOfBirth) {
    formData.value.free_fields.age = '';
    return;
  }
  
  const birthDate = new Date(formData.value.free_fields.dateOfBirth);
  const today = new Date();
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  formData.value.free_fields.age = age.toString();
}

// Geolocation handlers
const onCountryChange = () => {
  // Reset dependent fields
  formData.value.free_fields.geolocation.state = '';
  formData.value.free_fields.geolocation.lga = '';
  
  // Update state list based on country
  if (formData.value.free_fields.geolocation.country === 'Nigeria') {
    stateList.value = nigerianStates;
  } else {
    stateList.value = [];
  }
  lgaList.value = [];
}

const onStateChange = () => {
  // Reset dependent field
  formData.value.free_fields.geolocation.lga = '';
  
  // Update LGA list based on state
  if (formData.value.free_fields.geolocation.state === 'Lagos') {
    lgaList.value = lagosLGAs;
  } else {
    // Add other states' LGAs as needed
    lgaList.value = [];
  }
}

// File handling methods
const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    await processFiles(Array.from(target.files))
    target.value = '' // Reset input
  }
}

const handleFileDrop = async (event: DragEvent) => {
  isDragging.value = false
  if (event.dataTransfer?.files) {
    await processFiles(Array.from(event.dataTransfer.files))
  }
}

const processFiles = async (files: File[]) => {
  for (const file of files) {
    // Check file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      alert(`File ${file.name} is too large. Maximum size is 10MB.`)
      continue
    }

    const fileData: any = {
      file: file,
      name: file.name,
      size: file.size,
      type: file.type,
      isUrl: false
    }

    // Generate preview for images
    if (file.type.startsWith('image/')) {
      fileData.preview = await readFileAsDataURL(file)
    } else if (file.type === 'application/pdf') {
      // For PDFs, you could implement a PDF preview here
      fileData.preview = null
    }

    uploadedFiles.value.push(fileData)
  }
}

const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target?.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

const addImageFromUrl = async () => {
  if (!imageUrl.value) return;
  
  try {
    // Validate URL format
    const url = new URL(imageUrl.value);
    
    // Add to uploaded files
    uploadedFiles.value.push({
      file: null,
      name: url.pathname.split('/').pop() || 'image-from-url',
      size: 0,
      type: 'image/url',
      preview: imageUrl.value,
      isUrl: true,
      url: imageUrl.value
    });
    
    imageUrl.value = ''; // Clear input
  } catch (error) {
    alert('Please enter a valid URL');
  }
}

const removeFile = (index: number) => {
  uploadedFiles.value.splice(index, 1)
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

const getFileIcon = (type: string): string => {
  if (type.startsWith('image/') || type === 'image/url') return 'heroicons:photo'
  if (type === 'application/pdf') return 'heroicons:document-text'
  if (type.includes('sheet') || type.includes('csv')) return 'heroicons:table-cells'
  if (type.includes('word') || type.includes('document')) return 'heroicons:document'
  return 'heroicons:document'
}

const getFileTypeLabel = (type: string): string => {
  if (type.startsWith('image/') || type === 'image/url') return 'Image'
  if (type === 'application/pdf') return 'PDF'
  if (type.includes('sheet')) return 'Excel'
  if (type.includes('csv')) return 'CSV'
  if (type.includes('word')) return 'Word Document'
  return 'Document'
}

const openPreview = (file: any) => {
  // Create a blob URL and open in new tab for PDF preview
  if (file.file) {
    const blob = new Blob([file.file], { type: file.type })
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
  }
}

const validateStep = (step: number): boolean => {
  if (step === 1) {
    if (!formData.value.sample_serial_no || 
        !formData.value.sample_category_id || 
        !formData.value.sample_label ||
        !formData.value.collection_date || 
        !formData.value.collection_time ||
        !formData.value.researcher_info ||
        !formData.value.field_collector_info) {
      alert('Please fill in all required fields')
      return false
    }
  } else if (step === 2) {
    if (!formData.value.site_id || 
        !formData.value.storage_location.freezer || 
        !formData.value.storage_location.rack ||
        !formData.value.storage_location.box ||
        !formData.value.storage_location.position) {
      alert('Please complete all storage location fields and select a position')
      return false
    }
  }
  return true
}

const nextStep = () => {
  if (validateStep(currentStep.value) && currentStep.value < 4) {
    currentStep.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const resetForm = () => {
  formData.value = {
    site_id: '',
    sample_category_id: '',
    sample_serial_no: '',
    sample_label: '',
    collection_date: '',
    collection_time: '',
    researcher_info: '',
    field_collector_info: '',
    storage_location: {
      site: '',
      freezer: '',
      rack: '',
      box: '',
      position: 0
    },
    free_fields: {
      diagnosis: '',
      treatmentStatus: '',
      outcomes: '',
      dateOfBirth: '',
      age: '',
      sex: '',
      ethnicity: '',
      nationality: '',
      history: '',
      riskFactors: '',
      geolocation: {
        country: '',
        state: '',
        lga: '',
        city: '',
        address: ''
      }
    }
  }
  uploadedFiles.value = []
  uploadMethod.value = 'file'
  imageUrl.value = ''
  stateList.value = []
  lgaList.value = []
}

const close = () => {
  if (!loading.value) {
    currentStep.value = 1
    resetForm()
    emit('update:modelValue', false)
  }
}

const save = async () => {
  if (!validateStep(currentStep.value)) {
    return
  }

  // Set the site in storage_location to match site_id
  formData.value.storage_location.site = formData.value.site_id

  // Prepare payload matching the composable structure
  const payload = {
    site_id: formData.value.site_id,
    sample_category_id: formData.value.sample_category_id,
    sample_serial_no: formData.value.sample_serial_no,
    sample_label: formData.value.sample_label,
    collection_date: formData.value.collection_date,
    collection_time: formData.value.collection_time,
    researcher_info: formData.value.researcher_info,
    field_collector_info: formData.value.field_collector_info,
    storage_location: {
      site: formData.value.storage_location.site,
      freezer: formData.value.storage_location.freezer,
      rack: formData.value.storage_location.rack,
      box: formData.value.storage_location.box,
      position: formData.value.storage_location.position
    },
    free_fields: formData.value.free_fields,
    files: uploadedFiles.value.map(f => ({
      name: f.name,
      size: f.size,
      type: f.type,
      data: f.file,
      url: f.url,
      isUrl: f.isUrl
    }))
  }

  // Call the composable
  const result = await registerSample(payload)
  
  if (result) {
    // Emit success event with the result
    emit('saved', result)
    
    // Close modal and reset
    currentStep.value = 1
    resetForm()
    emit('update:modelValue', false)
  }
}
</script>

<style scoped>
/* Modal animations */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Step transition animations */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* Ensure modal content is scrollable */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>