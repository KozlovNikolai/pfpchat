import axios, { AxiosResponse } from 'axios'
import { API_BASE_URL } from 'src/config/api'
import { AuthState } from 'src/models/AuthState'

export async function signin(data: {
  profile: string
  email: string
  password: string
}): Promise<AuthState> {
  try {
    const response = await axios.post(`${API_BASE_URL}/signin`, {
      profile: data.profile,
      login: data.email,
      password: data.password,
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export async function logout(data: {
  token: string
  pubsub: string
}): Promise<AxiosResponse> {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/auth/signout/${data.pubsub}`,
      {
        headers: { Authorization: `Bearer ${data.token}` },
      }
    )
    return response.data
  } catch (error) {
    throw error
  }
}

// export async function getchats():Promise<Chat[]> {

// }
