"use client";
import type { NextPage } from "next";

import "@web3inbox/widget-react/dist/compiled.css";

import { Layout } from "../components/layout";
// import { Button } from "../components/button";
import { useRouter } from "next/router";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Button, Card, Box, Text, Avatar, Flex } from "@radix-ui/themes";

// const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
// const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN as string;

const Home: NextPage = () => {
  const positions: BorrowList[] = [
    {
      id: 1,
      asset: "BTC",
      amount: 1000,
      interest: 5,
      dueDate: new Date("2023-11-15"), // Nov 15, 2023
      initialDeposit: 1, // 1 BTC as an initial deposit
      currentValue: 0.95, // Current value is 0.95 BTC
    },
    {
      id: 2,
      asset: "USDT",
      amount: 1000,
      interest: 5,
      dueDate: new Date("2023-12-01"), // Dec 1, 2023
      initialDeposit: 1000, // 1000 USDT as an initial deposit
      currentValue: 980, // Current value is 980 USDT
    },
  ];

  return (
    <Layout>
      <BorrowList positions={positions} />
    </Layout>
  );
};

export default Home;

interface BorrowList {
  id: number;
  asset: string;
  amount: number;
  interest: number;
}

interface BorrowListProps {
  positions: BorrowList[];
}

interface BorrowList {
  id: number;
  asset: string;
  amount: number;
  interest: number;
  dueDate: Date;
  initialDeposit: number;
  currentValue: number;
}

const BorrowList: React.FC<BorrowListProps> = ({ positions }) => {
  const router = useRouter();

  return (
    <Card className="p-4">
      <h2 className="text-xl font-bold mb-4">Loans</h2>
      <ul>
        {positions.map((position) => (
          <li key={position.id} className="border-b border-[#2e3037] py-2">
            {/* Loading bar with USDC overlay */}
            <div className="relative bg-gray-300 rounded h-8 mb-2">
              <div
                className="absolute left-0 top-0 h-8 bg-blue-500 rounded flex items-center justify-center text-sm text-white"
                style={{
                  width: `${
                    (position.currentValue / position.initialDeposit) * 100
                  }%`,
                }}
              >
                USDC
              </div>
            </div>

            <p>
              <strong>Asset:</strong> {position.asset}
            </p>
            <p>
              <strong>Amount:</strong> {position.amount}
            </p>
            <p>
              <strong>Next Payment Due:</strong> {daysUntil(position.dueDate)}{" "}
              days
            </p>
            <p>
              <strong>Collateral Value:</strong> Initial: $
              {position.initialDeposit}, Current: ${position.currentValue}
            </p>
            <Button
              // type="secondary"
              onClick={() => {
                // Add functionality for repayment
                console.log("Repaying for position:", position.id);
              }}
            >
              Repay Loan
            </Button>
          </li>
        ))}
      </ul>
      <div className="flex justify-center">
        {" "}
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

function daysUntil(dueDate: Date): number {
  const now = new Date();
  const timeDifference = dueDate.getTime() - now.getTime();
  const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

  return dayDifference;
}
