import { secp256k1 } from "ethereum-cryptography/secp256k1";
import hashMessage from "./hashMessage.js";

async function signMessage(msg, privateKey) {
    return secp256k1.sign(hashMessage(msg), privateKey)
}

export default signMessage;