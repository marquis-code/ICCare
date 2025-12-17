import { ref } from "vue"
import { payments_api } from "@/api_factory/modules/payments"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useInitiatePayment = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const { showToast } = useCustomToast()

  const initiatePayment = async (payload: {
    appointmentId: string
    amount: number
    paymentMethod: "Paystack" | "Mono"
    email: string
    phone: string
    address: string
    customerName: string
    bvn?: string
    redirectUrl?: string
    description?: string
  }) => {
    loading.value = true
    error.value = null
    try {
      const res = (await payments_api.initiatePayment(payload)) as any
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Payment initiated successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        error.value = res.message
        showToast({
          title: "Error",
          message: res.message || "Failed to initiate payment",
          toastType: "error",
          duration: 3000,
        })
        throw new Error(res.message)
      }
    } catch (err: any) {
      error.value = err.message
      showToast({
        title: "Error",
        message: err.message || "Failed to initiate payment",
        toastType: "error",
        duration: 3000,
      })
      throw err
    } finally {
      loading.value = false
    }
  }

  return { loading, error, initiatePayment }
}