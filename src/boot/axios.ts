import { boot } from 'quasar/wrappers'
import axios, { AxiosInstance } from 'axios'
import https from 'https'
import fs from 'fs'

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
    $api: AxiosInstance
  }
}

const api = axios.create({
  httpsAgent: new https.Agent({
    ca: fs.readFileSync('/home/developer/.ssh/cert.pem'),
  }),
})
export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})
export { api }
