import { useCallback, useState } from 'react'

export type TokenPairs = {
  access_token: string
  refresh_token: string
}

export const useAuth = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [error, setError] = useState<Error | null>(null)

  const refresh = useCallback(async () => {
    try {
      const requestOptions: RequestInit = {
        method: 'GET',
        credentials: 'include',
      }
      const response = await fetch(`/api/refresh`, requestOptions)
      const data = (await response.json()) as TokenPairs
      setAccessToken(data.access_token)
    } catch (error) {
      if (error instanceof Error) {
        setError(error)
      } else {
        setError(new Error('user is not logged in'))
      }
      setAccessToken(null)
    }
  }, [])

  const logout = useCallback(async (callback?: () => void) => {
    try {
      const requestOptions: RequestInit = {
        method: 'GET',
        credentials: 'include',
      }
      await fetch(`/api/logout`, requestOptions)
      setAccessToken(null)
      callback?.()
    } catch (err) {
      if (err instanceof Error) {
        setError(err)
      } else {
        setError(new Error('error logging out'))
      }
    }
  }, [])

  return {
    accessToken,
    error,
    logout,
    refresh,
  }
}
