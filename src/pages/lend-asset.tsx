"use client";
import type { NextPage } from "next";

import "@web3inbox/widget-react/dist/compiled.css";

import { Layout } from "../components/layout";
import { LendAssetCard } from "../components/lend-asset-card";
import Nossr from "../components/nossr";

// const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
// const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN as string;

const Home: NextPage = () => {
  return (
    <Layout>
      {/* <Nossr> <LendAssetCard /></Nossr> */}
      <LendAssetCard />
    </Layout>
  );
};

export default Home;
