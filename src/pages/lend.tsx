"use client";
import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Flex,
  Heading,
  Image,
  Tooltip,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import {
  useInitWeb3InboxClient,
  useManageSubscription,
  useW3iAccount,
} from "@web3inbox/widget-react";
import "@web3inbox/widget-react/dist/compiled.css";

import { useAccount, usePublicClient, useSignMessage } from "wagmi";
import { FaBell, FaBellSlash, FaPause, FaPlay } from "react-icons/fa";
import { BsPersonFillCheck, BsSendFill } from "react-icons/bs";
import useSendNotification from "../../utils/useSendNotification";
import { useInterval } from "usehooks-ts";
import Preferences from "../components/Preferences";
import Messages from "../components/Messages";
import Subscription from "../components/Subscription";
import { sendNotification } from "../../utils/fetchNotify";
import Subscribers from "../components/Subscribers";
import { Layout } from "../components/layout";
import Link from "next/link";

// const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
// const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN as string;

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="flex space-x-4 max-w-4xl m-auto">
        <Link href="/borrow" className="flex-1">
          <div className="bg-[#52472E] flex justify-center items-center rounded-lg hover:bg-opacity-90 cursor-pointer transition">
            <div className="py-28 text-white text-2xl font-bold group-hover:text-opacity-80 transition">
              I want to Borrow
            </div>
          </div>
        </Link>
        <Link href="/lend" className="flex-1">
          <div className="bg-[#52472E] flex justify-center items-center rounded-lg hover:bg-opacity-90 cursor-pointer transition">
            <div className="py-28 text-white text-2xl font-bold group-hover:text-opacity-80 transition">
              I want to Lend
            </div>
          </div>
        </Link>
      </div>
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
