import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8000',
  headers: { 'Content-Type': 'application/json' }
})

export const getData = async (url) => {
  try {
    const response = await instance.get(url)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const postData = async (url, data) => {
  try {
    const response = await instance.post(url, data)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const putData = async (url, data) => {
  try {
    const response = await instance.put(url, data)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const deleteData = async (url) => {
  try {
    const response = await instance.delete(url)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
