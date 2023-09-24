import type { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";
import { mainnet, goerli } from "wagmi/chains";
import "@web3inbox/widget-react/dist/compiled.css";
import "@radix-ui/themes/styles.css";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import Navbar from "../components/core/Navbar";
import "../styles/globals.css";
import { Theme } from "@radix-ui/themes";

// 1. Get projectID at https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
if (!projectId) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}

// 2. Configure Web3Modal
const chains = [goerli];
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  appName: "GM Hackers",
});

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  tokens: {
    5: {
      address: "0xF19162950528A40a27d922f52413d26f71B25926",
    },
  },
  themeVariables: {
    // '--wcm-accent-color': 'red',
    // "--wcm-accent-fill-color": 'red',
    "--w3m-color-mix": "#e93d82",
    "--w3m-color-mix-strength": 40,
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <ChakraProvider theme={theme}> */}
      {/* @ts-ignore */}
      <WagmiConfig config={wagmiConfig}>
        {/* @ts-ignore */}
        <Theme
          appearance="dark"
          accentColor="crimson"
          grayColor="sand"
          radius="large"
          scaling="95%"
        >
          <Component {...pageProps} />
        </Theme>
      </WagmiConfig>
      {/* </ChakraProvider> */}
    </>
  );
}

export default MyApp;
