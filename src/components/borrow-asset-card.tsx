// components/LoanCard.tsx
import React, { useState } from "react";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import {
  buttonFactory,
  collateralAddr,
  lendingPoolAddr,
  loanFactory,
  loanRouterAddr,
  wBTCAddress,
} from "../constants/addresses";
import { parseEther } from "viem";
import { wBtcAbi } from "../constants/abis/wBtc";
import { loanRouterAbi } from "../constants/abis/loanRouter";
import { useRouter } from "next/router";
import { useLoansStorage } from "../hooks/storagehooks";
import { LoadingSpinner } from "./loading-spinner";

export const BorrowCard: React.FC = () => {
  const { loans, saveLoans } = useLoansStorage();
  const router = useRouter();

  const {
    data,
    isSuccess: isApproveSuccess,
    write: writeApprove,
  } = useContractWrite({
    address: wBTCAddress,
    abi: wBtcAbi,
    functionName: "approve",
  });

  const { data: waitTransactionData, isError } = useWaitForTransaction(data);

  const {
    data: loanData,
    isLoading: loanIsLoading,
    isSuccess: loanIsCreated,
    write,
  } = useContractWrite({
    address: loanRouterAddr,
    abi: loanRouterAbi,
    functionName: "createAndBorrow",
  });

  const collaterals = ["BTC", "ETH"];
  const loanAssets = ["USDC", "USDT"];
  const intervals = ["weekly", "monthly"];

  const [selectedCollateral, setSelectedCollateral] = useState(collaterals[0]);
  const [collateralAmount, setCollateralAmount] = useState("");
  const [selectedLoanAsset, setSelectedLoanAsset] = useState(loanAssets[0]);
  const [loanAmount, setLoanAmount] = useState(""); // Just for display
  const [selectedInterval, setSelectedInterval] = useState(intervals[0]);
  const [numberOfPeriods, setNumberOfPeriods] = useState<number>(Number("1"));

  if (loanIsCreated) {
    console.log("loanData", loanData);
    saveLoans([...loans, loanData]);
    router.push("/borrow?isSuccess=true");
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex  max-w-3xl m-auto">
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
            onChange={(e) => setNumberOfPeriods(Number(e.target.value))}
            className="w-full px-2 py-1 rounded border"
          />
        </div>
      </div>

      <div className="pl-4 flex flex-col justify-between min-w-[260px]">
        {/* Interest Rate and Gas Cost */}
        <div className="mb-4">
          <p>
            <strong>Interest Rate:</strong> 10%
          </p>
        </div>

        <div className="flex gap-2">
          {!isApproveSuccess ? (
            <button
              className="bg-green-500 text-white py-2 px-4 rounded"
              onClick={() => {
                const spender = loanRouterAddr;
                const amount = "1000000000000000000";
                writeApprove({
                  args: [spender, parseEther(amount)],
                  // spender: "asdasd"
                  // amount: parseEther('0.01'),
                });
              }}
            >
              Approve
            </button>
          ) : waitTransactionData && !loanIsLoading ? (
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded"
              onClick={() => {
                const collateralAmt = 10e18;
                const paymentFreqSeconds =
                  selectedInterval === "weekly" ? 604800 : 2678400;
                const paymentsNum = numberOfPeriods;

                write({
                  args: [
                    loanFactory,
                    wBTCAddress,
                    lendingPoolAddr,
                    collateralAmt,
                    paymentFreqSeconds,
                    paymentsNum,
                  ],
                });
              }}
            >
              Create
            </button>
          ) : (
            <>
              <div>Loading...</div> <LoadingSpinner />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
