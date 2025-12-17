<template>
  <NuxtLayout name="dashboard">
    <div class="space-y-6">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Total Specimen -->
        <div class="bg-white rounded-xl shadow-sm">

          <div class="flex items-center justify-between rounded-t-xl bg-[#F6F6F6] mb-4 px-6 py-4">
            <h3 class="w-full font-medium text-gray-600 bg-[#F6F6F6]">Total Specimen</h3>
          </div>
          <div class="flex  items-end justify-between px-6 pb-6">
            <div class="space-y-3">
              <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="40" height="40" rx="9" fill="#EBF1F5" />
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M23.0583 11.4942C23.1148 11.4135 23.1867 11.3447 23.2698 11.2918C23.3529 11.2388 23.4456 11.2028 23.5427 11.1857C23.6397 11.1686 23.7392 11.1708 23.8354 11.1922C23.9316 11.2135 24.0226 11.2537 24.1033 11.3102L30.6563 15.8982C30.7611 15.9715 30.8453 16.0704 30.9011 16.1855C30.9569 16.3005 30.9823 16.4279 30.975 16.5556C30.9677 16.6832 30.9279 16.8069 30.8593 16.9148C30.7908 17.0227 30.6957 17.1114 30.5833 17.1722L28.7733 18.1522L21.5733 28.4332C21.0303 29.2092 20.2203 30.1462 19.1433 30.6332C17.9963 31.1512 16.6463 31.1132 15.2123 30.1102C13.7783 29.1072 13.2813 27.8502 13.3753 26.5952C13.4653 25.4152 14.0683 24.3342 14.6113 23.5582L23.0583 11.4942ZM23.8573 12.9682L15.8403 24.4182C15.3473 25.1222 14.9303 25.9342 14.8713 26.7082C14.8193 27.4072 15.0483 28.1642 16.0713 28.8812C17.0953 29.5982 17.8863 29.5552 18.5253 29.2662C19.2323 28.9462 19.8523 28.2772 20.3453 27.5732L27.6453 17.1472C27.7122 17.0515 27.8006 16.9728 27.9033 16.9172L28.8023 16.4312L23.8573 12.9682Z"
                    fill="#475569" />
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M23.0583 11.4942C23.1148 11.4135 23.1867 11.3447 23.2698 11.2918C23.3529 11.2388 23.4456 11.2028 23.5427 11.1857C23.6397 11.1686 23.7392 11.1708 23.8354 11.1922C23.9316 11.2135 24.0226 11.2537 24.1033 11.3102L30.6563 15.8982C30.7611 15.9715 30.8453 16.0704 30.9011 16.1855C30.9569 16.3005 30.9823 16.4279 30.975 16.5556C30.9677 16.6832 30.9279 16.8069 30.8593 16.9148C30.7908 17.0227 30.6957 17.1114 30.5833 17.1722L28.7733 18.1522L21.5733 28.4332C21.0303 29.2092 20.2203 30.1462 19.1433 30.6332C17.9963 31.1512 16.6463 31.1132 15.2123 30.1102C13.7783 29.1072 13.2813 27.8502 13.3753 26.5952C13.4653 25.4152 14.0683 24.3342 14.6113 23.5582L23.0583 11.4942ZM23.8573 12.9682L19.0333 19.8582C21.5003 20.3502 22.4003 19.0002 25.7933 19.7922L27.6453 17.1472C27.7122 17.0515 27.8006 16.9728 27.9033 16.9172L28.8023 16.4312L23.8573 12.9682Z"
                    fill="#005B8F" />
                </svg>
              </div>
              <p class="text-3xl font-bold text-gray-900">{{ stats.totalSpecimen.toLocaleString() }}</p>
              <p class="text-sm text-[#16A34A] mt-1 flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                12% from last month
              </p>
            </div>
          </div>
        </div>

        <!-- Utilization -->
        <div class="bg-white rounded-xl shadow-sm">
          <div class="flex items-center justify-between rounded-t-xl bg-[#F6F6F6] mb-4 px-6 py-4">
            <h3 class="font-medium text-gray-600 bg-[#F6F6F6]">Utilization</h3>
          </div>
          <div class="flex items-end justify-between px-6 pb-6">
            <div class="space-y-3">
              <div class="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="40" height="40" rx="9" fill="#E7F3EF" />
                  <g clip-path="url(#clip0_2004_704)">
                    <path
                      d="M28.5127 21H23.0127C22.4596 21 22.0127 20.5531 22.0127 20V14.5C22.0127 13.9469 22.4627 13.4938 23.0096 13.5656C26.3533 14.0094 29.0033 16.6594 29.4471 20.0031C29.5189 20.55 29.0658 21 28.5127 21ZM19.4564 14.6625C20.0221 14.5438 20.5127 15.0063 20.5127 15.5844V21.75C20.5127 21.925 20.5752 22.0938 20.6846 22.2281L24.8127 27.2094C25.1783 27.65 25.1002 28.3156 24.5971 28.5875C23.5314 29.1688 22.3096 29.5 21.0127 29.5C16.8721 29.5 13.5127 26.1406 13.5127 22C13.5127 18.3906 16.0596 15.3781 19.4564 14.6625ZM27.4314 22.5H29.4314C30.0096 22.5 30.4721 22.9906 30.3533 23.5563C30.0346 25.0688 29.2596 26.4125 28.1783 27.4375C27.7939 27.8031 27.1908 27.725 26.8533 27.3156L24.2158 24.1375C23.6752 23.4844 24.1408 22.5 24.9846 22.5H27.4283H27.4314Z"
                      fill="#0FA36B" />
                  </g>
                  <defs>
                    <clipPath id="clip0_2004_704">
                      <rect width="18" height="16" fill="white" transform="translate(12.5 13.5)" />
                    </clipPath>
                  </defs>
                </svg>

              </div>
              <p class="text-3xl font-bold text-gray-900">{{ stats.utilization.toLocaleString() }}</p>
              <p class="text-sm text-[#16A34A] mt-1 flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                12% from last month
              </p>
            </div>
          </div>
        </div>

        <!-- Alerts -->
        <div class="bg-white rounded-xl shadow-sm">
          <div class="flex items-center justify-between rounded-t-xl bg-[#F6F6F6] mb-4 px-6 py-4">
            <h3 class="font-medium text-gray-600">Alerts</h3>
          </div>
          <div class="flex items-end justify-between px-6 pb-6">
            <div class="space-y-3">
              <div class="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="40" height="40" rx="9" fill="#FCEBFF" />
                  <path
                    d="M31.5311 20.3751L29.3951 16.8321C29.2388 16.5748 29.019 16.3619 28.7569 16.2138C28.4949 16.0657 28.1991 15.9873 27.8981 15.9861H26.2211V15.7371C26.2211 15.3775 26.1501 15.0214 26.0121 14.6894C25.8742 14.3573 25.6719 14.0557 25.4171 13.8021C24.9019 13.2887 24.2044 13.0003 23.4771 13.0001H13.4941C12.9508 12.9965 12.4187 13.1551 11.966 13.4556C11.5134 13.7561 11.1607 14.1849 10.9531 14.6871C10.8158 15.02 10.7464 15.377 10.7491 15.7371V24.6951C10.7497 25.1158 10.9026 25.522 11.1797 25.8386C11.4568 26.1552 11.8392 26.3607 12.2561 26.4171C12.2514 26.5071 12.2514 26.5967 12.2561 26.6861C12.2525 27.1102 12.3347 27.5307 12.4976 27.9223C12.6605 28.3139 12.9008 28.6686 13.2041 28.9651C13.5017 29.2748 13.858 29.5223 14.2522 29.6932C14.6463 29.864 15.0705 29.9547 15.5001 29.9601C16.3574 29.9523 17.1777 29.6091 17.7851 29.0041C18.392 28.4 18.7368 27.5813 18.7451 26.7251C18.7502 26.6425 18.7502 26.5596 18.7451 26.4771H24.2541C24.249 26.5596 24.249 26.6425 24.2541 26.7251C24.2504 27.1494 24.3325 27.57 24.4954 27.9618C24.6583 28.3536 24.8987 28.7085 25.2021 29.0051C25.5 29.3151 25.8566 29.5627 26.2511 29.7335C26.6456 29.9044 27.0702 29.995 27.5001 30.0001C28.3574 29.9923 29.1777 29.6491 29.7851 29.0441C30.3916 28.4398 30.7361 27.6212 30.7441 26.7651C30.7493 26.6821 30.7493 26.599 30.7441 26.5161H31.5001C31.6974 26.5132 31.8858 26.4338 32.0255 26.2946C32.1653 26.1554 32.2455 25.9673 32.2491 25.7701V22.8941C32.2491 22.0041 32.0001 21.1321 31.5311 20.3751ZM17.2371 26.6851C17.2374 26.9137 17.1916 27.14 17.1024 27.3504C17.0132 27.5609 16.8825 27.7513 16.7181 27.9101C16.3854 28.2262 15.944 28.4024 15.4851 28.4024C15.0262 28.4024 14.5848 28.2262 14.2521 27.9101C14.0899 27.7483 13.9615 27.5558 13.8743 27.344C13.7871 27.1322 13.7429 26.9051 13.7441 26.6761C13.7394 26.4395 13.7872 26.2049 13.8841 25.9891C14.0161 25.6761 14.2431 25.4121 14.5321 25.2321C14.8277 25.0367 15.1759 24.9362 15.5301 24.9441C15.8681 24.9441 16.1981 25.0441 16.4781 25.2321C16.7651 25.4151 16.9911 25.6781 17.1281 25.9891C17.2261 26.2041 17.2781 26.4391 17.2771 26.6761L17.2371 26.6851ZM20.4811 21.7091H15.4911C15.2269 21.7088 14.9736 21.604 14.7864 21.4176C14.5992 21.2312 14.4934 20.9782 14.4921 20.7141C14.4918 20.583 14.5175 20.4532 14.5676 20.3321C14.6177 20.211 14.6912 20.101 14.7839 20.0085C14.8767 19.9159 14.9868 19.8426 15.108 19.7928C15.2292 19.7429 15.3591 19.7175 15.4901 19.7181H20.4811C20.7453 19.7186 20.9985 19.8236 21.1855 20.0102C21.3725 20.1969 21.478 20.4499 21.4791 20.7141C21.4792 20.845 21.4535 20.9747 21.4033 21.0957C21.3532 21.2167 21.2796 21.3265 21.1869 21.419C21.0942 21.5114 20.9841 21.5847 20.8629 21.6345C20.7418 21.6842 20.6121 21.7096 20.4811 21.7091ZM20.4811 18.2851H15.4911C15.2269 18.2848 14.9736 18.18 14.7864 17.9936C14.5992 17.8072 14.4934 17.5542 14.4921 17.2901C14.492 17.1591 14.5177 17.0294 14.5679 16.9084C14.618 16.7875 14.6916 16.6776 14.7843 16.5851C14.877 16.4927 14.9871 16.4194 15.1083 16.3697C15.2294 16.3199 15.3591 16.2945 15.4901 16.2951H20.4811C20.7451 16.2956 20.9982 16.4005 21.1852 16.5869C21.3721 16.7733 21.4778 17.0261 21.4791 17.2901C21.4792 17.421 21.4535 17.5507 21.4033 17.6717C21.3532 17.7927 21.2796 17.9025 21.1869 17.995C21.0942 18.0874 20.9841 18.1607 20.8629 18.2105C20.7418 18.2602 20.6121 18.2856 20.4811 18.2851ZM29.2151 26.6851C29.2153 26.9137 29.1693 27.1401 29.08 27.3506C28.9906 27.561 28.8597 27.7513 28.6951 27.9101C28.3625 28.2259 27.9213 28.402 27.4626 28.402C27.0039 28.402 26.5627 28.2259 26.2301 27.9101C26.0678 27.7483 25.9392 27.556 25.8518 27.3441C25.7644 27.1323 25.72 26.9052 25.7211 26.6761C25.7169 26.3135 25.8329 25.9597 26.0511 25.6701C26.2971 25.3431 26.6501 25.1101 27.0491 25.0131H27.2991C27.3448 25.0022 27.3924 25.0022 27.4381 25.0131H27.6381C27.9411 25.0481 28.2301 25.1611 28.4761 25.3421C28.7231 25.5231 28.9161 25.7671 29.0351 26.0491C29.1341 26.2641 29.1851 26.4991 29.1851 26.7351L29.2151 26.6851Z"
                    fill="#9A0FB5" />
                  <path d="M27.4603 24.9341C27.4143 24.923 27.3663 24.923 27.3203 24.9341H27.4603Z" fill="black" />
                </svg>

              </div>
              <p class="text-3xl font-bold text-gray-900">{{ stats.alerts.toLocaleString() }}</p>
              <p class="text-sm text-[#16A34A] mt-1 flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                12% from last month
              </p>
            </div>
          </div>
        </div>

        <!-- Recent Transfer -->
        <div class="bg-white rounded-xl shadow-sm">
          <div class="flex items-center justify-between rounded-t-xl bg-[#F6F6F6] mb-4 px-6 py-4">
            <h3 class="text-sm font-medium text-gray-600">Recent Transfer</h3>
          </div>
          <div class="flex items-end justify-between px-6 pb-6">
            <div class="space-y-3">
              <div class="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="40" height="40" rx="9" fill="#FFF1E0" />
                  <path
                    d="M22.7992 12.6479L31.4332 27.6019C31.5648 27.83 31.6341 28.0886 31.6341 28.3519C31.6341 28.6152 31.5648 28.8739 31.4332 29.1019C31.3015 29.33 31.1122 29.5193 30.8842 29.651C30.6561 29.7826 30.3975 29.8519 30.1342 29.8519H12.8662C12.6029 29.8519 12.3442 29.7826 12.1162 29.651C11.8882 29.5193 11.6988 29.33 11.5672 29.1019C11.4355 28.8739 11.3662 28.6152 11.3662 28.3519C11.3662 28.0886 11.4355 27.83 11.5672 27.6019L20.2012 12.6479C20.7782 11.6479 22.2212 11.6479 22.7992 12.6479ZM21.5002 24.4999C21.235 24.4999 20.9806 24.6053 20.7931 24.7928C20.6055 24.9804 20.5002 25.2347 20.5002 25.4999C20.5002 25.7652 20.6055 26.0195 20.7931 26.2071C20.9806 26.3946 21.235 26.4999 21.5002 26.4999C21.7654 26.4999 22.0197 26.3946 22.2073 26.2071C22.3948 26.0195 22.5002 25.7652 22.5002 25.4999C22.5002 25.2347 22.3948 24.9804 22.2073 24.7928C22.0197 24.6053 21.7654 24.4999 21.5002 24.4999ZM21.5002 17.4999C21.2552 17.5 21.0188 17.5899 20.8358 17.7527C20.6528 17.9154 20.5358 18.1397 20.5072 18.3829L20.5002 18.4999V22.4999C20.5005 22.7548 20.5981 23 20.773 23.1853C20.948 23.3707 21.1871 23.4822 21.4416 23.4971C21.696 23.5121 21.9466 23.4293 22.142 23.2657C22.3375 23.1021 22.4631 22.87 22.4932 22.6169L22.5002 22.4999V18.4999C22.5002 18.2347 22.3948 17.9804 22.2073 17.7928C22.0197 17.6053 21.7654 17.4999 21.5002 17.4999Z"
                    fill="#FF9A26" />
                </svg>

              </div>
              <p class="text-3xl font-bold text-gray-900">{{ stats.recentTransfer.toLocaleString() }}</p>
              <p class="text-sm text-[#16A34A] mt-1 flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                12% from last month
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Freezer Capacity -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-medium text-gray-900">Freezer Capacity</h3>
            <span class="text-sm text-gray-500">Current Status</span>
          </div>
          <div class="flex items-center justify-between gap-8">
            <div class="flex-1">
              <canvas ref="donutChartRef" class="max-w-[250px] mx-auto"></canvas>
            </div>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-4 h-4 rounded-sm bg-[#1e6b8c]"></div>
                <span class="text-sm text-gray-600">80 Storage 45%</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-4 h-4 rounded-sm bg-[#2ecc71]"></div>
                <span class="text-sm text-gray-600">80 Storage 45%</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-4 h-4 rounded-sm bg-[#4a90e2]"></div>
                <span class="text-sm text-gray-600">80 Storage 45%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Sample Inventory -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-medium text-gray-900">Sample Inventory</h3>
            <span class="text-sm text-gray-500">Current Status</span>
          </div>
          <div>
            <canvas ref="lineChartRef" class="w-full" style="height: 250px;"></canvas>
          </div>
        </div>
      </div>

      <!-- Recent Transfers Table -->
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Recent Transfers</h3>
          <div class="flex items-center gap-3">
            <button @click="showFilterModal = true"
              class="flex px-6 py-3.5 items-center gap-2  bg-[#EAF7FF] rounded-lg transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.0001 12V19.88C14.0401 20.18 13.9401 20.5 13.7101 20.71C13.6176 20.8027 13.5077 20.8762 13.3868 20.9264C13.2658 20.9766 13.1361 21.0024 13.0051 21.0024C12.8742 21.0024 12.7445 20.9766 12.6235 20.9264C12.5025 20.8762 12.3926 20.8027 12.3001 20.71L10.2901 18.7C10.1811 18.5933 10.0982 18.4629 10.0479 18.319C9.99763 18.175 9.98127 18.0213 10.0001 17.87V12H9.97013L4.21013 4.62C4.04774 4.41153 3.97446 4.14726 4.00632 3.88493C4.03817 3.6226 4.17257 3.38355 4.38013 3.22C4.57013 3.08 4.78013 3 5.00013 3H19.0001C19.2201 3 19.4301 3.08 19.6201 3.22C19.8277 3.38355 19.9621 3.6226 19.9939 3.88493C20.0258 4.14726 19.9525 4.41153 19.7901 4.62L14.0301 12H14.0001Z" fill="#005B8F"/>
</svg>

              <span class="text-sm font-medium">Filter</span>
            </button>
            <button @click="exportData"
              class="flex px-6 py-3.5 items-center gap-2  bg-[#005B8F] text-white rounded-lg  transition-colors">
             <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2004_743)">
<path d="M3.01562 0C1.9125 0 1.01562 0.896875 1.01562 2V14C1.01562 15.1031 1.9125 16 3.01562 16H11.0156C12.1187 16 13.0156 15.1031 13.0156 14V11H15.4563L14.4875 11.9688C14.1938 12.2625 14.1938 12.7375 14.4875 13.0281C14.7812 13.3187 15.2563 13.3219 15.5469 13.0281L17.7969 10.7781C18.0906 10.4844 18.0906 10.0094 17.7969 9.71875L15.5469 7.46875C15.2531 7.175 14.7781 7.175 14.4875 7.46875C14.1969 7.7625 14.1938 8.2375 14.4875 8.52812L15.4563 9.49687H13.0156V5.325C13.0156 4.79375 12.8062 4.28438 12.4312 3.90937L9.1 0.584375C8.725 0.209375 8.21875 0 7.6875 0H3.01562ZM11.1875 5.5H8.26562C7.85 5.5 7.51562 5.16563 7.51562 4.75V1.82812L11.1875 5.5ZM7.01562 10.25C7.01562 9.83438 7.35 9.5 7.76562 9.5H11.0156V11H7.76562C7.35 11 7.01562 10.6656 7.01562 10.25Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_2004_743">
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
                <th class="text-left py-6 px-4 text-sm font-semibold text-gray-700">Transfer ID</th>
                <th class="text-left py-6 px-4 text-sm font-semibold text-gray-700">Sample Location</th>
                <th class="text-left py-6 px-4 text-sm font-semibold text-gray-700">Destination</th>
                <th class="text-left py-6 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th class="text-left py-6 px-4 text-sm font-semibold text-gray-700">Date/Time</th>
                <th class="text-left py-6 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="transfer in transfers" :key="transfer.id"
                class="border-b border-gray-50 hover:bg-gray-20 transition-colors">
                <td class="py-6 px-4">
                  <div class="flex items-center gap-2">
                    <span class="text-sm text-gray-900">{{ transfer.id }}</span>
                    <button @click="copyToClipboard(transfer.id)"
                      class="text-gray-400 hover:text-gray-600 transition-colors" title="Copy Transfer ID">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.24 2H11.346C9.582 2 8.184 2 7.091 2.148C5.965 2.3 5.054 2.62 4.336 3.341C3.617 4.062 3.298 4.977 3.147 6.107C3 7.205 3 8.608 3 10.379V16.217C3 17.725 3.92 19.017 5.227 19.559C5.16 18.649 5.16 17.374 5.16 16.312V11.302C5.16 10.021 5.16 8.916 5.278 8.032C5.405 7.084 5.691 6.176 6.425 5.439C7.159 4.702 8.064 4.415 9.008 4.287C9.888 4.169 10.988 4.169 12.265 4.169H15.335C16.611 4.169 17.709 4.169 18.59 4.287C18.3261 3.61329 17.8653 3.03474 17.2678 2.62678C16.6702 2.21883 15.9635 2.00041 15.24 2Z" fill="#E1E1E1"/>
<path d="M6.59961 11.3968C6.59961 8.67077 6.59961 7.30777 7.44361 6.46077C8.28661 5.61377 9.64361 5.61377 12.3596 5.61377H15.2396C17.9546 5.61377 19.3126 5.61377 20.1566 6.46077C21.0006 7.30777 20.9996 8.67077 20.9996 11.3968V16.2168C20.9996 18.9428 20.9996 20.3058 20.1566 21.1528C19.3126 21.9998 17.9546 21.9998 15.2396 21.9998H12.3596C9.64461 21.9998 8.28661 21.9998 7.44361 21.1528C6.59961 20.3058 6.59961 18.9428 6.59961 16.2168V11.3968Z" fill="#E1E1E1"/>
</svg>

                    </button>
                  </div>
                </td>
                <td class="py-6 px-4 text-sm text-gray-700">{{ transfer.sampleLocation }}</td>
                <td class="py-6 px-4 text-sm text-gray-700">{{ transfer.destination }}</td>
                <td class="py-6 px-4">
                  <span class="px-3 py-1 rounded-full text-xs font-medium" :class="{
                    'bg-green-100 text-green-700': transfer.status === 'Completed',
                    'bg-orange-100 text-orange-700': transfer.status === 'Pending',
                    'bg-blue-100 text-blue-700': transfer.status === 'In-Transit'
                  }">
                    {{ transfer.status }}
                  </span>
                </td>
                <td class="py-6 px-4 text-sm text-gray-700">{{ transfer.dateTime }}</td>
                <td class="py-6 px-4">
                  <div class="flex items-center gap-2">
                    <button @click="viewTransfer(transfer)" class="text-gray-600 hover:text-blue-600 transition-colors"
                      title="View">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button @click="editTransfer(transfer)" class="text-gray-600 hover:text-blue-600 transition-colors"
                      title="Edit">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
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

    <!-- Filter Modal -->
    <Teleport to="body">
      <div v-if="showFilterModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click.self="showFilterModal = false">
        <div class="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-medium text-gray-900">Filter Transfers</h3>
            <button @click="showFilterModal = false" class="text-gray-400 hover:text-gray-600 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="space-y-4">
            <div>
              <!-- <label class="block text-sm font-medium text-gray-700 mb-2">Status</label> -->
              <!-- <select
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="in-transit">In-Transit</option>
              </select> -->
            <UiSelectInput 
              v-model="selectedStatus" 
              label="Status"
              :options="statuses"
              position="standalone"
            />
            </div>

            <div>
           <CoreDateRangePicker v-model="dateRange" />
              <!-- <label class="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <input type="date"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" /> -->
            </div>

            <div class="flex gap-3 pt-4">
              <button @click="applyFilters"
                class="flex-1 bg-[#005B8F] text-sm text-white px-4 py-3 rounded-lg  transition-colors">
                Apply Filters
              </button>
              <button @click="resetFilters"
                class="flex-1 border-[0.5px] text-sm border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
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
import Chart from 'chart.js/auto'

interface Transfer {
  id: string
  sampleLocation: string
  destination: string
  status: 'Completed' | 'Pending' | 'In-Transit'
  dateTime: string
}

const stats = ref({
  totalSpecimen: 24500,
  utilization: 24500,
  alerts: 24500,
  recentTransfer: 24500
})


const dateRange = ref<{ start: Date | null; end: Date | null }>({
  start: null,
  end: null
})

const selectedStatus = ref("")
const selectedDate = ref("")

const statuses = ref([
  "Completed",
  "Pending",
  "Transit"
])

const transfers = ref<Transfer[]>([
  {
    id: 'TRF-2025-001',
    sampleLocation: 'Lab A - Freezer 2',
    destination: 'Lab B - Freezer 3',
    status: 'Completed',
    dateTime: 'Jan 15, 2024 10:23'
  },
  {
    id: 'TRF-2025-001',
    sampleLocation: 'Lab A - Freezer 2',
    destination: 'Lab B - Freezer 3',
    status: 'Pending',
    dateTime: 'Jan 15, 2024 16:30'
  },
  {
    id: 'TRF-2025-001',
    sampleLocation: 'Lab A - Freezer 2',
    destination: 'Lab B - Freezer 3',
    status: 'Completed',
    dateTime: 'Jan 15, 2024 10:23'
  },
  {
    id: 'TRF-2025-001',
    sampleLocation: 'Lab A - Freezer 2',
    destination: 'Lab B - Freezer 3',
    status: 'In-Transit',
    dateTime: 'Jan 15, 2024 10:23'
  }
])

const showFilterModal = ref(false)
const donutChartRef = ref<HTMLCanvasElement | null>(null)
const lineChartRef = ref<HTMLCanvasElement | null>(null)
let donutChart: Chart | null = null
let lineChart: Chart | null = null

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    alert('Transfer ID copied to clipboard!')
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const viewTransfer = (transfer: Transfer) => {
  console.log('Viewing transfer:', transfer)
  // Navigate to detail page or open modal
}

const editTransfer = (transfer: Transfer) => {
  console.log('Editing transfer:', transfer)
  // Navigate to edit page or open modal
}

const exportData = () => {
  // Implement CSV export
  const csv = [
    ['Transfer ID', 'Sample Location', 'Destination', 'Status', 'Date/Time'],
    ...transfers.value.map(t => [t.id, t.sampleLocation, t.destination, t.status, t.dateTime])
  ].map(row => row.join(',')).join('\n')

  const blob = new Blob([csv], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'transfers.csv'
  a.click()
  window.URL.revokeObjectURL(url)
}

const applyFilters = () => {
  showFilterModal.value = false
  // Apply filter logic here
}

const resetFilters = () => {
  showFilterModal.value = false
  // Reset filter logic here
}

const initCharts = () => {
  // Donut Chart
  if (donutChartRef.value) {
    const ctx = donutChartRef.value.getContext('2d')
    if (ctx) {
      donutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Storage 1', 'Storage 2', 'Storage 3'],
          datasets: [{
            data: [45, 45, 10],
            backgroundColor: ['#1e6b8c', '#2ecc71', '#4a90e2'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          cutout: '70%',
          plugins: {
            legend: {
              display: false
            }
          }
        }
      })
    }
  }

  // Line Chart
  if (lineChartRef.value) {
    const ctx = lineChartRef.value.getContext('2d')
    if (ctx) {
      lineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            data: [12000, 14000, 13000, 16000, 15000, 17000, 19000, 18000, 20000, 21000, 22000, 24000],
            borderColor: '#1e6b8c',
            backgroundColor: 'transparent',
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: false,
              grid: {
                color: '#f3f4f6'
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          }
        }
      })
    }
  }
}

onMounted(() => {
  nextTick(() => {
    initCharts()
  })
})

onUnmounted(() => {
  if (donutChart) {
    donutChart.destroy()
  }
  if (lineChart) {
    lineChart.destroy()
  }
})
</script>