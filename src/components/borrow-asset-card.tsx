// components/LoanCard.tsx
import React, { useEffect, useState } from "react";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import {
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
import { Button, Card } from "@radix-ui/themes";
import { btcPrice } from "../pages/borrow";
import { USDollar } from "./loanItem";

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

  const {
    data: waitedLoanData,
    isLoading: waitedLoanDataIsLoading,
    isSuccess: waitedLoanDataSuccess,
  } = useWaitForTransaction(loanData);

  console.log("approvaldata", data);
  console.log("waitTransactionData", waitTransactionData);
  console.log("loanData", loanData);
  console.log("waitedLoanData", waitedLoanData);

  useEffect(() => {
    if (waitedLoanData != null) {
      //@ts-ignore
      const loanContract = `0x${waitedLoanData?.logs?.[waitedLoanData?.logs.length -3].topics[2].slice(26)}`;
      console.log("loanContract", loanContract);
      saveLoans([...loans, { ...waitedLoanData, loanContract: loanContract }]);
    }
  }, [waitedLoanData, saveLoans, loans]);

  const collaterals = ["wBTC", "ETH"];
  const loanAssets = ["USDC", "USDT"];
  const intervals = ["weekly", "monthly"];

  const [selectedCollateral, setSelectedCollateral] = useState(collaterals[0]);
  const [collateralAmount, setCollateralAmount] = useState("");
  const [selectedLoanAsset, setSelectedLoanAsset] = useState(loanAssets[0]);
  const [loanAmount, setLoanAmount] = useState(""); // Just for display
  const [selectedInterval, setSelectedInterval] = useState(intervals[0]);
  const [numberOfPeriods, setNumberOfPeriods] = useState<number>(Number("1"));

  if (waitedLoanDataSuccess) {
    console.log("loanData", loanData);

    router.push("/borrow?isSuccess=true");
  }

  return (
    <Card className=" p-4 flex  max-w-3xl m-auto">
      <div className="flex-1 pr-4 border-b border-[#2e3037]">
        {/* Collateral Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
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
          <label className="block  text-sm font-bold mb-2">
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
          <label className="block  text-sm font-bold mb-2">Loan Asset</label>
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

        {/* Repayment Interval Dropdown */}
        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2">
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
          <label className="block  text-sm font-bold mb-2">
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

      <div className="pt-4 flex flex-col justify-between min-w-[260px]">
        <div className="mb-1 text-lg font-bold">
          <span className=" text-lg font-bold">Loan Amount:</span>{" "}
          {USDollar.format(Number(collateralAmount) * btcPrice * 0.7)}
        </div>
        {/* Interest Rate and Gas Cost */}
        <div className="mb-4">
          <p>
            <strong>Interest rate:</strong> 10%
          </p>
        </div>

        {/* Display Loan Amount */}

        <div className="flex gap-2">
          {!isApproveSuccess ? (
            <Button
              className=" py-2 px-4"
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
            </Button>
          ) : waitTransactionData &&
            !loanIsLoading &&
            !waitedLoanDataIsLoading ? (
            <Button
              className="py-2 px-4"
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
            </Button>
          ) : (
            <>
              <div>Loading...</div> <LoadingSpinner />
            </>
          )}
        </div>
      </div>
    </Card>
  );
};
