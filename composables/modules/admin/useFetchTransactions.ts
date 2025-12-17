import { ref } from "vue"
import { admin_api } from "@/api_factory/modules/admin"

export const useFetchTransactions = () => {
  const loading = ref(false)
  const transactions = ref<any[]>([])

  const fetchTransactions = async (limit = 10, offset = 0) => {
    loading.value = true
    try {
      const res = (await admin_api.getTransactions(limit, offset)) as any
      if (res.type !== "ERROR") {
        transactions.value = res.data || []
        return res.data
      }
    } finally {
      loading.value = false
    }
  }

  return { loading, transactions, fetchTransactions }
}
