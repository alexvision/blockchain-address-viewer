// Vendor
import get from "lodash.get";
import React, { Component } from "react";

// Internal
import Address from "../Address/Address";
import Input from "../Input/Input";

// CSS
import "./App.css";

const fetchAddress = (address = "") => {
  const options = {
    "Content-Type": "application/json; charset=UTF-8",
    "Access-Control-Allow-Origin": "*"
  };
  return fetch(`https://blockchain.info/rawaddr/${address}?&cors=true`, options)
    .then(res => res.json())
    .catch(err => console.error("something went wrong", err));
};

const getAddress = state => get(state, `data.[${get(state, "address")}]`, {});

class App extends Component {
  constructor() {
    super();
    this.state = { address: "17rGYZe9cAqR4Xg6DKdYQUy5MzPW4CXTpV" };
    this.updateState = this.updateState.bind(this);
  }
  render() {
    const currentAddress = getAddress(this.state);
    return (
      <div className="App">
        <Input address={this.state.address} updateState={this.updateState} />
        <Address
          address={currentAddress.address}
          balance={currentAddress.final_balance}
          transactions={currentAddress.txs}
        />
      </div>
    );
  }
  updateState(data) {
    const { address } = data;
    console.log("ADDRESS", address);
    fetchAddress(address).then(res =>
      this.setState({ address, data: { [address]: res } })
    );
  }
}

export default App;
