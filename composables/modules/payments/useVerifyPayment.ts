import { ref } from "vue"
import { payments_api } from "@/api_factory/modules/payments"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useVerifyPayment = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const { showToast } = useCustomToast()

  const verifyPayment = async (transactionRef: string, paymentMethod: "Paystack" | "Mono") => {
    loading.value = true
    error.value = null
    try {
      const res = (await payments_api.verifyPayment({
        transactionRef,
        paymentMethod,
      })) as any
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Payment verified successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        error.value = res.message
        showToast({
          title: "Error",
          message: res.message || "Failed to verify payment",
          toastType: "error",
          duration: 3000,
        })
        throw new Error(res.message)
      }
    } catch (err: any) {
      error.value = err.message
      showToast({
        title: "Error",
        message: err.message || "Failed to verify payment",
        toastType: "error",
        duration: 3000,
      })
      throw err
    } finally {
      loading.value = false
    }
  }

  return { loading, error, verifyPayment }
}