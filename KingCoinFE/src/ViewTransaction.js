import React from "react";
import TransactionCard from "./TransactionCard";
import axios from "axios";
import serverUrl from "./constants";
class ViewTransaction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount = () => {
    axios.get(`${serverUrl}/api/get_blockchain`).then((response) => {
      console.log(response.data);
      this.setState({ data: response.data.chain });
    });
  };
  updateTransactions = () => {
    axios.get(`${serverUrl}/api/update_chain`).then((response) => {
      console.log(response.data);
      this.setState({
        data: response.data.new_chain || response.data.actual_chain,
      });
    });
  };
  render() {
    const bottomRightStyle = {
      position: "fixed",
      right: "3%",
      bottom: "3%",
      borderRadius: "100%",
    };
    return (
      <div className="container">
        <h1 className="title" style={{ marginBottom: "3%" }}>
          <b>Transactions</b>
        </h1>
        <div className="columns is-multiline">
          {this.state.data.map((block) =>
            block.transactions.map((transaction) => (
              <TransactionCard
                sender={transaction.sender}
                receiver={transaction.receiver}
                amount={transaction.amount}
              />
            ))
          )}
          {/* <TransactionCard sender="Mahesh" receiver="Suresh" amount="200" />
          <TransactionCard sender="Mahesh" receiver="Suresh" amount="200" />
          <TransactionCard sender="Mahesh" receiver="Suresh" amount="200" />
          <TransactionCard sender="Mahesh" receiver="Suresh" amount="200" />
          <TransactionCard sender="Mahesh" receiver="Suresh" amount="200" /> */}
        </div>
        <button
          class="button is-primary is-large"
          style={bottomRightStyle}
          onClick={this.updateTransactions}
        >
          <span class="icon">
            <i class="fas fa-sync"></i>
          </span>
        </button>
      </div>
    );
  }
}

