import { ref } from "vue"
import { admin_api } from "@/api_factory/modules/admin"

export const useExportTransactions = () => {
  const loading = ref(false)

  const exportTransactions = async () => {
    loading.value = true
    try {
      const res = (await admin_api.exportTransactions()) as any
      if (res.type !== "ERROR") {
        return res.data
      }
    } finally {
      loading.value = false
    }
  }

  return { loading, exportTransactions }
}
