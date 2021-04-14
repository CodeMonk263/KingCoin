import React from "react";
import TransactionCard from "./TransactionCard";
import axios from "axios";
import serverUrl from "./constants";

const data = {
  net_balance: -69,
  user_pub_key:
    "30819f300d06092a864886f70d010101050003818d003081890281810093d25da1fbbf66bb0006095bd623af57dc7d4fdfa678f828653e1bc4f4ab2eaf441505c23d1e087e2a67f6c0b755b134e07806945ebc9c63adf2e3eaf7e9b18218dc1ee891b00dc50fd915806353dab8c3e87e5bca48667a849188c65313f4ecf158c83772c46254846dd1cc773ee0527902ae137d12d7def3e26a163c824f310203010001",
  user_transactions: [
    {
      amount: 26,
      receiver:
        "30819f300d06092a864886f70d010101050003818d0030818902818100cc4cfb3e1a8620ae55567a430c04dd976f6c7957138cda531ae8274b270c60d88e62781e2ca9ab0ad9178a37c8fdebdab803ea9cc77f2103997eb8f04d072507028ac1bec38f8a2c18d96fa0209980c97a29b653ed5224ff1f68dbb89c00a020707c5ce6389470638279ba7c1603e03770bb4c6e2c4b7d9ffd74615ea31294d50203010001",
      sender:
        "30819f300d06092a864886f70d010101050003818d003081890281810093d25da1fbbf66bb0006095bd623af57dc7d4fdfa678f828653e1bc4f4ab2eaf441505c23d1e087e2a67f6c0b755b134e07806945ebc9c63adf2e3eaf7e9b18218dc1ee891b00dc50fd915806353dab8c3e87e5bca48667a849188c65313f4ecf158c83772c46254846dd1cc773ee0527902ae137d12d7def3e26a163c824f310203010001",
    },
    {
      amount: 23,
      receiver:
        "30819f300d06092a864886f70d010101050003818d0030818902818100cc4cfb3e1a8620ae55567a430c04dd976f6c7957138cda531ae8274b270c60d88e62781e2ca9ab0ad9178a37c8fdebdab803ea9cc77f2103997eb8f04d072507028ac1bec38f8a2c18d96fa0209980c97a29b653ed5224ff1f68dbb89c00a020707c5ce6389470638279ba7c1603e03770bb4c6e2c4b7d9ffd74615ea31294d50203010001",
      sender:
        "30819f300d06092a864886f70d010101050003818d003081890281810093d25da1fbbf66bb0006095bd623af57dc7d4fdfa678f828653e1bc4f4ab2eaf441505c23d1e087e2a67f6c0b755b134e07806945ebc9c63adf2e3eaf7e9b18218dc1ee891b00dc50fd915806353dab8c3e87e5bca48667a849188c65313f4ecf158c83772c46254846dd1cc773ee0527902ae137d12d7def3e26a163c824f310203010001",
    },
    {
      amount: 20,
      receiver:
        "30819f300d06092a864886f70d010101050003818d0030818902818100cc4cfb3e1a8620ae55567a430c04dd976f6c7957138cda531ae8274b270c60d88e62781e2ca9ab0ad9178a37c8fdebdab803ea9cc77f2103997eb8f04d072507028ac1bec38f8a2c18d96fa0209980c97a29b653ed5224ff1f68dbb89c00a020707c5ce6389470638279ba7c1603e03770bb4c6e2c4b7d9ffd74615ea31294d50203010001",
      sender:
        "30819f300d06092a864886f70d010101050003818d003081890281810093d25da1fbbf66bb0006095bd623af57dc7d4fdfa678f828653e1bc4f4ab2eaf441505c23d1e087e2a67f6c0b755b134e07806945ebc9c63adf2e3eaf7e9b18218dc1ee891b00dc50fd915806353dab8c3e87e5bca48667a849188c65313f4ecf158c83772c46254846dd1cc773ee0527902ae137d12d7def3e26a163c824f310203010001",
    },
    {
      amount: 20,
      receiver:
        "30819f300d06092a864886f70d010101050003818d0030818902818100cc4cfb3e1a8620ae55567a430c04dd976f6c7957138cda531ae8274b270c60d88e62781e2ca9ab0ad9178a37c8fdebdab803ea9cc77f2103997eb8f04d072507028ac1bec38f8a2c18d96fa0209980c97a29b653ed5224ff1f68dbb89c00a020707c5ce6389470638279ba7c1603e03770bb4c6e2c4b7d9ffd74615ea31294d50203010001",
      sender:
        "30819f300d06092a864886f70d010101050003818d003081890281810093d25da1fbbf66bb0006095bd623af57dc7d4fdfa678f828653e1bc4f4ab2eaf441505c23d1e087e2a67f6c0b755b134e07806945ebc9c63adf2e3eaf7e9b18218dc1ee891b00dc50fd915806353dab8c3e87e5bca48667a849188c65313f4ecf158c83772c46254846dd1cc773ee0527902ae137d12d7def3e26a163c824f310203010001",
    },
    {
      amount: 20,
      receiver:
        "30819f300d06092a864886f70d010101050003818d0030818902818100cc4cfb3e1a8620ae55567a430c04dd976f6c7957138cda531ae8274b270c60d88e62781e2ca9ab0ad9178a37c8fdebdab803ea9cc77f2103997eb8f04d072507028ac1bec38f8a2c18d96fa0209980c97a29b653ed5224ff1f68dbb89c00a020707c5ce6389470638279ba7c1603e03770bb4c6e2c4b7d9ffd74615ea31294d50203010001",
      sender:
        "30819f300d06092a864886f70d010101050003818d003081890281810093d25da1fbbf66bb0006095bd623af57dc7d4fdfa678f828653e1bc4f4ab2eaf441505c23d1e087e2a67f6c0b755b134e07806945ebc9c63adf2e3eaf7e9b18218dc1ee891b00dc50fd915806353dab8c3e87e5bca48667a849188c65313f4ecf158c83772c46254846dd1cc773ee0527902ae137d12d7def3e26a163c824f310203010001",
    },
    {
      amount: 20,
      receiver:
        "30819f300d06092a864886f70d010101050003818d0030818902818100cc4cfb3e1a8620ae55567a430c04dd976f6c7957138cda531ae8274b270c60d88e62781e2ca9ab0ad9178a37c8fdebdab803ea9cc77f2103997eb8f04d072507028ac1bec38f8a2c18d96fa0209980c97a29b653ed5224ff1f68dbb89c00a020707c5ce6389470638279ba7c1603e03770bb4c6e2c4b7d9ffd74615ea31294d50203010001",
      sender:
        "30819f300d06092a864886f70d010101050003818d003081890281810093d25da1fbbf66bb0006095bd623af57dc7d4fdfa678f828653e1bc4f4ab2eaf441505c23d1e087e2a67f6c0b755b134e07806945ebc9c63adf2e3eaf7e9b18218dc1ee891b00dc50fd915806353dab8c3e87e5bca48667a849188c65313f4ecf158c83772c46254846dd1cc773ee0527902ae137d12d7def3e26a163c824f310203010001",
    },
    {
      amount: 20,
      receiver:
        "30819f300d06092a864886f70d010101050003818d0030818902818100cc4cfb3e1a8620ae55567a430c04dd976f6c7957138cda531ae8274b270c60d88e62781e2ca9ab0ad9178a37c8fdebdab803ea9cc77f2103997eb8f04d072507028ac1bec38f8a2c18d96fa0209980c97a29b653ed5224ff1f68dbb89c00a020707c5ce6389470638279ba7c1603e03770bb4c6e2c4b7d9ffd74615ea31294d50203010001",
      sender:
        "30819f300d06092a864886f70d010101050003818d003081890281810093d25da1fbbf66bb0006095bd623af57dc7d4fdfa678f828653e1bc4f4ab2eaf441505c23d1e087e2a67f6c0b755b134e07806945ebc9c63adf2e3eaf7e9b18218dc1ee891b00dc50fd915806353dab8c3e87e5bca48667a849188c65313f4ecf158c83772c46254846dd1cc773ee0527902ae137d12d7def3e26a163c824f310203010001",
    },
  ],
};
class ViewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      userKey: "",
      showDetails: false,
      isValid: false,
      fetched: false,
      isDisabled: true,
    };
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      if (this.state.userKey.length > 0) {
        this.setState({ isDisabled: false });
      } else {
        this.setState({ isDisabled: true });
      }
      console.log(this.state);
    });
  };
  fetchUserDetails = (e) => {
    e.preventDefault();
    // this.setState({ fetched: true });
    const payload = {
      user_pub_key: this.state.userKey,
    };
    axios.post(`${serverUrl}/api/view_user`, payload).then((response) => {
      console.log(response.data);
      this.setState({ data: response.data }, () =>
        this.setState({ fetched: true })
      );
    });
  };
  render() {
    return (
      <div>
        {!this.state.fetched && (
          <form class="box" style={{ margin: "5% 25% 2% 25%" }}>
            <div class="field">
              <label class="label">Enter User Public Key</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  name="userKey"
                  onChange={this.handleChange}
                  value={this.state.userKey}
                  disabled={this.state.fetched}
                />
              </div>
              <br />
              <p class="control">
                <button
                  class="button is-primary"
                  onClick={this.fetchUserDetails}
                  disabled={this.state.isDisabled}
                >
                  View Details
                </button>
              </p>
            </div>
          </form>
        )}
        <div className="container">
          <div
            style={{ marginBottom: "3%" }}
            style={{ display: !this.state.fetched ? "none" : "" }}
          >
            <span class="title">
              User balance: {this.state.data.net_balance}
            </span>
            <span class="subtitle">&nbsp;KING</span>
            <br />
            <br />
          </div>
          <div className="columns is-multiline">
            {this.state.fetched &&
              this.state.data.user_transactions.map((transaction) => (
                <TransactionCard
                  amount={transaction.amount}
                  sender={transaction.sender}
                  receiver={transaction.receiver}
                />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ViewUser;
