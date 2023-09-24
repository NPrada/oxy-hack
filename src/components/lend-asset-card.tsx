import React, { useState } from "react";

import { Button, Card } from "@radix-ui/themes";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import {
  USDCAddress,
  USDCLendingPool,
  USDTAddress,
  USDTLendingPool,
  lendingPoolAddr,
} from "../constants/addresses";
import { wBtcAbi } from "../constants/abis/wBtc";
import { parseEther } from "viem";
import { LoadingSpinner } from "./loading-spinner";
import { lendingPoolAbi } from "../constants/abis/lendingPool";

export const LendAssetCard: React.FC = () => {
  const assets = ["USDC", "USDT"];
  const [selectedAsset, setSelectedAsset] = useState(assets[0]);
  const [inputAmount, setInputAmount] = useState("");

  const { address } = useAccount();

  const currencyAddrToUse =
    selectedAsset === "USDT" ? USDTAddress : USDCAddress;

  const poolAddrToUse =
    selectedAsset === "USDT" ? USDTLendingPool : USDCLendingPool;

  console.log(selectedAsset, "currencyAddrToUse", currencyAddrToUse);
  console.log(selectedAsset, "poolAddrToUse", poolAddrToUse);

  const {
    data,
    isLoading: isLoading1,
    write: writeApprove,
  } = useContractWrite({
    address: currencyAddrToUse,
    abi: wBtcAbi,
    functionName: "approve",
  });

  const {
    data: waitTransactionData,
    isLoading: isLoading2,
    isSuccess: isApprovalSuccessful,
  } = useWaitForTransaction(data);

  const {
    data: loanDataReceived,
    isLoading: isLoading3,
    isSuccess: loanIsCreated,
    write,
  } = useContractWrite({
    address: poolAddrToUse,
    abi: lendingPoolAbi,
    functionName: "deposit",
  });

  const {
    data: waitedFinalData,
    isLoading: isLoading4,
    isSuccess: waitedLoanDataSuccess,
  } = useWaitForTransaction(loanDataReceived);

  return (
    <div className="max-w-xl flex flex-col justify-center m-auto">
      <h1 className="text-lg pb-4">Lend Assets</h1>

      <Card className=" p-4 flex">
        <div className="flex-1  border-b border-[#2e3037]">
          <div className="mb-">
            <label className="block text-sm font-bold mb-2">Select Asset</label>
            <select
              value={selectedAsset}
              onChange={(e) => setSelectedAsset(e.target.value)}
              className="w-full px-2 py-1 rounded border"
            >
              {assets.map((asset) => (
                <option key={asset} value={asset}>
                  {asset}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4 pt-2">
            <label className="block text-sm font-bold mb-2">Enter Amount</label>
            <input
              type="number"
              value={inputAmount}
              onChange={(e) => setInputAmount(e.target.value)}
              placeholder="0.0"
              className="w-full px-2 py-1 rounded border"
            />
          </div>
        </div>

        <div className="pt-4 flex flex-col justify-between">
          <Button
            disabled={isApprovalSuccessful}
            variant="outline"
            className="mb-2  py-2 px-4"
            onClick={() => {
              const spender = poolAddrToUse;
              const amount = "1000000000000000000";
              writeApprove({
                args: [spender, parseEther(amount)],
                // spender: "asdasd"
                // amount: parseEther('0.01'),
              });
            }}
          >
            {isLoading1 || isLoading2 ? (
              <div className="p-1">
                <LoadingSpinner />
              </div>
            ) : (
              "Approve"
            )}
          </Button>
          <Button
            disabled={!isApprovalSuccessful}
            onClick={() => {
              write({
                args: ["1000000000000000", address],
              });
            }}
          >
            Deposit
          </Button>
        </div>
      </Card>
    </div>
  );
};
