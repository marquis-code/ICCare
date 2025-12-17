import { ref } from "vue"
import { admin_api } from "@/api_factory/modules/admin"

export const useFetchUsers = () => {
  const loading = ref(false)
  const users = ref<any[]>([])

  const fetchUsers = async (limit = 10, offset = 0) => {
    loading.value = true
    try {
      const res = (await admin_api.getUsers(limit, offset)) as any
      if (res.type !== "ERROR") {
        users.value = res.data || []
        return res.data
      }
    } finally {
      loading.value = false
    }
  }

  return { loading, users, fetchUsers }
}