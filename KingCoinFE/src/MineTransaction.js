import axios from "axios";
import React from "react";
import serverUrl from './constants'

function TransactionRow(props) {
  console.log(props);
  return (
    <tr>
      <td style={{ wordWrap: "break-word", maxWidth: "30vw" }}>
        <b>{props.index + 1}</b>
      </td>
      <td style={{ wordWrap: "break-word", maxWidth: "30vw" }}>
        {props.sender}
      </td>
      <td style={{ wordWrap: "break-word", maxWidth: "30vw" }}>
        {props.receiver}{" "}
      </td>
      <td style={{ wordWrap: "break-word", maxWidth: "30vw" }}>
        {props.amount}
      </td>
    </tr>
  );
}
class MineTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      mined: false
    };
  }
  mineBlock = () => {
    //API CALL to set data
    axios.get(`${serverUrl}/api/mine_block`).then((response) => {
      console.log(response.data);
      this.setState({ mined: true, data : response.data });
    });
  };
  render() {
    return (
      <div>
        <button
          class="button is-primary is-rounded"
          style={{ margin: "5%" }}
          onClick={this.mineBlock}
          disabled={this.state.mined}
        >
          <span class="icon">
            <i class="fas fa-coins"></i>
          </span>
          <span>Mine Transactions</span>
        </button>
        {this.state.mined && (
          <div class="table-container">
            <table class="table container">
              <thead>
                <tr>
                  <th style={{ wordWrap: "break-word", maxWidth: "30vw" }}>
                    No.
                  </th>
                  <th style={{ wordWrap: "break-word", maxWidth: "30vw" }}>
                    Sender
                  </th>
                  <th style={{ wordWrap: "break-word", maxWidth: "30vw" }}>
                    Receiver
                  </th>
                  <th style={{ wordWrap: "break-word", maxWidth: "30vw" }}>
                    Amount
                  </th>
                </tr>
              </thead>

              <tbody>
                {this.state.data.transactions.map((transaction, index) => (
                  <TransactionRow
                    sender={transaction.sender}
                    receiver={transaction.receiver}
                    amount={transaction.amount}
                    key={index}
                    index={index}
                    style={{ wordBreak: "break-all" }}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default MineTransaction;
