import express from "express";
const app = express();
import cors from "cors";
//import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { signatureFromString } from "../shared/signatureSerial.js"
import { getAddressFromSignature } from "../shared/getAddress.js";
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "bc2253751aa820737a5cbd24bc3cf9c5e221d3a4": 100,
  "db304d05c946b76d51d4f309e818bb59c67e413f": 50,
  "b1b76b7dc32f93770df64a53cac849e80e4e805a": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { amount, recipient, signature } = req.body;
  const realSignature = signatureFromString(signature);
  const sender = getAddressFromSignature(amount.toString(), realSignature);
  console.log("sending", amount, "from", sender, "to", recipient, "Signature:", signature);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
