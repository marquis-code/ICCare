<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-[#005B8F] fixed h-full overflow-y-auto flex flex-col">
      <!-- Logo -->
      <div class="p-6 border-b bg-white">
        <NuxtLink to="/dashboard" class="flex items-center gap-2">
          <img src="@/assets/img/logo.png" class="h-10 w-auto" alt="iCCaRE Logo" />
        </NuxtLink>
      </div>

      <!-- Navigation -->
      <nav class="p-4 flex-1">
        <!-- Core Operations -->
        <div class="mb-6">
      <div class="my-6">
            <h3 class="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3 px-3">
            Core Operations
          </h3>
      </div>
          <div class="space-y-6 pt-6">
            <NuxtLink to="/dashboard"
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:bg-white/10 transition-colors"
              :class="{ 'bg-[#DCF1FF] text-[#005B8F]': isActiveRoute('/dashboard') }">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.9949 4.68V8.56C10.9949 8.88127 10.9315 9.19938 10.8082 9.49606C10.685 9.79275 10.5044 10.0622 10.2767 10.2889C10.0491 10.5156 9.77894 10.6951 9.48175 10.8171C9.18456 10.9392 8.8662 11.0013 8.54494 11H4.68494C4.36454 11.0019 4.04704 10.9392 3.75149 10.8155C3.45594 10.6917 3.1884 10.5096 2.96494 10.28C2.73805 10.055 2.55838 9.78697 2.43646 9.49161C2.31454 9.19625 2.25282 8.87952 2.25494 8.56V4.69C2.25493 4.0446 2.51063 3.42549 2.96606 2.96819C3.42148 2.51088 4.03954 2.25265 4.68494 2.25H8.55494C8.875 2.25031 9.19182 2.3141 9.48706 2.43769C9.7823 2.56128 10.0501 2.74221 10.2749 2.97C10.5024 3.19298 10.6832 3.45902 10.8069 3.75261C10.9305 4.04619 10.9944 4.36145 10.9949 4.68ZM21.7449 4.69V8.56C21.7397 9.2038 21.4824 9.81991 21.0281 10.2761C20.5738 10.7323 19.9587 10.9922 19.3149 11H15.4349C14.7881 10.996 14.168 10.7416 13.7049 10.29C13.4786 10.0625 13.2995 9.79258 13.1776 9.49572C13.0558 9.19886 12.9937 8.88088 12.9949 8.56V4.69C12.9941 4.36977 13.0574 4.05261 13.1811 3.75722C13.3047 3.46182 13.4862 3.19416 13.7149 2.97C13.9398 2.74221 14.2076 2.56128 14.5028 2.43769C14.798 2.3141 15.1149 2.25031 15.4349 2.25H19.3049C19.9504 2.25523 20.568 2.51398 21.0245 2.97044C21.481 3.4269 21.7397 4.04449 21.7449 4.69ZM21.7449 15.44V19.31C21.7397 19.9538 21.4824 20.5699 21.0281 21.0261C20.5738 21.4823 19.9587 21.7422 19.3149 21.75H15.4349C14.784 21.7566 14.1562 21.5091 13.6849 21.06C13.4578 20.8331 13.278 20.5634 13.1561 20.2664C13.0342 19.9693 12.9726 19.651 12.9749 19.33V15.46C12.9741 15.1398 13.0374 14.8226 13.1611 14.5272C13.2847 14.2318 13.4662 13.9642 13.6949 13.74C13.9198 13.5122 14.1876 13.3313 14.4828 13.2077C14.778 13.0841 15.0949 13.0203 15.4149 13.02H19.2849C19.9304 13.0252 20.548 13.284 21.0045 13.7404C21.461 14.1969 21.7197 14.8145 21.7249 15.46L21.7449 15.44ZM10.9949 15.45V19.32C10.9871 19.9655 10.7258 20.582 10.2675 21.0366C9.80912 21.4912 9.19047 21.7474 8.54494 21.75H4.68494C4.36545 21.7513 4.04887 21.6894 3.75345 21.5677C3.45803 21.4461 3.18963 21.2671 2.96372 21.0412C2.73781 20.8153 2.55886 20.5469 2.43721 20.2515C2.31556 19.9561 2.25361 19.6395 2.25494 19.32V15.45C2.25751 14.8045 2.51373 14.1858 2.96832 13.7275C3.42291 13.2691 4.03944 13.0079 4.68494 13H8.55494C9.20314 13.0066 9.82342 13.2648 10.2849 13.72C10.741 14.1801 10.9963 14.8021 10.9949 15.45Z"
                  fill="white" />
              </svg>

              <span class="font-medium">Dashboard</span>
            </NuxtLink>

            <!-- Biospecimen Management Dropdown -->
            <div>
              <button @click="toggleBiospecimen"
                class="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:bg-white/10 transition-colors w-full"
                :class="{ 'bg-[#DCF1FF] text-[#005B8F]': isActiveRoute('/biospecimen') }">
                <div class="flex items-center gap-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M13.5583 1.99423C13.6148 1.9135 13.6867 1.8447 13.7698 1.79175C13.8529 1.73881 13.9456 1.70277 14.0427 1.68568C14.1397 1.66859 14.2392 1.6708 14.3354 1.69217C14.4316 1.71354 14.5226 1.75365 14.6033 1.81023L21.1563 6.39823C21.2611 6.47154 21.3453 6.57042 21.4011 6.68547C21.4569 6.80053 21.4823 6.92793 21.475 7.05558C21.4677 7.18323 21.4279 7.30689 21.3593 7.41482C21.2908 7.52275 21.1957 7.61135 21.0833 7.67223L19.2733 8.65223L12.0733 18.9332C11.5303 19.7092 10.7203 20.6462 9.6433 21.1332C8.4963 21.6512 7.1463 21.6132 5.7123 20.6102C4.2783 19.6072 3.7813 18.3502 3.8753 17.0952C3.9653 15.9152 4.5683 14.8342 5.1113 14.0582L13.5583 1.99423ZM14.3573 3.46823L6.3403 14.9182C5.8473 15.6222 5.4303 16.4342 5.3713 17.2082C5.3193 17.9072 5.5483 18.6642 6.5713 19.3812C7.5953 20.0982 8.3863 20.0552 9.0253 19.7662C9.7323 19.4462 10.3523 18.7772 10.8453 18.0732L18.1453 7.64723C18.2122 7.55152 18.3006 7.47276 18.4033 7.41723L19.3023 6.93123L14.3573 3.46823Z"
                      fill="#475569" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M13.5583 1.99423C13.6148 1.9135 13.6867 1.8447 13.7698 1.79175C13.8529 1.73881 13.9456 1.70277 14.0427 1.68568C14.1397 1.66859 14.2392 1.6708 14.3354 1.69217C14.4316 1.71354 14.5226 1.75365 14.6033 1.81023L21.1563 6.39823C21.2611 6.47154 21.3453 6.57042 21.4011 6.68547C21.4569 6.80053 21.4823 6.92793 21.475 7.05558C21.4677 7.18323 21.4279 7.30689 21.3593 7.41482C21.2908 7.52275 21.1957 7.61135 21.0833 7.67223L19.2733 8.65223L12.0733 18.9332C11.5303 19.7092 10.7203 20.6462 9.6433 21.1332C8.4963 21.6512 7.1463 21.6132 5.7123 20.6102C4.2783 19.6072 3.7813 18.3502 3.8753 17.0952C3.9653 15.9152 4.5683 14.8342 5.1113 14.0582L13.5583 1.99423ZM14.3573 3.46823L9.5333 10.3582C12.0003 10.8502 12.9003 9.50023 16.2933 10.2922L18.1453 7.64723C18.2122 7.55152 18.3006 7.47276 18.4033 7.41723L19.3023 6.93123L14.3573 3.46823Z"
                      fill="white" />
                  </svg>

                  <span class="font-medium">Biospecimen Management</span>
                </div>
                <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': biospecimenOpen }" fill="none"
                  stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <!-- Biospecimen Submenu -->
              <transition enter-active-class="transition-all duration-200 ease-out" enter-from-class="max-h-0 opacity-0"
                enter-to-class="max-h-96 opacity-100" leave-active-class="transition-all duration-150 ease-in"
                leave-from-class="max-h-96 opacity-100" leave-to-class="max-h-0 opacity-0">
                <div v-if="biospecimenOpen" class="mt-1 ml-3 space-y-1 overflow-hidden">
                  <NuxtLink to="/biospecimen/create-attributes"
                    class="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:bg-white/10 transition-colors text-sm"
                    :class="{ 'bg-white/20 text-white': isActiveRoute('/biospecimen/create-attributes') }">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span class="font-medium">Create Attributes</span>
                  </NuxtLink>

                  <NuxtLink to="/biospecimen/registration"
                    class="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:bg-white/10 transition-colors text-sm"
                    :class="{ 'bg-white/20 text-white': isActiveRoute('/biospecimen/registration') }">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span class="font-medium">Registration</span>
                  </NuxtLink>

                  <NuxtLink to="/biospecimen/tracking"
                    class="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:bg-white/10 transition-colors text-sm"
                    :class="{ 'bg-white/20 text-white': isActiveRoute('/biospecimen/tracking') }">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span class="font-medium">Tracking</span>
                  </NuxtLink>

                  <NuxtLink to="/biospecimen/bulk-upload"
                    class="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:bg-white/10 transition-colors text-sm"
                    :class="{ 'bg-white/20 text-white': isActiveRoute('/biospecimen/bulk-upload') }">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span class="font-medium">Bulk Upload</span>
                  </NuxtLink>
                </div>
              </transition>
            </div>

            <NuxtLink to="/user-management"
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:bg-white/10 transition-colors"
              :class="{ 'bg-[#DCF1FF] text-[#005B8F]': isActiveRoute('/user-management') }">
              <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_2540_52" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
                  height="24">
                  <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_2540_52)">
                  <path
                    d="M0 18V16.425C0 15.7083 0.366667 15.125 1.1 14.675C1.83333 14.225 2.8 14 4 14C4.21667 14 4.425 14.0042 4.625 14.0125C4.825 14.0208 5.01667 14.0417 5.2 14.075C4.96667 14.425 4.79167 14.7917 4.675 15.175C4.55833 15.5583 4.5 15.9583 4.5 16.375V18H0ZM6 18V16.375C6 15.8417 6.14583 15.3542 6.4375 14.9125C6.72917 14.4708 7.14167 14.0833 7.675 13.75C8.20833 13.4167 8.84583 13.1667 9.5875 13C10.3292 12.8333 11.1333 12.75 12 12.75C12.8833 12.75 13.6958 12.8333 14.4375 13C15.1792 13.1667 15.8167 13.4167 16.35 13.75C16.8833 14.0833 17.2917 14.4708 17.575 14.9125C17.8583 15.3542 18 15.8417 18 16.375V18H6ZM19.5 18V16.375C19.5 15.9417 19.4458 15.5333 19.3375 15.15C19.2292 14.7667 19.0667 14.4083 18.85 14.075C19.0333 14.0417 19.2208 14.0208 19.4125 14.0125C19.6042 14.0042 19.8 14 20 14C21.2 14 22.1667 14.2208 22.9 14.6625C23.6333 15.1042 24 15.6917 24 16.425V18H19.5ZM8.125 16H15.9C15.7333 15.6667 15.2708 15.375 14.5125 15.125C13.7542 14.875 12.9167 14.75 12 14.75C11.0833 14.75 10.2458 14.875 9.4875 15.125C8.72917 15.375 8.275 15.6667 8.125 16ZM4 13C3.45 13 2.97917 12.8042 2.5875 12.4125C2.19583 12.0208 2 11.55 2 11C2 10.4333 2.19583 9.95833 2.5875 9.575C2.97917 9.19167 3.45 9 4 9C4.56667 9 5.04167 9.19167 5.425 9.575C5.80833 9.95833 6 10.4333 6 11C6 11.55 5.80833 12.0208 5.425 12.4125C5.04167 12.8042 4.56667 13 4 13ZM20 13C19.45 13 18.9792 12.8042 18.5875 12.4125C18.1958 12.0208 18 11.55 18 11C18 10.4333 18.1958 9.95833 18.5875 9.575C18.9792 9.19167 19.45 9 20 9C20.5667 9 21.0417 9.19167 21.425 9.575C21.8083 9.95833 22 10.4333 22 11C22 11.55 21.8083 12.0208 21.425 12.4125C21.0417 12.8042 20.5667 13 20 13ZM12 12C11.1667 12 10.4583 11.7083 9.875 11.125C9.29167 10.5417 9 9.83333 9 9C9 8.15 9.29167 7.4375 9.875 6.8625C10.4583 6.2875 11.1667 6 12 6C12.85 6 13.5625 6.2875 14.1375 6.8625C14.7125 7.4375 15 8.15 15 9C15 9.83333 14.7125 10.5417 14.1375 11.125C13.5625 11.7083 12.85 12 12 12ZM12 10C12.2833 10 12.5208 9.90417 12.7125 9.7125C12.9042 9.52083 13 9.28333 13 9C13 8.71667 12.9042 8.47917 12.7125 8.2875C12.5208 8.09583 12.2833 8 12 8C11.7167 8 11.4792 8.09583 11.2875 8.2875C11.0958 8.47917 11 8.71667 11 9C11 9.28333 11.0958 9.52083 11.2875 9.7125C11.4792 9.90417 11.7167 10 12 10Z"
                    fill="white" />
                </g>
              </svg>

              <span class="font-medium">User Management</span>
            </NuxtLink>

            <NuxtLink to="/reports"
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:bg-white/10 transition-colors"
              :class="{ 'bg-[#DCF1FF] text-[#005B8F]': isActiveRoute('/reports') }">
              <svg width="24" height="24" stroke="currentColor" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_2540_311" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
                  height="24">
                  <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_2540_311)">
                  <path
                    d="M3 21V19L5 17V21H3ZM7 21V15L9 13V21H7ZM11 21V13L13 15.025V21H11ZM15 21V15.025L17 13.025V21H15ZM19 21V11L21 9V21H19ZM3 15.825V13L10 6L14 10L21 3V5.825L14 12.825L10 8.825L3 15.825Z"
                    fill="white" />
                </g>
              </svg>

              <span class="font-medium">Reporting</span>
            </NuxtLink>

            <NuxtLink to="/activity-log"
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:bg-white/10 transition-colors"
              :class="{ 'bg-[#DCF1FF] text-[#005B8F]': isActiveRoute('/activity-log') }">
              <svg width="24" height="24" stroke="currentColor" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M5.25 3.75V20.25H18.75V3.75H5.25ZM4.5 1.5C4.10218 1.5 3.72064 1.65804 3.43934 1.93934C3.15804 2.22064 3 2.60218 3 3V21C3 21.3978 3.15804 21.7794 3.43934 22.0607C3.72064 22.342 4.10218 22.5 4.5 22.5H19.5C19.8978 22.5 20.2794 22.342 20.5607 22.0607C20.842 21.7794 21 21.3978 21 21V3C21 2.60218 20.842 2.22064 20.5607 1.93934C20.2794 1.65804 19.8978 1.5 19.5 1.5H4.5ZM12 16.5C12 16.2016 12.1185 15.9155 12.3295 15.7045C12.5405 15.4935 12.8266 15.375 13.125 15.375H15.75C16.0484 15.375 16.3345 15.4935 16.5455 15.7045C16.7565 15.9155 16.875 16.2016 16.875 16.5C16.875 16.7984 16.7565 17.0845 16.5455 17.2955C16.3345 17.5065 16.0484 17.625 15.75 17.625H13.125C12.8266 17.625 12.5405 17.5065 12.3295 17.2955C12.1185 17.0845 12 16.7984 12 16.5ZM9 18C9.39782 18 9.77936 17.842 10.0607 17.5607C10.342 17.2794 10.5 16.8978 10.5 16.5C10.5 16.1022 10.342 15.7206 10.0607 15.4393C9.77936 15.158 9.39782 15 9 15C8.60218 15 8.22064 15.158 7.93934 15.4393C7.65804 15.7206 7.5 16.1022 7.5 16.5C7.5 16.8978 7.65804 17.2794 7.93934 17.5607C8.22064 17.842 8.60218 18 9 18ZM12 12C12 11.7016 12.1185 11.4155 12.3295 11.2045C12.5405 10.9935 12.8266 10.875 13.125 10.875H15.75C16.0484 10.875 16.3345 10.9935 16.5455 11.2045C16.7565 11.4155 16.875 11.7016 16.875 12C16.875 12.2984 16.7565 12.5845 16.5455 12.7955C16.3345 13.0065 16.0484 13.125 15.75 13.125H13.125C12.8266 13.125 12.5405 13.0065 12.3295 12.7955C12.1185 12.5845 12 12.2984 12 12ZM9 13.5C9.39782 13.5 9.77936 13.342 10.0607 13.0607C10.342 12.7794 10.5 12.3978 10.5 12C10.5 11.6022 10.342 11.2206 10.0607 10.9393C9.77936 10.658 9.39782 10.5 9 10.5C8.60218 10.5 8.22064 10.658 7.93934 10.9393C7.65804 11.2206 7.5 11.6022 7.5 12C7.5 12.3978 7.65804 12.7794 7.93934 13.0607C8.22064 13.342 8.60218 13.5 9 13.5ZM12 7.5C12 7.20163 12.1185 6.91548 12.3295 6.7045C12.5405 6.49353 12.8266 6.375 13.125 6.375H15.75C16.0484 6.375 16.3345 6.49353 16.5455 6.7045C16.7565 6.91548 16.875 7.20163 16.875 7.5C16.875 7.79837 16.7565 8.08452 16.5455 8.2955C16.3345 8.50647 16.0484 8.625 15.75 8.625H13.125C12.8266 8.625 12.5405 8.50647 12.3295 8.2955C12.1185 8.08452 12 7.79837 12 7.5ZM9 9C9.39782 9 9.77936 8.84196 10.0607 8.56066C10.342 8.27936 10.5 7.89782 10.5 7.5C10.5 7.10218 10.342 6.72064 10.0607 6.43934C9.77936 6.15804 9.39782 6 9 6C8.60218 6 8.22064 6.15804 7.93934 6.43934C7.65804 6.72064 7.5 7.10218 7.5 7.5C7.5 7.89782 7.65804 8.27936 7.93934 8.56066C8.22064 8.84196 8.60218 9 9 9Z"
                  fill="white" />
              </svg>

              <span class="font-medium">Activity Log</span>
            </NuxtLink>

            <NuxtLink to="/notification"
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:bg-white/10 transition-colors"
              :class="{ 'bg-[#DCF1FF] text-[#005B8F]': isActiveRoute('/notification') }">
              <svg width="24" height="24" stroke="currentColor" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M14.7521 1.914C14.1918 2.68512 13.852 3.59423 13.7692 4.5438C13.6864 5.49337 13.8636 6.44758 14.282 7.30406C14.7003 8.16054 15.3439 8.88697 16.1437 9.40543C16.9436 9.92389 17.8695 10.2148 18.8221 10.247V10.258C18.8371 10.456 18.8521 10.659 18.8721 10.855C19.1091 13.102 19.6491 14.645 20.1681 15.658C20.5131 16.333 20.8521 16.781 21.0921 17.052C21.1974 17.1715 21.311 17.2834 21.4321 17.387L21.4421 17.393C21.5704 17.4861 21.6659 17.6175 21.7149 17.7683C21.7639 17.9191 21.7638 18.0815 21.7147 18.2323C21.6656 18.383 21.57 18.5143 21.4416 18.6074C21.3132 18.7004 21.1586 18.7503 21.0001 18.75H3.00009C2.84189 18.7498 2.6878 18.6996 2.55986 18.6066C2.43192 18.5135 2.33667 18.3824 2.28775 18.232C2.23882 18.0815 2.23872 17.9195 2.28745 17.769C2.33619 17.6184 2.43127 17.4872 2.55909 17.394L2.56709 17.387L2.63109 17.333C2.69109 17.279 2.78809 17.188 2.90809 17.052C3.14809 16.782 3.48709 16.334 3.83209 15.659C4.52209 14.31 5.25009 12.03 5.25009 8.4C5.25009 6.519 5.95009 4.706 7.21009 3.362C8.47209 2.016 10.1941 1.25 12.0001 1.25C12.3828 1.25 12.7604 1.28367 13.1331 1.351C13.3711 1.394 14.1511 1.637 14.7521 1.914Z"
                  fill="white" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M15.25 5C15.25 4.00544 15.6451 3.05161 16.3484 2.34835C17.0516 1.64509 18.0055 1.25 19 1.25C19.9946 1.25 20.9484 1.64509 21.6517 2.34835C22.3549 3.05161 22.75 4.00544 22.75 5C22.75 5.99456 22.3549 6.94839 21.6517 7.65165C20.9484 8.35491 19.9946 8.75 19 8.75C18.0055 8.75 17.0516 8.35491 16.3484 7.65165C15.6451 6.94839 15.25 5.99456 15.25 5ZM9.89404 20.351C9.97926 20.3016 10.0734 20.2695 10.171 20.2565C10.2687 20.2435 10.3679 20.2498 10.4631 20.2752C10.5583 20.3005 10.6475 20.3444 10.7258 20.4042C10.804 20.4641 10.8697 20.5388 10.919 20.624C11.0289 20.8133 11.1867 20.9704 11.3764 21.0796C11.5661 21.1889 11.7811 21.2464 12 21.2464C12.2189 21.2464 12.434 21.1889 12.6237 21.0796C12.8134 20.9704 12.9711 20.8133 13.081 20.624C13.1305 20.5388 13.1962 20.4641 13.2745 20.4043C13.3528 20.3445 13.4421 20.3007 13.5373 20.2754C13.6326 20.2501 13.7319 20.2438 13.8295 20.2568C13.9272 20.2699 14.0213 20.3021 14.1065 20.3515C14.1918 20.4009 14.2664 20.4667 14.3262 20.545C14.3861 20.6233 14.4299 20.7126 14.4552 20.8078C14.4805 20.903 14.4868 21.0023 14.4737 21.1C14.4607 21.1976 14.4285 21.2918 14.379 21.377C14.1373 21.7938 13.7903 22.1399 13.3728 22.3804C12.9553 22.6209 12.4819 22.7476 12 22.7476C11.5182 22.7476 11.0448 22.6209 10.6273 22.3804C10.2097 22.1399 9.86274 21.7938 9.62104 21.377C9.5715 21.2917 9.53926 21.1975 9.52617 21.0998C9.51308 21.002 9.51939 20.9027 9.54475 20.8074C9.57011 20.7121 9.61401 20.6227 9.67394 20.5444C9.73388 20.4661 9.80867 20.4004 9.89404 20.351Z"
                  fill="white" />
              </svg>

              <span class="font-medium">Manage My Notification</span>
            </NuxtLink>

            <NuxtLink to="/profile"
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:bg-white/10 transition-colors"
              :class="{ 'bg-[#DCF1FF] text-[#005B8F]': isActiveRoute('/profile') }">
              <svg width="24" height="24" stroke="currentColor" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M8 7C8 5.93913 8.42143 4.92172 9.17157 4.17157C9.92172 3.42143 10.9391 3 12 3C13.0609 3 14.0783 3.42143 14.8284 4.17157C15.5786 4.92172 16 5.93913 16 7C16 8.06087 15.5786 9.07828 14.8284 9.82843C14.0783 10.5786 13.0609 11 12 11C10.9391 11 9.92172 10.5786 9.17157 9.82843C8.42143 9.07828 8 8.06087 8 7ZM8 13C6.67392 13 5.40215 13.5268 4.46447 14.4645C3.52678 15.4021 3 16.6739 3 18C3 18.7956 3.31607 19.5587 3.87868 20.1213C4.44129 20.6839 5.20435 21 6 21H18C18.7956 21 19.5587 20.6839 20.1213 20.1213C20.6839 19.5587 21 18.7956 21 18C21 16.6739 20.4732 15.4021 19.5355 14.4645C18.5979 13.5268 17.3261 13 16 13H8Z"
                  fill="white" />
              </svg>

              <span class="font-medium">Profile</span>
            </NuxtLink>
          </div>
        </div>
      </nav>

      <!-- Logout -->
      <div class="p-4 border-t border-[#004a73]">
        <button @click="showLogoutModal = true"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:bg-white/10 transition-colors w-full">
          <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5 21C4.45 21 3.97933 20.8043 3.588 20.413C3.19667 20.0217 3.00067 19.5507 3 19V5C3 4.45 3.196 3.97933 3.588 3.588C3.98 3.19667 4.45067 3.00067 5 3H11C11.2833 3 11.521 3.096 11.713 3.288C11.905 3.48 12.0007 3.71733 12 4C11.9993 4.28267 11.9033 4.52033 11.712 4.713C11.5207 4.90567 11.2833 5.00133 11 5H5V19H11C11.2833 19 11.521 19.096 11.713 19.288C11.905 19.48 12.0007 19.7173 12 20C11.9993 20.2827 11.9033 20.5203 11.712 20.713C11.5207 20.9057 11.2833 21.0013 11 21H5ZM17.175 13H10C9.71667 13 9.47933 12.904 9.288 12.712C9.09667 12.52 9.00067 12.2827 9 12C8.99933 11.7173 9.09533 11.48 9.288 11.288C9.48067 11.096 9.718 11 10 11H17.175L15.3 9.125C15.1167 8.94167 15.025 8.71667 15.025 8.45C15.025 8.18333 15.1167 7.95 15.3 7.75C15.4833 7.55 15.7167 7.44567 16 7.437C16.2833 7.42833 16.525 7.52433 16.725 7.725L20.3 11.3C20.5 11.5 20.6 11.7333 20.6 12C20.6 12.2667 20.5 12.5 20.3 12.7L16.725 16.275C16.525 16.475 16.2877 16.571 16.013 16.563C15.7383 16.555 15.5007 16.4507 15.3 16.25C15.1167 16.05 15.0293 15.8127 15.038 15.538C15.0467 15.2633 15.1423 15.034 15.325 14.85L17.175 13Z"
              fill="white" />
          </svg>

          <span class="font-medium">Log Out</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 ml-64">
      <!-- Header -->
      <header class="bg-white shadow-sm sticky top-0 z-10">
        <div class="px-6 py-4 flex items-center justify-between">
          <!-- Search -->
          <div class="flex-1 max-w-xl">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input type="text" placeholder="Search samples, sites" @focus="showSearchModal = true"
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005B8F] focus:border-transparent cursor-pointer"
                readonly />
            </div>
          </div>

          <!-- User Info -->
          <div class="flex items-center gap-4">
            <!-- Notification Icon -->
            <div class="relative">
              <button @click="toggleNotifications" class="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span v-if="notifications.length > 0"
                  class="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                  {{ notifications.length }}
                </span>
              </button>

              <!-- Notification Dropdown -->
              <transition enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95">
                <div v-if="showNotifications"
                  class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
                  <div class="p-4 border-b border-gray-200 bg-gray-50">
                    <h3 class="font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div class="max-h-96 overflow-y-auto">
                    <div v-if="notifications.length === 0" class="p-4 text-center text-gray-500">
                      No new notifications
                    </div>
                    <div v-for="notification in notifications" :key="notification.id"
                      class="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                      <p class="text-sm font-medium text-gray-900">{{ notification.title }}</p>
                      <p class="text-xs text-gray-500 mt-1">{{ notification.message }}</p>
                      <p class="text-xs text-gray-400 mt-1">{{ notification.time }}</p>
                    </div>
                  </div>
                  <div class="p-3 bg-gray-50 text-center">
                    <NuxtLink to="/notification" class="text-sm text-[#005B8F] hover:underline">
                      View all notifications
                    </NuxtLink>
                  </div>
                </div>
              </transition>
            </div>

            <!-- User Profile Dropdown -->
            <div class="relative">
              <button @click="toggleUserMenu"
                class="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-2 transition-colors">
                <div
                  class="w-10 h-10 bg-[#005B8F] rounded-full flex items-center justify-center text-white font-semibold">
                  RM
                </div>
                <div class="text-sm text-left">
                  <p class="font-semibold text-gray-900">Raheem Malek</p>
                  <p class="text-gray-500">System Admin</p>
                </div>
                <svg class="w-5 h-5 text-gray-400 transition-transform" :class="{ 'rotate-180': showUserMenu }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <!-- User Dropdown -->
              <transition enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95">
                <div v-if="showUserMenu"
                  class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
                  <NuxtLink to="/profile" class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    @click="showUserMenu = false">
                    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span class="text-sm font-medium text-gray-700">Profile</span>
                  </NuxtLink>
                  <button @click="handleLogoutClick"
                    class="flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors w-full text-left">
                    <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span class="text-sm font-medium text-red-600">Logout</span>
                  </button>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-6">
        <slot />
      </main>
    </div>

    <!-- Global Search Modal -->
    <Teleport to="body">
      <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <div v-if="showSearchModal"
          class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
          @click.self="showSearchModal = false">
          <div class="w-full max-w-2xl bg-[#1a2942] rounded-lg shadow-2xl overflow-hidden">
            <div class="p-4">
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input ref="searchInput" v-model="searchQuery" type="text" placeholder="Search..."
                  class="block w-full pl-12 pr-20 py-3 bg-[#243447] border-none rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  @keyup.esc="showSearchModal = false" />
                <div class="absolute inset-y-0 right-0 pr-4 flex items-center">
                  <span class="text-xs text-gray-400 bg-[#1a2942] px-2 py-1 rounded border border-gray-600">esc</span>
                </div>
              </div>
            </div>

            <div class="px-4 pb-4">
              <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Application UI</h3>
              <div class="space-y-1">
                <NuxtLink v-for="item in filteredSearchResults" :key="item.path" :to="item.path"
                  @click="showSearchModal = false"
                  class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors group"
                  :class="{ 'bg-blue-600': item.highlighted }">
                  <div
                    class="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30">
                    <component :is="item.icon" class="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p class="text-sm font-medium text-white">{{ item.category }}</p>
                    <p class="text-xs text-gray-400">{{ item.title }}</p>
                  </div>
                  <svg class="w-4 h-4 text-gray-400 ml-auto opacity-0 group-hover:opacity-100" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </NuxtLink>
              </div>

              <div class="mt-4 flex items-center justify-end gap-2 text-xs text-gray-400">
                <span>Search by</span>
                <svg class="h-4" viewBox="0 0 60 20" fill="none">
                  <path d="M20 10c0 5.523-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0s10 4.477 10 10z"
                    fill="currentColor" />
                  <text x="30" y="15" fill="currentColor" style="font-size: 12px; font-weight: 600;">algolia</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>

    <!-- Logout Confirmation Modal -->
    <Teleport to="body">
      <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <div v-if="showLogoutModal"
          class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          @click.self="showLogoutModal = false">
          <div class="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden">
            <div class="p-6">
              <div class="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 text-center mb-2">Confirm Logout</h3>
              <p class="text-sm text-gray-600 text-center mb-6">Are you sure you want to log out of your account?</p>
              <div class="flex gap-3">
                <button @click="showLogoutModal = false"
                  class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button @click="confirmLogout"
                  class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>

    <!-- Click Outside Handler -->
    <div v-if="showNotifications || showUserMenu" class="fixed inset-0 z-40" @click="closeAllDropdowns"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue'

