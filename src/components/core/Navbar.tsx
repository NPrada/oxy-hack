import React from "react";
import Image from "next/image";
import { CustomWalletButton } from "../custom-wallet-button";

function Navbar() {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="px-2">
        <Image
          alt="logo svg"
          key={23}
          src="/assets/logo-oxy-round.svg"
          width={40}
          height={40}
        />
      </div>
      <div className="flex items-center space-x-4">
        <div>
          <w3m-network-button />
        </div>
        <div>
          <w3m-button label="Connect Wallet" balance="show" />
        </div>
        <div>
          <CustomWalletButton />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
