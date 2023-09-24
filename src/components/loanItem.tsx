import * as React from "react";
import { BorrowList } from "../pages/borrow";
import { Button } from "@radix-ui/themes";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { USDTAddress, loanRouterAddr } from "../constants/addresses";
import { wBtcAbi } from "../constants/abis/wBtc";
import { loanRouterAbi } from "../constants/abis/loanRouter";
import { LoadingSpinner } from "./loading-spinner";
import { parseEther } from "viem";

export const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

interface LoanRowItemProps {
  position: BorrowList;
  loanData?: any;
}
export const LoanRowItem = ({ position, loanData }: LoanRowItemProps) => {
  const loanContract = loanData?.loanContract;
  const {
    data,
    isLoading: isLoading1,
    write: writeApprove,
  } = useContractWrite({
    address: USDTAddress,
    abi: wBtcAbi,
    functionName: "approve",
  });

  const { data: waitTransactionData, isLoading: isLoading2 } =
    useWaitForTransaction(data);

  const {
    data: loanDataReceived,
    isLoading: isLoading3,
    isSuccess: loanIsCreated,
    write,
  } = useContractWrite({
    address: loanRouterAddr,
    abi: loanRouterAbi,
    functionName: "repayAndCollect",
  });

  const {
    data: waitedFinalData,
    isLoading: isLoading4,
    isSuccess: waitedLoanDataSuccess,
  } = useWaitForTransaction(loanDataReceived);

  if (loanData == null) {
    return <></>;
  }
  console.log("data != null", data != null);

  const totalUSDtoRepay = position.initialDeposit * 0.1;
  const currentlyRepayed = position.currentOutstandingRepayed;

  const fullyLoaded = isLoading1 && isLoading2 && isLoading3 && isLoading4;
  return (
    <>
      <li key={position.id} className="border-b border-[#2e3037] py-8">
        {/* Loading bar with USDC overlay */}
        <h2 className="text-lg font-bold pb-1">
          {position.amount} {position.asset}
        </h2>
        <div className="relative bg-gray-300 rounded h-8 mb-2">
          <div
            className="absolute left-0 top-0 h-8 bg-blue-500 rounded flex items-center justify-center text-sm text-white"
            style={{
              width: `${
                ((waitedLoanDataSuccess
                  ? currentlyRepayed + totalUSDtoRepay * 0.14
                  : currentlyRepayed) /
                  totalUSDtoRepay) *
                100
              }%`,
            }}
          ></div>
          <div className="absolute pl-2 h-8 rounded flex items-center justify-center text-sm text-white">
            USDC to repay
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p>
              <strong>Initial Collateral Value:</strong>{" "}
              {USDollar.format(position.initialDeposit)} {"(-0.03%)"}
            </p>
            <p>
              <strong>Interest: </strong>
              {"10%"}
            </p>
            <p>
              <strong>USDC to repay: </strong>
              {USDollar.format(
                Number((position.initialDeposit * 0.1).toFixed(2))
              )}
            </p>
            <p>
              <strong>Next Payment Due:</strong> {daysUntil(position.dueDate)}{" "}
              days
            </p>
            <p>
              <strong>Remaining payments: </strong> {position.paymentsRemaining} {'(weekly)'}
            </p>
          </div>

          {isLoading1 || isLoading2 || isLoading3 || isLoading4 ? (
            <div className="flex flex-nowrap gap-1">
              Loading.. <LoadingSpinner />
            </div>
          ) : !waitTransactionData ? (
            <Button
              // type="secondary"
              onClick={() => {
                const spender = loanRouterAddr;
                const amount = "1000000000000000000";
                writeApprove({
                  args: [spender, parseEther(amount)],
                });
              }}
            >
              Approve repaying loan
            </Button>
          ) : (
            <Button
              // type="secondary"
              onClick={() => {
                const lendingPool =
                  "0x9A31fDAf3B0F9E507d8813c13F289d3E8d0FCC1A";

                const amount = "10";
                write({
                  args: [loanContract, lendingPool, parseEther(amount)],
                });
              }}
            >
              Repay Loan
            </Button>
          )}
        </div>
      </li>
    </>
  );
};

function daysUntil(dueDate: Date): number {
  const now = new Date();
  const timeDifference = dueDate.getTime() - now.getTime();
  const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

  return dayDifference;
}
