import { Resource } from '@/utils/axiosModule'

export const Post = Resource('/api/pages{/permlink}/', {}, {
  'comments_tree': { method: 'GET', url: '/api/pages{/permlink}/comments_tree/' },
  'updatePost': { method: 'POST', url: '/api/pages/update_post/' },
  'trPost': { method: 'POST', url: '/api/pages/tr_post/' }
})
export const Locomotive = Resource('/api/locomotive/')
export const Tag = Resource('/api/tags{/id}/')
export const Comment = Resource('/api/comments{/id}/')
export const BlockChain = Resource('/api/blockchains{/id}/')
export const Marker = Resource('/api/markers{/id}/')

export const UserBlockChain = Resource('/api/user-blockchains{/id}/', {}, {
  'getNameByPostingKey': {
    method: 'GET', url: '/api/user-blockchains/get_name_by_posting_key/'
  }
})

export const MasterTag = Resource('/api/master-tags{/id}/', {}, {
  'tree': {
    method: 'GET', url: '/api/master-tags/tree/'
  },
  'ancestors': {
    method: 'GET', url: '/api/master-tags{/id}/ancestors/'
  }
})

export const User = Resource('/api/users{/username}/', {}, {
  'current': { method: 'GET', url: '/api/users/current/' },
  'signUp': { method: 'POST', url: '/sign-up/' },
  'setPassword': { method: 'POST', url: '/api/users/set_password/' },
  'resetPassword': { method: 'POST', url: '/api/users/reset_password/' },
  'existngSignUp': { method: 'POST', url: '/existng-sign-up/' },
  'setAvatar': { method: 'POST', url: '/api/users{/username}/set_avatar/' },
  'removeAvatar': { method: 'POST', url: '/api/users{/username}/remove_avatar/' },
  'initialBlockchains': { method: 'GET', url: '/api/users{/username}/initial_blockchains/' },
  'markers': { method: 'GET', url: '/api/users{/username}/markers/' }
})

export const Image = Resource('/api/images{/id}/', {}, {
  'upload': { method: 'POST', url: '/post_image/' }
})

export const Group = Resource('/api/groups{/name}/', {}, {
  'markers': { method: 'GET', url: '/api/markers/' }
})

export const EmailRequest = Resource('/api/email_request/')
