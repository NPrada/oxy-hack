export const loanRouterAbi = [
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_rawCollateral",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "_buttonToken",
        type: "address[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "buttonMapping",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_loanContract",
        type: "address",
      },
      {
        internalType: "address",
        name: "_lendingPool",
        type: "address",
      },
    ],
    name: "convertAndCollect",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_loanFactory",
        type: "address",
      },
      {
        internalType: "address",
        name: "_rawCollateral",
        type: "address",
      },
      {
        internalType: "address",
        name: "_lendingPool",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_paymentFrequency",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_numPayments",
        type: "uint256",
      },
    ],
    name: "createAndBorrow",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_loanContract",
        type: "address",
      },
      {
        internalType: "address",
        name: "_lendingPool",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "repayAndCollect",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
