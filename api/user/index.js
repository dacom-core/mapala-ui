import { resource } from '../index'
import axios from 'axios'

export const User = {
  ...resource('users/', axios, {
    current: () => axios.get('users/current'),
    signUp: () => axios.post('/sign-up/'),
    setPassword: () => axios.post('users/set_password/'),
    resetPassword: () => axios.post('users/reset_password/'),
    existingSignUp: () => axios.post('/existng-sign-up/'),
    setAvatar: (user_name) => axios.post(`users/${user_name}/set_avatar/`),
    removeAvatar: (user_name) => axios.post(`users/${user_name}/remove_avatar/`),
    initialBlockchains: (user_name) => axios.get(`users/${user_name}/initial_blockchains/`)
  })
}
