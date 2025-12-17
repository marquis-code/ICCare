import { ref } from "vue"
import { auth_api } from "@/api_factory/modules/auth"

export const useFetchProfile = () => {
    const loading = ref(false)
    const profile = ref({})

    const fetchProfile = async () => {
        loading.value = true
        const res = (await auth_api.getProfile()) as any
        if ([200, 201].includes(res.status)) {
            profile.value = res.data
            return res.data
        }
    }

     return { loading, fetchProfile, profile }
}