const route = useRoute()
const showLogoutModal = ref(false)
const showSearchModal = ref(false)
const showNotifications = ref(false)
const showUserMenu = ref(false)
const biospecimenOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref<HTMLInputElement | null>(null)

// Sample notifications
const notifications = ref([
  {
    id: 1,
    title: 'New Sample Transfer',
    message: 'TRF-2025-001 has been transferred to Lab B',
    time: '5 minutes ago'
  },
  {
    id: 2,
    title: 'Storage Alert',
    message: 'Freezer 2 is at 85% capacity',
    time: '1 hour ago'
  },
  {
    id: 3,
    title: 'Maintenance Scheduled',
    message: 'System maintenance on Dec 25, 2025',
    time: '2 hours ago'
  }
])

// Search results data
const searchResults = [
  {
    path: '/dashboard',
    category: 'Data Display',
    title: 'Description Lists',
    highlighted: true
  },
  {
    path: '/reports',
    category: 'Data Display',
    title: 'Stats'
  },
  {
    path: '/biospecimen-tracking',
    category: 'Data Display',
    title: 'Calendars'
  }
]

const filteredSearchResults = computed(() => {
  if (!searchQuery.value) return searchResults

  const query = searchQuery.value.toLowerCase()
  return searchResults.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.category.toLowerCase().includes(query)
  )
})

