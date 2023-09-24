"use client";
import type { NextPage } from "next";

import "@web3inbox/widget-react/dist/compiled.css";

import { Layout } from "../components/layout";
import { useRouter } from "next/router";
import { Button, Card } from "@radix-ui/themes";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useLiquidityStorage } from "../hooks/storagehooks";

// const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
// const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN as string;

const Home: NextPage = () => {
  const positions: LendingPosition[] = [
    {
      id: 1,
      asset: "BTC",
      amount: 1000,
      apy: 5,
    },
    {
      id: 2,
      asset: "USDT",
      amount: 1000,
      apy: 5,
    },
    // ... other positions
  ];

  return (
    <Layout>
      {/* <LendingList positions={positions} /> */}
      <LendingList positions={positions} />
    </Layout>

    // <Flex w="full" flexDirection={"column"} maxW="700px">
    //   <Image
    //     aria-label="WalletConnect"
    //     src={
    //       colorMode === "dark"
    //         ? "/WalletConnect-white.svg"
    //         : "/WalletConnect-black.svg"
    //     }
    //   />

    // </Flex>
  );
};

export default Home;

interface LendingPosition {
  id: number;
  asset: string;
  amount: number;
  apy: number;
}

interface LendingListProps {
  positions: LendingPosition[];
}

const LendingList: React.FC<LendingListProps> = ({ positions }) => {
  const router = useRouter();
  const { loans } = useLiquidityStorage();

  return (
    <Card className="max-w-xl p-4 m-auto">
      <h2 className="text-xl font-bold mb-4">Lending Positions</h2>
      <ul>
        {loans.map((loan, i) => {
          const position = positions[i];
          return (
            <li key={position.id} className="border-b border-[#2e3037] py-2">
              <p>
                <strong>Asset:</strong> {loan.asset}
              </p>
              <p>
                <strong>Amount:</strong> {loan.loanAmount}
              </p>
              <p>
                <strong>APY:</strong> {position.apy}%
              </p>
            </li>
          );
        })}
      </ul>
      <Button
        className="mt-4"
        onClick={() => {
          router.push("/lend-asset");
        }}
      >
        Open new position <ArrowRightIcon />
      </Button>
    </Card>
  );
};
