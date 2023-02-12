import { postData } from '../index'

export default {
  async login (params) {
    const response = await postData('auth/login', params)
    return response
  }
}

