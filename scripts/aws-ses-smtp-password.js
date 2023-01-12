const crypto = require('crypto');
const utf8 = require('utf8');
require('dotenv').config()


const key =  process.env.AWS_SES_SECRET_KEY;
console.log(key);

// The values of the following variables should always stay the same.
const message = "SendRawEmail";
const versionInBytes = [0x02];

const signature = crypto
    .createHmac("sha256", Buffer.from((utf8.encode(key)).split("").map(a => a.charCodeAt(0))))
    .update(utf8.encode(message))
    .digest("binary")
    .split("");

//copy of array
const signatureAndVersion = versionInBytes.slice();

signature.forEach(a => signatureAndVersion.push(a.charCodeAt(0)));

const smtpPassword = Buffer.from(signatureAndVersion).toString("base64");
console.log(smtpPassword);