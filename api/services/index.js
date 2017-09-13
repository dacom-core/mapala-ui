import { resource } from '../index'
import axios from 'axios'

export function User (axiosInstance) {
  return resource('api/users/', axiosInstance, {
    current: () => axiosInstance.get('api/users/current/'),
    signUp: (data) => axiosInstance.post('/sign-up/', data),
    setPassword: () => axiosInstance.post('api/users/set_password/'),
    resetPassword: () => axiosInstance.post('api/users/reset_password/'),
    existingSignUp: () => axiosInstance.post('/existng-sign-up/'),
    setAvatar: (user_name) => axiosInstance.post(`api/users/${user_name}/set_avatar/`),
    removeAvatar: (user_name) => axiosInstance.post(`api/users/${user_name}/remove_avatar/`),
    initialBlockchains: (user_name) => axiosInstance.get(`api/users/${user_name}/initial_blockchains/`)
  })
}

export function Post (axiosInstance) {
  return resource('api/pages/', axiosInstance, {
    commentsTree: (permalink) => axiosInstance.get(`api/pages/${permalink}/comments_tree/`),
    updatePost: (payload) => axiosInstance.post('api/pages/update_post/', payload),
    trPost: () => axiosInstance.post('api/pages/tr_post/')
  })
}

export const Comment = {
  ...resource('api/comments/', axios, {})
}

export function Marker (axiosInstance) {
  return resource('api/markers/', axiosInstance, {})
}

export const Group = {
  ...resource('api/groups/', axios, {
  })
}

export const BlockChain = {
  ...resource('api/blockchains/', axios, {})
}

export function UserBlockChain (axiosInstance) {
  return resource('api/user-blockchains/', axiosInstance, {
    getNameByPostingKey: () => axiosInstance.get(`api/user-blockchains/get_name_by_posting_key/`)
  })
}

export function Image (axiosInstance) {
  return resource('api/images/', axiosInstance, {
    upload: (data) => axiosInstance.post('/post_image/', data)
  })
}

export function Locomotive (axiosInstance) {
  return resource('api/locomotive/', axiosInstance, {})
}

