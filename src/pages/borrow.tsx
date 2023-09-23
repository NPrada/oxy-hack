"use client";
import type { NextPage } from "next";

import "@web3inbox/widget-react/dist/compiled.css";

import { Layout } from "../components/layout";
import { Button } from "../components/button";
import { useRouter } from "next/router";

// const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
// const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN as string;

const Home: NextPage = () => {
  const positions: LoanPosition[] = [
    {
      id: 1,
      asset: "BTC",
      amount: 1000,
      interest: 5,
    },
    {
      id: 2,
      asset: "USDT",
      amount: 1000,
      interest: 5,
    },
  ];

  return (
    <Layout>
      <LendingList positions={positions} />
    </Layout>
  );
};

export default Home;

interface LoanPosition {
  id: number;
  asset: string;
  amount: number;
  interest: number;
}

interface LendingListProps {
  positions: LoanPosition[];
}

const LendingList: React.FC<LendingListProps> = ({ positions }) => {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">Loans</h2>
      <ul>
        {positions.map((position) => (
          <li key={position.id} className="border-b border-gray-200 py-2">
            <p>
              <strong>Asset:</strong> {position.asset}
            </p>
            <p>
              <strong>Amount:</strong> {position.amount}
            </p>
            <p>
              <strong>APY:</strong> {position.interest}%
            </p>
          </li>
        ))}
      </ul>
      <Button
        onClick={() => {
          router.push("/borrow-asset");
        }}
      >
        Get Loan
      </Button>
    </div>
  );
};
