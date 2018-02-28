// Vendor
import get from "lodash.get";

const fetchAddress = (address = "") => {
  const url = `http://localhost:8080/blockchain.info/rawaddr/${address}?cors=true`;
  return fetch(url)
    .then(res => res.json())
    .catch(err => console.error("something went wrong", err));
};

const getAddress = state => get(state, `data`, {});

export { getAddress, fetchAddress };
