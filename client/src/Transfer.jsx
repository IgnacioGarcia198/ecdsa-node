import { useState } from "react";
import server from "./server";
import signMessage from "../../shared/signMessage";
import { signatureToString } from "../../shared/signatureSerial";

function Transfer({ address, setBalance, privateKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [signature, setSignature] = useState("{}");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const signature = await signMessage(sendAmount, privateKey);
      const signatureString = signatureToString(signature);
      setSignature(signatureString);
      const {
        data: { balance },
      } = await server.post(`send`, {
        amount: parseInt(sendAmount),
        recipient: recipient,
        signature: signatureString,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
      <div>
            Signature: {signature}
            </div>
    </form>
  );
}

export default Transfer;
