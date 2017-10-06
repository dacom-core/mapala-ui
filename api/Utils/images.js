import axios from 'axios'
import bc from '@/api/blockchain'

//import {PrivateKey, Signature, hash} from 'golos-js/lib/auth/ecc'
//import {Signature, ChainStore, FetchChain, Login} from 'graphenejs-lib'

import { Signature, PrivateKey, hash } from 'graphenejs-lib'



export async function uploadImage(file) {
  const username = bc.current.blockchain_username
  const d = PrivateKey.fromWif(bc.current.wif)

  if(!username) {
      throw new Error('Please logged in first.')
  }

  if(!d) {
      throw new Error('Login with your posting key')
  }

  if(!file && !dataUrl) {
      console.error('uploadImage required: file or dataUrl')
  }

  let data, dataBs64

  if(file) {
    const reader = new FileReader()
    data = await new Promise(resolve => {
        reader.addEventListener('load', () => {
            const result = new Buffer(reader.result, 'binary')
            resolve(result)
        })
        reader.readAsBinaryString(file)
    })
  } else {
      // recover from preview
      const commaIdx = dataUrl.indexOf(',')
      dataBs64 = dataUrl.substring(commaIdx + 1)
      data = new Buffer(dataBs64, 'base64')
  }

  // The challenge needs to be prefixed with a constant (both on the server and checked on the client) to make sure the server can't easily make the client sign a transaction doing something else.
  const prefix = new Buffer('ImageSigningChallenge')
  const bufSha = hash.sha256(Buffer.concat([prefix, data]))

  const formData = new FormData()

  if(file) {
      formData.append('file', file)
  } else {
      // formData.append('file', file, filename) <- Failed to add filename=xxx to Content-Disposition
      // Can't easily make this look like a file so this relies on the server supporting: filename and filebinary
      formData.append('filename', filename)
      formData.append('filebase64', dataBs64)
  }

  const sig = Signature.signBufferSha256(bufSha, d)
  const upload_url = 'https://images.golos.io' // TODO заменять для стима/голоса
  const postUrl = `${upload_url}/${username}/${sig.toHex()}`

  const res = await axios.post(postUrl, formData, {headers: {'content-type': 'multipart/form-data'}})

  return res.data.url
}
