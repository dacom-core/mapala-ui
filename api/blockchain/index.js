import Vue from 'vue'
import slug from 'slug'
import steem from 'steem'
import store from 'store'
// import auth from '../auth'
import { Client } from 'steem-rpc'
import { ChainConfig, PrivateKey, TransactionBuilder } from 'esteem-lib'
// import { User, Comment, Post, UserBlockChain, BlockChain } from '../services'

export default {
  // TODO Полностью зарефакторить все методы работы с блокчейном , все проверки блокчейна в 1 месте
  wif: '',
  current: {},
  bc_list: [],
  blockchains: {},
  app_tag: (process.env.NODE_ENV == 'production' &&
    !window.location.host.includes('develop')) ? 'mapala' : 'testing',

  init () {
    ChainConfig.expire_in_secs = 30
    BlockChain.get().then(res => {
      for (const bc of res.body) {
        this.blockchains[bc.name] = bc
      }
      this.setBlockchain()
    })
  },

  getUser (username = null) {
    return new Promise((resolve, reject) => {
      username = username || this.current.blockchain_username
      steem.api.getAccounts([username], (err, result) => {
        err ? reject(err) : resolve(result[0])
      })
    })
  },

  getPermlink (text) {
    return slug(text).toLowerCase()
  },

  checkValidKey (context, reject) {
    if (!this.current.key_valid) {
      reject(context.$t('add_key_err', { bc: this.current.name }))
    }
  },

  signTr (tr) {
    tr.add_signer(PrivateKey.fromWif(this.current.wif))

    return new Promise((resolve, reject) => {
      tr.finalize().then(() => {
        tr.sign()
        resolve(tr.toObject())
      }, err => reject(err))
    })
  },

  async postExists (author, permlink) {
    const data = await steem.api.getContent(author, permlink)

    return !!data.id
  },

  async createPost (context, post) {
    post.permlink = this.getPermlink(post.title)

    if (await this.postExists(this.current.blockchain_username, post.permlink)) {
      // TODO Добавить автоинкремент для пермлинка, если он повторяется
      return Promise.reject('Post with this title already exists')
    }
    return this.updatePost(context, post)
  },

  updatePost (context, post) {
    return new Promise((resolve, reject) => {
      this.checkValidKey(context, reject)
      const tr = new TransactionBuilder()

      post.permlink = this.getPermlink(post.title)

      tr.add_type_operation('comment', {
        parent_author: '',
        parent_permlink: this.app_tag,
        author: this.current.blockchain_username,
        permlink: post.permlink,
        title: post.title,
        body: post.body,
        json_metadata: this.getJsonMeta(post.meta)
      })

      this.signTr(tr).then(tr => {
        Post.save({ tx: tr, blockchain: this.current.name })
          .then(res => resolve(res), err => reject(err.body))
      }, err => reject(err))
    })
  },

  createComment (context, comm) {
    return new Promise((resolve, reject) => {
      this.checkValidKey(context, reject)

      const tr = new TransactionBuilder()
      tr.add_type_operation('comment', {
        parent_author: comm.parentAuthor,
        parent_permlink: comm.parentPermlink,
        author: this.current.blockchain_username,
        permlink: comm.permlink.replace('.', '-'),
        title: '',
        body: comm.body,
        json_metadata: this.getJsonMeta()
      })

      this.signTr(tr).then(tr => {
        Comment.save({ tx: tr, blockchain: this.current.name })
          .then(res => resolve(res), err => reject(err.body))
      }, err => reject(err))
    })
  },

  vote (page) {
    return new Promise((resolve, reject) => {
      steem.broadcast.vote(
        this.current.wif, this.current.blockchain_username, page.author.bc_username, page.permlink, 10000, function (err, result) {
          if (err) {
            const message = err.cause.payload.error.message
            if (message.includes('You have already voted in a similar way')) {
              reject('You have already voted in a similar way')
            } else if (message.includes('Cannot vote again on a comment after payout')) {
              reject('Cannot vote again on a comment after payout')
            } else {
              reject(err)
            }
          } else {
            resolve(result)
          }
        })
    })
  },

  getJsonMeta (meta = {}) {
    meta.app = 'mapala/1.0'
    meta.format = 'html'

    if (meta.tags === undefined) {
      meta.tags = [this.app_tag]
    } else if (!meta.tags.includes(this.app_tag)) {
      meta.tags.unshift(this.app_tag)
    }

    return JSON.stringify(meta)
  },

  setBlockchain (blockchain) {
    // HACK: На данный момент решено менять блокчейн по локали:
    // en -> steemil, ru -> golos
    if (blockchain === undefined) {
      blockchain = Vue.config.lang == 'ru' ? 'golos' : 'steemit'
    }

    this.current = this.blockchains[blockchain]

    if (window.Api !== undefined) {
      window.Api.close()
    }

    // esteem-lib conf
    window.Api = Client.get({ url: this.current.wss }, true)
    window.Api.initPromise.then(response => {
      ChainConfig.setChainId(this.current.chain_id)
    })

    // steem-js conf
    steem.config.set('websocket', this.current.wss)
    steem.config.set('address_prefix', this.current.address_prefix)
    steem.config.set('chain_id', this.current.chain_id)
  },

  getPostingKey (blockchain) {
    if (blockchain === undefined) {
      return this.getPostingKey(this.current.name)
    }
    return store.get(`${blockchain}_${auth.user.username}_posting_key`)
  },

  initBlockchains () {
    User.initialBlockchains({ username: auth.user.username }).then(res => {
      const bc_list = []
      for (const bc of res.body) {
        if (bc.activated) {
          bc.wif = this.getPostingKey(bc.name)
          bc.blockchain_username = bc.blockchain_username.toLowerCase()

          try {
            PrivateKey.fromWif(bc.wif)
            bc.key_valid = true
          } catch (e) {
            // Невалидный ключ
            bc.wif = ''
            bc.key_valid = false
          }
        }

        bc_list.push(bc)
        this.blockchains[bc.name] = bc
      }

      this.bc_list = bc_list
      if (this.blockchains) {
        this.setBlockchain()
      }
      this.getUser().then(res => auth.balance = res.balance)
    })
  },

  getUsernameByKey (key, prefix = this.current.address_prefix) {
    return new Promise((resolve, reject) => {
      steem.config.set('address_prefix', prefix)
      steem.api.getKeyReferences([key], function (err, result) {
        err ? reject(err) : resolve(result[0][0])
      })
      if (this.current.address_prefix) {
        const curr_adress = this.current.address_prefix
        steem.config.set('address_prefix', curr_adress)
      }
    })
  },

  setPostingKey (context, blockchain) {
    return new Promise((resolve, reject) => {
      UserBlockChain.save({ blockchain: blockchain.name, wif: blockchain.wif }).then(res => {
        store.set(`${blockchain.name}_${auth.user.username}_posting_key`, blockchain.wif)

        this.blockchains = []
        this.initBlockchains()

        resolve(res)
      }, err => reject(err))
    })
  },

  /**
   * check blockhcain Key
   * @param  {string} key   blockchain private key
   * @return {boolean}
   */
  checkPostingKey (key, prefix) {
    // console.log(key)
    if (key && (prefix === 'GLS')) { return key.startsWith(prefix) }
  },
  /**
   * check GOLOS posting key
   * @param  {string} key   golos posting key
   * @return {boolean}
   */
  checkGolosKey () {
    var key = this.bc_list[0].wif
    return this.checkPostingKey(key, 'GLS')
  }
}
