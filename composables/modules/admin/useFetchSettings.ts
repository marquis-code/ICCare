import { ref } from "vue"
import { admin_api } from "@/api_factory/modules/admin"

export const useFetchSettings = () => {
  const loading = ref(false)
  const settings = ref<any>(null)

  const fetchSettings = async () => {
    loading.value = true
    try {
      const res = (await admin_api.getSettings()) as any
      if (res.type !== "ERROR") {
        settings.value = res.data
        return res.data
      }
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchSettings()
  })

  return { loading, settings, fetchSettings }
}