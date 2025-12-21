// import { ref } from "vue"
// import { reporting_api } from "@/api_factory/modules/reporting"
// import { useCustomToast } from "@/composables/core/useCustomToast"

// export const useExportData = () => {
//   const loading = ref(false)
//   const { showToast } = useCustomToast()

//   const exportData = async (payload: {
//     items_to_export: string[]
//     format: string
//   }) => {
//     loading.value = true
//     try {
//       const res = (await reporting_api.$_export_data(payload)) as any
//       if (res.type !== "ERROR") {
//         showToast({
//           title: "Success",
//           message: `Data exported successfully in ${payload.format.toUpperCase()} format`,
//           toastType: "success",
//           duration: 3000,
//         })
//         return res.data
//       } else {
//         const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to export data"
//         showToast({
//           title: "Error",
//           message: errorMsg,
//           toastType: "error",
//           duration: 3000,
//         })
//         return null
//       }
//     } catch (error: any) {
//       showToast({
//         title: "Error",
//         message: error?.message || "Something went wrong",
//         toastType: "error",
//         duration: 3000,
//       })
//       return null
//     } finally {
//       loading.value = false
//     }
//   }

//   return {
//     loading,
//     exportData
//   }
// }

import { ref } from "vue"
import { reporting_api } from "@/api_factory/modules/reporting"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useExportData = () => {
  const loading = ref(false)
  const { showToast } = useCustomToast()

  const exportData = async (payload: {
    format: string
    start_date: string
    end_date: string
    filters?: {
      sample_type?: string
      site?: string
    }
  }) => {
    loading.value = true
    try {
      const res = (await reporting_api.$_export_data(payload)) as any
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Data exported successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to export data"
        showToast({
          title: "Error",
          message: errorMsg,
          toastType: "error",
          duration: 3000,
        })
        return null
      }
    } catch (error: any) {
      showToast({
        title: "Error",
        message: error?.message || "Something went wrong",
        toastType: "error",
        duration: 3000,
      })
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    exportData
  }
}