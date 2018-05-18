const https = require('https');
const crypto = require('crypto');

const publicKey = process.env.MARVEL_PUBLIC_KEY;
const privateKey = process.env.MARVEL_PRIVATE_KEY;
const defaultAddress = 'https://gateway.marvel.com:443/v1/public';

let count = 0;
let cache = [];

const forward = (urlPath, output) => {
  const timestamp = Math.floor(new Date() / 1000);
  console.log(count++);

  const digest = generateHash(timestamp, privateKey, publicKey);
  const paramSeparator = urlPath.indexOf('?') < 0 ? '?' : '&';

  const addr = `${defaultAddress}${urlPath}${paramSeparator}ts=${timestamp}&apikey=${publicKey}&hash=${digest}`;

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

generateHash = (timestamp, privateKey, publicKey) => {
  const hash = crypto.createHash('md5');

  hash.update(timestamp + privateKey + publicKey);
  return hash.digest('hex');
}

module.exports = forward;
