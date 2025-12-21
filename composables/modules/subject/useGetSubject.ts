import { ref } from "vue"
import { subject_api } from "@/api_factory/modules/subject"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useGetSubject = () => {
  const loading = ref(false)
  const subject = ref(null)
  const { showToast } = useCustomToast()

  const getSubject = async (subject_token: string) => {
    loading.value = true
    try {
      const res = (await subject_api.$_get_subject(subject_token)) as any
      if (res.type !== "ERROR") {
        subject.value = res.data
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to fetch subject data"
        showToast({
          title: "Error",
          message: errorMsg,
          toastType: "error",
          duration: 3000,
        })
        return null
      }
    } catch (error: any) {
      showToast({
        title: "Error",
        message: error?.message || "Something went wrong",
        toastType: "error",
        duration: 3000,
      })
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    subject,
    getSubject
  }
}