const data = {
  actual_chain: [
    {
      index: 1,
      previous_hash: "0",
      proof: 1,
      timestamp: "2021-04-09 01:44:36.020152",
      transactions: [],
    },
    {
      index: 2,
      previous_hash:
        "22b015a0f317f58991cf5a039c679003d95004f4f86394c1867b406dfbcad7ce",
      proof: 533,
      timestamp: "2021-04-09 01:45:16.739225",
      transactions: [
        {
          amount: 10,
          receiver: "Suresh",
          sender: "Mahesh",
        },
        {
          amount: 1,
          receiver: "Mahesh",
          sender: "53d8c0c6e0004ebdbad3ed6edf794897",
        },
      ],
    },
  ],
  message: "All good. The chain is the largest one.",
};
const data2 = {
  chain: [
    {
      index: 1,
      previous_hash: "0",
      proof: 1,
      timestamp: "2021-04-12 14:20:37.796814",
      transactions: [],
    },
    {
      index: 2,
      previous_hash:
        "6ac735bb265800210b642ee8e0d6e153a652876db9c7b649687845595ae67591",
      proof: 533,
      timestamp: "2021-04-12 14:21:53.080556",
      transactions: [
        {
          amount: 6,
          receiver:
            "30819f300d06092a864886f70d010101050003818d0030818902818100f2c85a8ca132491e479f09fc397d570366ddef225a4e05143833f4b65b1dd3c4befebcfd6301b7f141a3312df3c421ab87fd811868b2937d4452d023fe3af352b57da0da268a93772dd776a418df9dad999545715eb1171d9aa178535c5bb60d162e7e5af3664f80f30156ad2797edf973be87b65fbd57eaeefdc517dd2c339d0203010001",
          sender:
            "30819f300d06092a864886f70d010101050003818d0030818902818100a6444c65eecd2d73b33bafbe1dbe2f42a666a0f1b75bfa54ec4ec97081f5ac0a17392467ae1eeaac4e6c814dae7483c514fb775c64572c70da7b7956e10d74c4fac10da988a0c9a3f6f3eb71fa79ab40cbbe9657a097b174889c81e9b48615afaf50981dca751bab04031b9f20f79cefe538ac13d1fb304855aae295bb8dcdcf0203010001",
        },
        {
          amount: 1,
          receiver:
            "30819f300d06092a864886f70d010101050003818d0030818902818100a6444c65eecd2d73b33bafbe1dbe2f42a666a0f1b75bfa54ec4ec97081f5ac0a17392467ae1eeaac4e6c814dae7483c514fb775c64572c70da7b7956e10d74c4fac10da988a0c9a3f6f3eb71fa79ab40cbbe9657a097b174889c81e9b48615afaf50981dca751bab04031b9f20f79cefe538ac13d1fb304855aae295bb8dcdcf0203010001",
          sender: "a8326f2e2d214972a8a3ee27024b2f90",
        },
      ],
    },
    {
      index: 3,
      previous_hash:
        "7a1edce88242dc29d8a7330b9dc45b1f17aa83fef23cc746f2aded7ce37327a7",
      proof: 45293,
      timestamp: "2021-04-12 15:12:46.931337",
      transactions: [
        {
          amount: 6,
          receiver:
            "30819f300d06092a864886f70d010101050003818d0030818902818100f2c85a8ca132491e479f09fc397d570366ddef225a4e05143833f4b65b1dd3c4befebcfd6301b7f141a3312df3c421ab87fd811868b2937d4452d023fe3af352b57da0da268a93772dd776a418df9dad999545715eb1171d9aa178535c5bb60d162e7e5af3664f80f30156ad2797edf973be87b65fbd57eaeefdc517dd2c339d0203010001",
          sender:
            "30819f300d06092a864886f70d010101050003818d0030818902818100a6444c65eecd2d73b33bafbe1dbe2f42a666a0f1b75bfa54ec4ec97081f5ac0a17392467ae1eeaac4e6c814dae7483c514fb775c64572c70da7b7956e10d74c4fac10da988a0c9a3f6f3eb71fa79ab40cbbe9657a097b174889c81e9b48615afaf50981dca751bab04031b9f20f79cefe538ac13d1fb304855aae295bb8dcdcf0203010001",
        },
        {
          amount: 2,
          receiver:
            "30819f300d06092a864886f70d010101050003818d0030818902818100d4d1f43628292cef0fac1b0785024b4c10ce95e83971d45e7852497b3c5e5bbf45fe5285bc0f5111cf4dea6d7eb8bc78a7b24fa8dd5f01e635343e4451d0caf1126305bc65b7012ddabefb5920cf660db501132859dd366d3efc5c4151cce3d8ad30ae0bbea43a1a9799081026dee2f7b9926448b66d744bf765689d49ccbda90203010001",
          sender:
            "30819f300d06092a864886f70d010101050003818d0030818902818100a6444c65eecd2d73b33bafbe1dbe2f42a666a0f1b75bfa54ec4ec97081f5ac0a17392467ae1eeaac4e6c814dae7483c514fb775c64572c70da7b7956e10d74c4fac10da988a0c9a3f6f3eb71fa79ab40cbbe9657a097b174889c81e9b48615afaf50981dca751bab04031b9f20f79cefe538ac13d1fb304855aae295bb8dcdcf0203010001",
        },
        {
          amount: 1,
          receiver:
            "30819f300d06092a864886f70d010101050003818d0030818902818100a6444c65eecd2d73b33bafbe1dbe2f42a666a0f1b75bfa54ec4ec97081f5ac0a17392467ae1eeaac4e6c814dae7483c514fb775c64572c70da7b7956e10d74c4fac10da988a0c9a3f6f3eb71fa79ab40cbbe9657a097b174889c81e9b48615afaf50981dca751bab04031b9f20f79cefe538ac13d1fb304855aae295bb8dcdcf0203010001",
          sender: "59c199ea9ca34db58555a2fac484ad1c",
        },
      ],
    },
  ],
  length: 3,
};

export default ViewTransaction;