const isActiveRoute = (path: string) => {
  // Check if current route starts with the given path
  return route.path.startsWith(path)
}

const toggleBiospecimen = () => {
  biospecimenOpen.value = !biospecimenOpen.value
}

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
  showUserMenu.value = false
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
  showNotifications.value = false
}

const closeAllDropdowns = () => {
  showNotifications.value = false
  showUserMenu.value = false
}

const handleLogoutClick = () => {
  showUserMenu.value = false
  showLogoutModal.value = true
}

const confirmLogout = async () => {
  // Add your logout logic here
  showLogoutModal.value = false
  await navigateTo('/auth/login')
}

// Focus search input when modal opens
watch(showSearchModal, async (newVal) => {
  if (newVal) {
    await nextTick()
    searchInput.value?.focus()
  } else {
    searchQuery.value = ''
  }
})

// Auto-open biospecimen dropdown if on a biospecimen route
watch(() => route.path, (newPath) => {
  if (newPath.startsWith('/biospecimen')) {
    biospecimenOpen.value = true
  }
}, { immediate: true })

// Keyboard shortcuts
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    // Ctrl/Cmd + K to open search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault()
      showSearchModal.value = true
    }
  }

  window.addEventListener('keydown', handleKeydown)

  return () => {
    window.removeEventListener('keydown', handleKeydown)
  }
})
</script>