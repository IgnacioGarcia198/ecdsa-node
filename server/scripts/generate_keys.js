const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

function getAddress(publicKey) {
    const sliced = publicKey.slice(1);
    const publicKeyHash = keccak256(sliced);
    const address = publicKeyHash.slice(-20);
    return address;
}

const privateKey = secp256k1.utils.randomPrivateKey();
console.log('private key:', toHex(privateKey));

const publicKey = secp256k1.getPublicKey(privateKey);
console.log('public key:', toHex(publicKey));

const address = getAddress(publicKey);
console.log('address:', toHex(address));
