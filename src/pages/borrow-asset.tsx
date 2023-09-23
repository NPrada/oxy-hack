"use client";
import type { NextPage } from "next";

import "@web3inbox/widget-react/dist/compiled.css";

import { Layout } from "../components/layout";
import { LendAssetCard } from "../components/lend-asset-card";
import { BorrowAssetCard } from "../components/borrow-asset-card";

// const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
// const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN as string;

const Home: NextPage = () => {
  return (
    <Layout>
      <BorrowAssetCard />
    </Layout>
  );
};

export default Home;
