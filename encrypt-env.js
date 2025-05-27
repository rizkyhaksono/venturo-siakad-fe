const fs = require('fs');
const crypto = require('crypto');
require('dotenv').config();

const secretKey = "12345678901234567890123456789012";
const algorithm = 'aes-256-cbc';

// Mendapatkan argumen mode
const args = process.argv.slice(2);
let envFileName = '.env';

// Menentukan file berdasarkan argumen mode
const modeArg = args.find(arg => arg.startsWith('--mode='));
if (modeArg) {
  const mode = modeArg.split('=')[1];
  envFileName = `.env.${mode}`;
}
const envFilePath = `./${envFileName}`;

// Fungsi untuk mengenkripsi teks
function encrypt(text) {
  const iv = crypto.randomBytes(16); // Inisialisasi vektor
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex'); // Gabungkan iv dan teks terenkripsi
}

// Baca .env dan enkripsi setiap nilai
const envData = fs.readFileSync(envFilePath, 'utf-8');
const encryptedEnv = envData
  .split('\n')
  .map(line => {
    const [key, value] = line.split('=');
    if (value) {
      console.log(value)
      return `${key}=${encrypt(value.trim())}`; // Enkripsi nilai
    }
    return line; // Jika tidak ada nilai, kembalikan baris
  })
  .join('\n');

// Simpan ke file .env.encrypted
fs.writeFileSync('.env.encrypted', encryptedEnv);
console.log('Environment variables encrypted!');