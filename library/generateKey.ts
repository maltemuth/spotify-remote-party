import crypto from 'crypto';

const generateKey = (length = 64): string =>
  crypto
    .randomBytes(length * 2)
    .toString('hex')
    .substr(0, length);

export default generateKey;
