import axios from 'axios'
import Vue from 'vue'
import { get_cookie } from '@/utils/cookies'
import { MAPALA_API_PROTOCOL, MAPALA_API_HOST, MAPALA_API_BASE_PATH } from './config'
import { state } from '@/store/user/auth'

// export const HTTP = axios.create({
//   baseURL: `${MAPALA_API_PROTOCOL}://${MAPALA_API_HOST}/${MAPALA_API_BASE_PATH}`
// })

// HTTP.interceptors.request.use(function (config) {
//   Object.assign(config.headers.common, config.headers.common, { 'Authorization': 'JWT ' + 'dfdsfgsjdhgfksdjhf' })
//   return config
// })

// export function set_jwt_header (token) {
//   HTTP.defaults.headers.common = {
//     'Authorization': 'JWT ' + token
//   }
// }
//
// export function reset_jwt_header () {
//   HTTP.defaults.headers.common = {}
// }

