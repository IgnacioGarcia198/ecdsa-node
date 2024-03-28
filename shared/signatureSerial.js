//import signMessage from './signMessage.js';
import { secp256k1 } from "ethereum-cryptography/secp256k1";

export function signatureToString(signature) {
  const jsonObject = { hex : signature.toCompactHex(), recovery : signature.recovery };
  return JSON.stringify(jsonObject);
}

export function signatureFromString(jsonString) {
    const parsed = JSON.parse(jsonString);
    const signature = secp256k1.Signature.fromCompact(parsed.hex);
    return signature.addRecoveryBit(parsed.recovery);
}

//export default signMessage;
//async function main() {
//    const privateKey = "ae77d7af379168852b391d1fde33e44f3670e9ad5e5bfc0e67372b5ea94a8ed7";
//    const signed = await signMessage("hello there", privateKey);
//    console.log("signed:", signed);
//    const json = signatureToString(signed);
//    console.log("signature serialized:", json);
//    const signature = signatureFromString(json);
//    console.log("original signature:", signature);
//}

//main()


