import React from "react";

class Home extends React.Component {
  render() {
    return (
      <section
        class="hero is-success gradient is-fullheight-with-navbar"
        style={{
          background: "linear-gradient(90deg, #7EC525 41.67%, #00C481 100%)"
        }}
      >
        <div
          class="hero-body container has-text-centered"
          style={{ fontFamily: "Quicksand" }}
        >
          <p class="title">Welcome to King Coin</p>
        </div>
      </section>
    );
  }
}

export default Home;
