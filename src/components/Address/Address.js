import React from "react";

const Transaction = ({hash}) => <div>{hash}</div>

const Address = ({ address, balance, transactions }) => {
  if (!address) return null;
  return (
    <section>
      <div>Address: {address}</div>
      <div>Balance: {balance}</div>
      <div>Transactions: {transactions.map(Transaction)}</div>
    </section>
  );
};

export default Address;
