import { resource } from '../index'
import axios from 'axios'

export const User = {
  ...resource('api/users/', axios, {
    current: () => axios.get('api/users/current/'),
    signUp: () => axios.post('/sign-up/'),
    setPassword: () => axios.post('api/users/set_password/'),
    resetPassword: () => axios.post('api/users/reset_password/'),
    existingSignUp: () => axios.post('/existng-sign-up/'),
    setAvatar: (user_name) => axios.post(`api/users/${user_name}/set_avatar/`),
    removeAvatar: (user_name) => axios.post(`api/users/${user_name}/remove_avatar/`),
    initialBlockchains: (user_name) => axios.get(`api/users/${user_name}/initial_blockchains/`)
  })
}

export const Post = {
  ...resource('api/pages/', axios, {
    commentsTree: (permalink) => axios.get(`api/pages/${permalink}/comments_tree/`),
    updatePost: (payload) => axios.post('api/pages/update_post/', payload),
    trPost: () => axios.post('api/pages/tr_post/')
  })
}

export const Comment = {
  ...resource('api/comments/', axios, {})
}

export const Marker = {
  ...resource('api/markers/', axios, {})
}

export const Group = {
  ...resource('api/groups/', axios, {
    // 'markers': { method: 'GET', url: '/api/markers/' }
  })
}

export const BlockChain = {
  ...resource('api/blockchains/', axios, {})
}

export const UserBlockChain = {
  ...resource('api/user-blockchains/', axios, {
    getNameByPostingKey: () => axios.get(`api/user-blockchains/get_name_by_posting_key/`)
  })
}

export const Image = {
  ...resource('api/images/', axios, {
    upload: () => axios.post('/post_image/')
  })
}
