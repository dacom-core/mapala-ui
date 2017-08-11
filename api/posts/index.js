import { resource } from '../index'
import axios from 'axios'

export const Post = {
  ...resource('pages/', axios, {
    commentsTree: (permalink) => axios.get(`pages/${permalink}/comments_tree/`),
    updatePost: (payload) => axios.post('pages/update_post/', payload),
    trPost: () => axios.post('pages/tr_post/')
  })
}
