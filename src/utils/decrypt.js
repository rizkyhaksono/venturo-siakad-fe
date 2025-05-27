import CryptoJS from 'crypto-js';

const secretKey = "12345678901234567890123456789012";

function decrypt(encryptedText) {
  const [ivHex, encryptedHex] = encryptedText.split(':');

  const iv = CryptoJS.enc.Hex.parse(ivHex);
  const encrypted = CryptoJS.enc.Hex.parse(encryptedHex);

  const cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: encrypted,
  });

  const key = CryptoJS.enc.Utf8.parse(secretKey);
  const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
}

export default decrypt;