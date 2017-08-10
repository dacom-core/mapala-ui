import { Signature } from 'graphenejs-lib'

export function getAuthSig (context) {
  const auth_hash = context.$cookie.get('authSigHash')
  return Signature.sign(auth_hash, this.keys.privKeys.active).toHex()
}
