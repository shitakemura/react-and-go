export type TokenPairs = {
  access_token: string
  refresh_token: string
}

export const useAuth = () => {
  const login = async (payload: { email: string; password: string }) => {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    }
    const response = await fetch(`/api/authenticate`, requestOptions)
    const data = await response.json()
    return data
  }

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
    login,
    logout,
    refresh,
  }
}
