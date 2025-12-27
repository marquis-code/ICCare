import { watch, onUnmounted } from "vue"
import { useUser } from "@/composables/modules/auth/user"
import { useRefreshToken } from "@/composables/modules/auth/useRefreshToken"

/**
 * Optional composable to proactively monitor and refresh tokens
 * Use this in your main App.vue or a global component
 */
export const useTokenMonitor = () => {
  const { isTokenExpired, getTokenExpiry, isLoggedIn } = useUser()
  const { refreshToken } = useRefreshToken()
  
  let checkInterval: NodeJS.Timeout | null = null

  const startMonitoring = () => {
    // Check token expiry every minute
    checkInterval = setInterval(async () => {
      if (isLoggedIn.value && isTokenExpired.value) {
        console.log('Token is about to expire, refreshing...')
        await refreshToken()
      }
    }, 60000) // Check every 60 seconds
  }

  const stopMonitoring = () => {
    if (checkInterval) {
      clearInterval(checkInterval)
      checkInterval = null
    }
  }

  // Start monitoring when user logs in
  watch(isLoggedIn, (newValue) => {
    if (newValue) {
      startMonitoring()
    } else {
      stopMonitoring()
    }
  }, { immediate: true })

  // Cleanup on component unmount
  onUnmounted(() => {
    stopMonitoring()
  })

  return {
    startMonitoring,
    stopMonitoring
  }
}