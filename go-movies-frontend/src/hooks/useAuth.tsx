export type TokenPairs = {
  access_token: string
  refresh_token: string
}

export const useAuth = () => {
  const refresh = async () => {
    const requestOptions: RequestInit = {
      method: 'GET',
      credentials: 'include',
    }
    const response = await fetch(`/api/refresh`, requestOptions)
    const data = (await response.json()) as TokenPairs
    return data
  }

  const logout = async () => {
    const requestOptions: RequestInit = {
      method: 'GET',
      credentials: 'include',
    }
    await fetch(`/api/logout`, requestOptions)
  }

  return {
    logout,
    refresh,
  }
}
