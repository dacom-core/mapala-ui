import { Resource } from '../index'
import axios from 'axios'

export const Post = {
  ...Resource('/pages/', axios, {
    comments_tree: (permlink) => axios.get(`/configs/pages/${permlink}/comments_tree/`),
    update_post: () => axios.post('/configs/pages/update_post/'),
    tr_post: () => axios.post('/configs/pages/tr_post/')
  })
}
