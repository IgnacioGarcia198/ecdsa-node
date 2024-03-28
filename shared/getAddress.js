import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex } from "ethereum-cryptography/utils";
//import signMessage from './signMessage.js';
import hashMessage from "./hashMessage.js";

export function getAddressFromPrivateKey(privateKey) {
    const publicKey = secp256k1.getPublicKey(privateKey);
    const sliced = publicKey.slice(1);
    const publicKeyHash = keccak256(sliced);
    const address = publicKeyHash.slice(-20);
    return toHex(address);
}

export function getAddressFromSignature(message, signature) {
    const publicKey = signature.recoverPublicKey(hashMessage(message)).toRawBytes();
    //console.log("public key:", publicKey);
    const sliced = publicKey.slice(1);
    const publicKeyHash = keccak256(sliced);
    const address = publicKeyHash.slice(-20);
    return toHex(address);
}

//export default getAddress;

//async function main() {
//    const privateKey = "ae77d7af379168852b391d1fde33e44f3670e9ad5e5bfc0e67372b5ea94a8ed7";
//    const signed = await signMessage("hello there", privateKey);
//    console.log("signed:", signed);
//    const address = getAddressFromSignature("hello there", signed);
//    console.log("address", address);
//}
//
//main()