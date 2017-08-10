import { Resource } from '../index'
import axios from 'axios'

export const User = {
  ...Resource('/users', axios, {
    current: () => axios.get('/users'),
    sign_up: () => axios.post('/sign-up/'),
    set_password: () => axios.post('/configs/users/set_password/'),
    reset_password: () => axios.post('/configs/users/reset_password/'),
    existng_sign_up: () => axios.post('/existng-sign-up/'),
    set_avatar: (user_name) => axios.post(`/configs/users/${user_name}/set_avatar/`),
    remove_avatar: (user_name) => axios.post(`/configs/users/${user_name}/remove_avatar/`),
    initial_blockchains: (user_name) => axios.get(`/configs/users/${user_name}/initial_blockchains/`)
  })
}
