const https = require('https');
const crypto = require('crypto');
const publicKey = process.env.MARVEL_PUBLIC_KEY;
const privateKey = process.env.MARVEL_PRIVATE_KEY;
const defaultAddress = 'https://gateway.marvel.com:443/v1/public/characters';

const forward = (output) => {
  const digest = generateHash(privateKey, publicKey);
  const addr = `${defaultAddress}?ts=${ts}&apikey=${publicKey}&hash=${digest}`;

  https.get(addr, (res) => {
    if (res.statusCode !== 200) {
      output.write(`ERROR ${res.statusCode}`);
    }
    res.on('data', (chunk) => { output.write(chunk); });
    res.on('end', () => {
      output.end();
    });
  });
}

generateHash = (privateKey, publicKey) => {
  const hash = crypto.createHash('md5');

  const timestamp = Math.floor(new Date() / 1000);
  hash.update(timestamp + privateKey + publicKey);
  return hash.digest('hex');
}

module.exports = forward;
