import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const createResult = async (resultData) => {
  const response = await api.post('/results', resultData)
  return response.data
}

export const getResultById = async (id) => {
  const response = await api.get(`/results/${id}`)
  return response.data
}

export const getAllResults = async () => {
  const response = await api.get('/results')
  return response.data
}

export default api
