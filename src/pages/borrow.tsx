"use client";
import type { NextPage } from "next";

import "@web3inbox/widget-react/dist/compiled.css";

import { Layout } from "../components/layout";
// import { Button } from "../components/button";
import { useRouter } from "next/router";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Button, Card, Box, Text, Avatar, Flex } from "@radix-ui/themes";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { loanRouterAddr, wBTCAddress } from "../constants/addresses";
import { wBtcAbi } from "../constants/abis/wBtc";
import { loanRouterAbi } from "../constants/abis/loanRouter";
import { LoanRowItem } from "../components/loanItem";
import { useLoansStorage } from "../hooks/storagehooks";

// const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
// const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN as string;

function dueDate() {
  const today = new Date();
  const oneWeekFromNow = new Date(today);
  oneWeekFromNow.setDate(today.getDate() + 7);
  return oneWeekFromNow;
}

export interface BorrowList {
  id: number;
  asset: string;
  amount: number;
  interest: number;
  dueDate: Date;
  initialDeposit: number;
  currentValue: number;
  paymentsRemaining: number;
  currentOutstandingRepayed: number;
}

export const btcPrice = 26558.6;

const Home: NextPage = () => {
  const positions: BorrowList[] = [
    {
      id: 1,
      asset: "wBTC",
      amount: 10,
      interest: 10,
      dueDate: dueDate(), // Nov 15, 2023
      initialDeposit: btcPrice * 10, // 1 BTC as an initial deposit
      currentValue: btcPrice * 10 * 0.98, // Current value is 0.95 BTC
      currentOutstandingRepayed: 0,
      paymentsRemaining: 7,
    },
    {
      id: 2,
      asset: "wBTC",
      amount: 10,
      interest: 10,
      dueDate: dueDate(), // Dec 1, 2023
      initialDeposit: btcPrice * 10, // 1000 USDT as an initial deposit
      currentValue: btcPrice * 10 * 0.98, // Current value is 0.95 BTC
      currentOutstandingRepayed: 2000,
      paymentsRemaining: 4,
    },
    {
      id: 3,
      asset: "wBTC",
      amount: 10,
      interest: 10,
      dueDate: dueDate(), // Dec 1, 2023
      initialDeposit: btcPrice * 10, // 1000 USDT as an initial deposit
      currentValue: btcPrice * 10 * 0.98, // Current value is 0.95 BTC
      currentOutstandingRepayed: 4000,
      paymentsRemaining: 2,
    },
    {
      id: 4,
      asset: "wBTC",
      amount: 10,
      interest: 10,
      dueDate: dueDate(), // Dec 1, 2023
      initialDeposit: btcPrice * 10, // 1000 USDT as an initial deposit
      currentValue: btcPrice * 10 * 0.98, // Current value is 0.95 BTC
      currentOutstandingRepayed: 4000,
      paymentsRemaining: 2,
    },
    {
      id: 5,
      asset: "wBTC",
      amount: 10,
      interest: 10,
      dueDate: dueDate(), // Dec 1, 2023
      initialDeposit: btcPrice * 10, // 1000 USDT as an initial deposit
      currentValue: btcPrice * 10 * 0.98, // Current value is 0.95 BTC
      currentOutstandingRepayed: 4000,
      paymentsRemaining: 2,
    },
    {
      id: 6,
      asset: "wBTC",
      amount: 10,
      interest: 10,
      dueDate: dueDate(), // Dec 1, 2023
      initialDeposit: btcPrice * 10, // 1000 USDT as an initial deposit
      currentValue: btcPrice * 10 * 0.98, // Current value is 0.95 BTC
      currentOutstandingRepayed: 4000,
      paymentsRemaining: 2,
    },
  ];

  return (
    <Layout>
      <BorrowList positions={positions} />
    </Layout>
  );
};

export default Home;

interface BorrowListProps {
  positions: BorrowList[];
}

const BorrowList: React.FC<BorrowListProps> = ({ positions }) => {
  const router = useRouter();
  const { loans } = useLoansStorage();

  return (
    <Card className="p-4 max-w-3xl m-auto">
      <h2 className="text-xl font-bold mb-0">Loans</h2>
      <ul>
        {loans.map((position, index) => (
          <LoanRowItem
            position={positions[index]}
            loanData={loans[0] || undefined}
            key={index}
          />
        ))}
      </ul>
      <div className="flex justify-center mt-4">
        <Button
          onClick={() => {
            router.push("/borrow-asset");
          }}
        >
          Open new loan <ArrowRightIcon />
        </Button>
      </div>
    </Card>
  );
};
