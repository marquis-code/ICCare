// composables/modules/admin/useFetchDashboard.ts
import { ref } from "vue"
import { admin_api } from "@/api_factory/modules/admin"

export const useFetchDashboard = () => {
  const loading = ref(false)
  const dashboard = ref<any>(null)

  const fetchDashboard = async () => {
    loading.value = true
    try {
      const res = (await admin_api.getDashboard()) as any
      if (res.type !== "ERROR") {
        dashboard.value = res.data
        return res.data
      }
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    useFetchDashboard()
  })

  return { loading, dashboard, fetchDashboard }
}
