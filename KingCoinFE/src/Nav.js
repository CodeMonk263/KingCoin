import React from "react";
import { Link } from "react-router-dom";
import ViewTransaction from "./ViewTransaction";
import "../src/stylesheets/Nav.css";
import logo from "./pic.png"

class Nav extends React.Component {
  render() {
    return (
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <Link to="/" className="navbar-item">
            <img
              src={logo}
              width="28"
              height="28"
            />
            &nbsp;&nbsp;
            <h1><b>KingCoin</b></h1>
          </Link>
          <a
            role="button"
            class="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link to="/view_transactions" className="navbar-item">
              View Transactions
            </Link>
            <Link to="/make_transactions" className="navbar-item">
              Make Transaction
            </Link>
            <Link to="/mine_transaction" className="navbar-item">
              Mine
            </Link>
            <Link to="/connect_node" className="navbar-item">
              Connect
            </Link>

            {/* <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">More</a>

              <div class="navbar-dropdown">
                <a class="navbar-item">About</a>
                <a class="navbar-item">Jobs</a>
                <a class="navbar-item">Contact</a>
                <hr class="navbar-divider" />
                <a class="navbar-item">Report an issue</a>
              </div>
            </div> */}
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <Link class="button is-primary" to="/add_user">
                  <strong>Add User</strong>
                </Link>
                {/* <a class="button is-light">Log in</a> */}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
