import axios from 'axios'
import { MAPALA_API_PROTOCOL, MAPALA_API_HOST, MAPALA_API_BASE_PATH } from './config'
axios.defaults.baseURL = `${MAPALA_API_PROTOCOL}://${MAPALA_API_HOST}/${MAPALA_API_BASE_PATH}`
// axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'

/**
 * create vue-resource's resource like object
 *
 * Default Actions
 *   get: {method: 'GET'}
 *   save: {method: 'POST'}
 *   query: {method: 'GET'}
 *   update: {method: 'PUT'}
 *   delete: {method: 'DELETE'}
 *
 * @param path the resource path
 * @param http axios instance
 * @param actions custom actions
 * @returns the resource object
 */
export function resource (path, http, actions) {
  const obj = {
    get: (id) => http.get(path + '/' + id),
    save: obj => http.post(path, obj),
    query: params => http.get(path, { params }),
    update: (id, obj) => http.put(path + '/' + id, obj),
    delete: id => http.delete(path + '/' + id)
  }
  return Object.assign(obj, actions)
}
