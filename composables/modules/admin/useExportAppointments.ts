import { ref } from "vue"
import { admin_api } from "@/api_factory/modules/admin"

export const useExportAppointments = () => {
  const loading = ref(false)

  const exportAppointments = async () => {
    loading.value = true
    try {
      const res = (await admin_api.exportAppointments()) as any
      if (res.type !== "ERROR") {
        return res.data
      }
    } finally {
      loading.value = false
    }
  }

  return { loading, exportAppointments }
}