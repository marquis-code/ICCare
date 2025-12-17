import { ref } from "vue"
import { payments_api } from "@/api_factory/modules/payments"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useFetchPaymentHistory = () => {
  const loading = ref(false)
  const transactions = ref<any[]>([])
  const error = ref<string | null>(null)
  const { showToast } = useCustomToast()

  const fetchPaymentHistory = async (limit = 10, offset = 0) => {
    loading.value = true
    error.value = null
    try {
      const res = (await payments_api.getPaymentHistory(limit, offset)) as any
      if (res.type !== "ERROR") {
        transactions.value = res.data.transactions || []
        return res.data
      } else {
        error.value = res.message
        showToast({
          title: "Error",
          message: res.message || "Failed to load payment history",
          toastType: "error",
          duration: 3000,
        })
        throw new Error(res.message)
      }
    } catch (err: any) {
      error.value = err.message
      showToast({
        title: "Error",
        message: err.message || "Failed to load payment history",
        toastType: "error",
        duration: 3000,
      })
      throw err
    } finally {
      loading.value = false
    }
  }

  return { loading, transactions, error, fetchPaymentHistory }
}