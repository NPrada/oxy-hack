// components/LoanCard.tsx
import React, { useState } from "react";
import { useAccount, useBalance, useFeeData } from "wagmi";
import { USDCAddress } from "../constants/addresses";

export const BorrowCard: React.FC = () => {
  const { isConnected, address } = useAccount();

  // const { data, isError, isLoading } = useBalance({
  //   address,
  //   // token: USDCAddress,
  // });
  // console.log("data", isError, isLoading, data);

  // const { data: feeData } = useFeeData();
  // console.log("feeData", feeData);

  // const { data, isError, isLoading } = useToken({
  //   address: '0xc18360217d8f7ab5e7c516566761ea12ce7f9d72',
  // })

  const collaterals = ["BTC", "USDC", "ETH"];
  const loanAssets = ["USDC", "ETH", "BTC"];
  const intervals = ["weekly", "monthly"];

  const [selectedCollateral, setSelectedCollateral] = useState(collaterals[0]);
  const [collateralAmount, setCollateralAmount] = useState("");
  const [selectedLoanAsset, setSelectedLoanAsset] = useState(loanAssets[0]);
  const [loanAmount, setLoanAmount] = useState(""); // Just for display
  const [selectedInterval, setSelectedInterval] = useState(intervals[0]);
  const [numberOfPeriods, setNumberOfPeriods] = useState("1");

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex">
      <div className="flex-1 pr-4 border-r border-gray-200">
        {/* Collateral Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Collateral Deposit
          </label>
          <select
            value={selectedCollateral}
            onChange={(e) => setSelectedCollateral(e.target.value)}
            className="w-full px-2 py-1 rounded border"
          >
            {collaterals.map((collateral) => (
              <option key={collateral} value={collateral}>
                {collateral}
              </option>
            ))}
          </select>
        </div>

        {/* Collateral Amount Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Amount of Collateral
          </label>
          <input
            type="number"
            value={collateralAmount}
            onChange={(e) => setCollateralAmount(e.target.value)}
            placeholder="0.0"
            className="w-full px-2 py-1 rounded border"
          />
        </div>

        {/* Loan Asset Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Loan Asset
          </label>
          <select
            value={selectedLoanAsset}
            onChange={(e) => setSelectedLoanAsset(e.target.value)}
            className="w-full px-2 py-1 rounded border"
          >
            {loanAssets.map((asset) => (
              <option key={asset} value={asset}>
                {asset}
              </option>
            ))}
          </select>
        </div>

        {/* Display Loan Amount */}
        <div className="mb-4">
          <span className="text-gray-700 text-sm font-bold">Loan Amount:</span>{" "}
          {loanAmount}
        </div>

        {/* Repayment Interval Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Repayment Interval
          </label>
          <select
            value={selectedInterval}
            onChange={(e) => setSelectedInterval(e.target.value)}
            className="w-full px-2 py-1 rounded border"
          >
            {intervals.map((interval) => (
              <option key={interval} value={interval}>
                {interval}
              </option>
            ))}
          </select>
        </div>

        {/* Number of Weeks/Months Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Number of {selectedInterval === "weekly" ? "Weeks" : "Months"}
          </label>
          <input
            type="number"
            value={numberOfPeriods}
            onChange={(e) => setNumberOfPeriods(e.target.value)}
            className="w-full px-2 py-1 rounded border"
          />
        </div>
      </div>

      <div className="pl-4 flex flex-col justify-between">
        {/* Interest Rate and Gas Cost */}
        <div className="mb-4">
          <p>
            <strong>Interest Rate:</strong> X% (Replace with your data)
          </p>
          <p>
            <strong>Gas Cost:</strong> Y ETH (Replace with your data)
          </p>
        </div>

        <div className="flex gap-2">
          <button className="bg-green-500 text-white py-2 px-4 rounded">
            Approve
          </button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};
