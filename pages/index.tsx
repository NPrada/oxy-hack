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
import useSendNotification from "../utils/useSendNotification";
import { useInterval } from "usehooks-ts";
import Preferences from "../components/Preferences";
import Messages from "../components/Messages";
import Subscription from "../components/Subscription";
import { sendNotification } from "../utils/fetchNotify";
import Subscribers from "../components/Subscribers";
import { Layout } from "../components/layout";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN as string;

const Home: NextPage = () => {
  /** Web3Inbox SDK hooks **/
  const isW3iInitialized = useInitWeb3InboxClient({
    projectId,
    domain: appDomain,
  });
  const {
    account,
    setAccount,
    register: registerIdentity,
    identityKey,
  } = useW3iAccount();
  const {
    subscribe,
    unsubscribe,
    isSubscribed,
    isSubscribing,
    isUnsubscribing,
  } = useManageSubscription(account);

  const { address } = useAccount({
    onDisconnect: () => {
      setAccount("");
    },
  });
  const { signMessageAsync } = useSignMessage();
  const wagmiPublicClient = usePublicClient();

  const { colorMode } = useColorMode();
  const toast = useToast();

  const { handleSendNotification, isSending } = useSendNotification();
  const [lastBlock, setLastBlock] = useState<string>();
  const [isBlockNotificationEnabled, setIsBlockNotificationEnabled] =
    useState(true);

  const signMessage = useCallback(
    async (message: string) => {
      const res = await signMessageAsync({
        message,
      });

      return res as string;
    },
    [signMessageAsync]
  );

  // We need to set the account as soon as the user is connected
  useEffect(() => {
    if (!Boolean(address)) return;
    setAccount(`eip155:1:${address}`);
  }, [signMessage, address, setAccount]);

  const handleRegistration = useCallback(async () => {
    if (!account) return;
    try {
      await registerIdentity(signMessage);
    } catch (registerIdentityError) {
      console.error({ registerIdentityError });
    }
  }, [signMessage, registerIdentity, account]);

  useEffect(() => {
    if (!identityKey) {
      handleRegistration();
    }
  }, [handleRegistration, identityKey]);

  // handleSendNotification will send a notification to the current user and includes error handling.
  // If you don't want to use this hook and want more flexibility, you can use sendNotification.
  const handleTestNotification = useCallback(async () => {
    if (isSubscribed) {
      handleSendNotification({
        title: "GM Hacker",
        body: "Hack it until you make it!",
        icon: `${window.location.origin}/WalletConnect-blue.svg`,
        url: window.location.origin,
        type: "promotional",
      });
    }
  }, [handleSendNotification, isSubscribed]);

  // Example of how to send a notification based on some "automation".
  // sendNotification will make a fetch request to /api/notify
  const handleBlockNotification = useCallback(async () => {
    if (isSubscribed && account && isBlockNotificationEnabled) {
      const blockNumber = await wagmiPublicClient.getBlockNumber();
      if (lastBlock !== blockNumber.toString()) {
        setLastBlock(blockNumber.toString());
        try {
          toast({
            title: "New block",
            position: "top",
            variant: "subtle",
          });
          await sendNotification({
            accounts: [account], // accounts that we want to send the notification to.
            notification: {
              title: "New block",
              body: blockNumber.toString(),
              icon: `${window.location.origin}/eth-glyph-colored.png`,
              url: `https://etherscan.io/block/${blockNumber.toString()}`,
              type: "transactional",
            },
          });
        } catch (error: any) {
          toast({
            title: "Failed to send new block notification",
            description: error.message ?? "Something went wrong",
          });
        }
      }
    }
  }, [
    wagmiPublicClient,
    isSubscribed,
    lastBlock,
    account,
    toast,
    isBlockNotificationEnabled,
  ]);

  useInterval(() => {
    handleBlockNotification();
  }, 12000);

  return (
    <Layout>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
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
