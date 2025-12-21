import { ref } from "vue"
import { subject_api } from "@/api_factory/modules/subject"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useCreateSubject = () => {
  const loading = ref(false)
  const subject = ref(null)
  const { showToast } = useCustomToast()

  const createSubject = async (payload: {
    demographic_data: {
      age: number
      gender: string
      nationality: string
      ethnicity: string
    }
    epidemiological_data: {
      history: string
      risk_factors: string
      geolocation: {
        country: string
        state_prov: string
        lga: string
        city: string
        address: string
      }
    }
    facility_level: string
    clinical_data: {
      diagnosis: string
      treatment_status: string
      outcome: string
      contact_class: Record<string, any>
    }
  }) => {
    loading.value = true
    try {
      const res = (await subject_api.$_create_subject(payload)) as any
      if (res.type !== "ERROR") {
        subject.value = res.data
        showToast({
          title: "Success",
          message: "Subject created successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to create subject"
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
    createSubject
  }
}