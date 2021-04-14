import React from "react";
import axios from "axios";
import serverUrl from './constants'
function UserKeys(props) {
  return (
    <div class="card container" style={{ marginTop: "5%" }}>
      <header class="card-header">
        <p class="card-header-title">User Details: {props.username}</p>
      </header>
      <div class="card-content">
        <div class="content" style={{ wordBreak: "break-all" }}>
          <b>User Public Key : </b>
          {props.publicKey}
          <br />
          <br />
          <b>User Private Key : </b> {props.privateKey}
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      userPublicKey:
        "",
      userPrivateKey:
        "",
      fetched: false,
      isDisabled: true
    };
  }

  handleChange = (e) => {
    this.setState({ username: e.target.value }, () => {
      if (this.state.username.length > 0) {
        this.setState({ isDisabled: false });
      } else {
        this.setState({ isDisabled: true });
      }
    });
    console.log(this.state.username);
  };

  fetchUserDetails = (e) => {
    //api call
    e.preventDefault();
    const data = {
      name : this.state.username
    }
    JSON.stringify(data);
    axios.post(`${serverUrl}/api/add_user`, data).then((response) => {
      this.setState({userPublicKey: response.data.client_pub_key,
                      userPrivateKey: response.data.client_pvt_key,
                    fetched: true})
    });
  };
  render() {
    return (
      <div>
        {!this.state.fetched && (
          <form class="box" style={{ margin: "5% 25% 2% 25%" }}>
            <div class="field">
              <label class="label">Enter your username</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  name="username"
                  onChange={this.handleChange}
                  value={this.state.username}
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
                  Add User
                </button>
              </p>
            </div>
          </form>
        )}
        <div>
          {this.state.fetched && (
            <UserKeys
              username={this.state.username}
              privateKey={this.state.userPrivateKey}
              publicKey={this.state.userPublicKey}
            />
          )}
        </div>
      </div>
    );
  }
}

export default AddUser;
