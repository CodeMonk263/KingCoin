import React from "react";
import axios from "axios";
import serverUrl from "./constants";
class MakeTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      senderPublicKey: "",
      senderPrivateKey: "",
      receiverPublicKey: "",
      amount: 0,
    };
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };

  makeTransaction = (e) => {
    //make api call and all that
    const transaction = {
      sender_pub: this.state.senderPublicKey,
      sender_pvt: this.state.senderPrivateKey,
      receiver: this.state.receiverPublicKey,
      amount: this.state.amount,
    };
    JSON.stringify(transaction);
    axios
      .post(`${serverUrl}api/add_transaction`, transaction)
      .then((response) => {
        console.log(response.data);
      });
  };

  render() {
    return (
      <form class="box" style={{ margin: "5% 25% 15% 25%" }}>
        <div class="field">
          <label class="label">Sender Public Key</label>
          <div class="control">
            <input
              class="input"
              type="text"
              name="senderPublicKey"
              onChange={this.handleChange}
              value={this.state.senderPublicKey}
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Sender Private Key</label>
          <div class="control">
            <input
              class="input"
              type="text"
              name="senderPrivateKey"
              onChange={this.handleChange}
              value={this.state.senderPrivateKey}
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Receiver Public Key</label>
          <div class="control">
            <input
              class="input"
              type="email"
              name="receiverPublicKey"
              value={this.state.receiverPublicKey}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div class="field has-addons has-addons-centered">
          <p class="control">
            <span className="select">
              <select>
                <option>KING</option>
              </select>
            </span>
          </p>
          <p class="control">
            <input
              className="input"
              type="text"
              name="amount"
              onChange={this.handleChange}
              value={this.state.amount}
            />
          </p>
          <p class="control">
            <a class="button is-primary" onClick={this.makeTransaction}>
              Transfer
            </a>
          </p>
        </div>
      </form>
    );
  }
}
export default MakeTransaction;
