import React, { Component } from "react";

class Input extends Component {
  constructor(props) {
    super();
    this.state = { text: props.address };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  render() {
    console.log(this.state.text);
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.text}
          onChange={this.handleChange}
        />
      </form>
    );
  }
  handleChange(e) {
    this.setState({ text: e.target.value });
  }
  handleSubmit(e) {
    console.log(e, this.state.text);
    this.props.updateState({ address: this.state.text });
    e.preventDefault();
  }
}

export default Input;
