import { useWeb3Modal } from "@web3modal/react";
import { useState } from "react";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import Nossr from "./nossr";
import { USDCAddress } from "../constants/addresses";

export function CustomWalletButton() {
  const [loading, setLoading] = useState(false);
  const { open } = useWeb3Modal();
  const { isConnected, address } = useAccount();

  const { data, isError, isLoading } = useBalance({
    address,
    token: USDCAddress,
  });

  console.log("data", isError, isLoading, data);
  const { disconnect } = useDisconnect();
  const label = isConnected ? "Disconnect" : "Connect Custom";

  async function onOpen() {
    setLoading(true);
    console.log("opening");
    await open();
    console.log("open");
    setLoading(false);
  }

  function onClick() {
    if (isConnected) {
      disconnect();
    } else {
      onOpen();
    }
  }

  return (
    <Nossr>
      <button onClick={onClick} disabled={loading}>
        {loading ? "Loading..." : label}
      </button>
    </Nossr>
  );
}
