import { ref } from "vue"
import { admin_api } from "@/api_factory/modules/admin"

export const useUpdateSettings = () => {
  const loading = ref(false)
  const settings = ref<any>(null)

  const updateSettings = async (payload: {
    physicalConsultationFee?: number
    virtualConsultationFee?: number
    clinicLocation?: string
    contactInfo?: string
  }) => {
    loading.value = true
    try {
      const res = (await admin_api.updateSettings(payload)) as any
      if (res.type !== "ERROR") {
        settings.value = res.data.settings
        return res.data
      }
    } finally {
      loading.value = false
    }
  }

  return { loading, settings, updateSettings }
}