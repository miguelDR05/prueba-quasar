import CryptoJS from 'crypto-js/index'


export function useCrypto() {
  /****************************************************************************/
  /*                             VARIABLES                                    */
  /****************************************************************************/

  const credKey = import.meta.env.VITE_CLIENT_CRED_ENCRYPT_KEY ?? ''

  /****************************************************************************/
  /*                              INJECT                                      */
  /****************************************************************************/

  const decryptData = (data: string, isJson = false) => {
    if (data === null) return null
    const encrypted = JSON.parse(atob(data.toString()))

    //const encrypted = Buffer.from(data, 'base64')
    const decrypted = CryptoJS.AES.decrypt(encrypted.value, CryptoJS.enc.Base64.parse(credKey), {
      iv: CryptoJS.enc.Base64.parse(encrypted.iv),
    })

    const decrypt = decrypted.toString(CryptoJS.enc.Utf8)

    return isJson ? JSON.parse(decrypt) : decrypt
  }

  const encryptAES = (data: string, key: string = credKey) => {
    if (data === null || data === '') return null
    return CryptoJS.AES.encrypt(data, key).toString()
  }

  const decryptAES = (data: string, key: string = credKey) => {
    if (data === null || data === '') return null
    const bytes = CryptoJS.AES.decrypt(data, key)
    return bytes.toString(CryptoJS.enc.Utf8)
  }

  /****************************************************************************/
  /*                             METHODS                                      */
  /****************************************************************************/

  return { decryptData, encryptAES, decryptAES }
}
