// Vendor
import React, { Component } from "react";

// Internal
import Address from "../Address/Address";
import Input from "../Input/Input";
import { getAddress, fetchAddress } from "./helpers";

// CSS
import "./App.css";

const ws = new WebSocket("wss://ws.blockchain.info/inv");

class App extends Component {
  constructor() {
    super();
    this.state = { address: "", data: [] };
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    ws.onmessage = event => {
      const data = [event.data, ...this.state.data].slice(0, 50);
      this.setState({ data });
    };
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

    if (this.state.address) {
      ws.send({ op: "addr_unsub", addr: this.state.address });
    }

    fetchAddress(address)
      .then(res => this.setState({ address, data: res }))
      .then(() => {
        ws.send({ op: "addr_sub", addr: address });
      })
      .catch(err =>
        console.error("something went wrong with getting the address", err)
      );
  }
}

export default App;
