/* eslint-disable no-trailing-spaces */
import { Signature, ChainStore, FetchChain, Login } from 'graphenejs-lib'
import { Apis, ChainConfig } from 'graphenejs-ws'

const API_INSTANCE_SERVER = 'ws://144.217.15.182:11011'

ChainConfig.networks.DACom = {
  core_asset: 'FLO',
  address_prefix: 'FLO',
  chain_id: '526880c720c677ef7b54f964fe68999d1e582a33c8636b0f3b4687d47ae2f67f'
}

const auth = {
  keys: {},
  authSig: '',
  account: {},
  doesKeysMatch: false,

  async init () {
    try {
      await Apis.istance(API_INSTANCE_SERVER, true).init_promise
      await ChainStore.init()
    } catch (error) {
      console.log(error)
    }
  },
  getAuthSig (context) {
    const auth_hash = context.$cookie.get('authSigHash')
    return Signature.sign(auth_hash, this.keys.privKeys.active).toHex()
  },
  generateKeys (accountName, password) {
    this.keys = Login.generateKeys(accountName, password, ['active', 'owner', 'memo'])
  },
  signUp (accountName, password) {
    return new Promise((resolve, reject) => {
      FetchChain('getAccount', [accountName]).then(() => {
        reject('Account already exist')
      }, () => {
        try {
          this.generateKeys(accountName, password)
        } catch (e) {
          return reject(e.message)
        }

        resolve({
          account: accountName,
          owner_key: this.keys.pubKeys.owner,
          active_key: this.keys.pubKeys.active,
          memo_key: this.keys.pubKeys.memo
        })
      })
    })
  },
  async login (accountName, password) {
    try {
      this.account = await FetchChain('getAccount', [accountName]).toJS()[0]

      this.doesKeysMatch = await Login.checkKeys({
        accountName: accountName,
        password: password,
        auths: {
          active: this.account.active.key_auths
        }
      });

      (this.doesKeysMatch)
        ? await this.generateKeys(accountName, password)
        : 'Invalid password'
    } catch (e) {
      return 'User not exists'
    }
  }
}

export default auth
