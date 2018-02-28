import React from "react";

import { satoshiToBtc } from '../../helpers/helpers';

const sumValues = (outputs) => outputs.reduce((acc, output) => (acc + output.value), 0);

const Transaction = ({ hash, out }) => (
  <div key={hash}>
    <div>{satoshiToBtc(sumValues(out))} BTC</div>
  </div>
)

const Address = ({ address, balance, transactions }) => {
  if (!address) return null;
  return (
    <section>
      <div>Address: {address}</div>
      <div>Balance: {satoshiToBtc(balance)} BTC</div>
      <div>Transactions: {transactions.map(Transaction)}</div>
    </section>
  );
};

export default Address;
