import React from "react";

class TransactionCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="column is-one-quarter">
        <div class="card">
          <div class="card-content">
            <span class="title">{this.props.amount}</span>
            <span class="subtitle"> KING</span>
          </div>
          <footer class="card-footer">
            <p class="card-footer-item">
              <span>
                {/* View on{" "}
                <a href="https://twitter.com/codinghorror/status/506010907021828096">
                  Twitter
                </a> */}
                <span>
                  <b>Sender</b>
                </span>
                <br />
                <abbr title={this.props.sender}>{this.props.sender.slice(0,10)}</abbr>
              </span>
            </p>
            <p class="card-footer-item">
              <span>
                {/* Share on <a href="#">Facebook</a> */}
                <span>
                  <b>Receiver</b>
                </span>
                <br />
                <abbr title={this.props.receiver}>{this.props.receiver.slice(0,10)}</abbr>
              </span>
            </p>
          </footer>
        </div>
      </div>
    );
  }
}

export default TransactionCard;
