import { Flex } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "./NavLink";
import Image from "next/image";

function Navbar() {
  return (
    <Flex alignItems="center" justifyContent={"space-between"} w="full">
      <Flex gap={4} alignItems="center">
        <Image
          alt={"logo svg"}
          key={23}
          src={"/assets/logo-oxy-round.svg"}
          width={40}
          height={40}
        />
      </Flex>
      <w3m-button label="Connect Wallet" balance="show" />
    </Flex>
  );
}

export default Navbar;
